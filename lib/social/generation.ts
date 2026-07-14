import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { put } from "@vercel/blob";
import { Resvg } from "@resvg/resvg-js";
import * as opentype from "opentype.js";
import sharp from "sharp";
import { z } from "zod";
import { and, desc, eq, isNull, lt, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { automation, draft, draftVersion, type CreativeBrief, type GenerationStage } from "@/lib/db/schema";
import { AGENCY_CONTEXT, BRAND_BRIEF, CONTENT_PROMPT_VERSION } from "./constants";
import { sanitizeError } from "./crypto";
import { formatStudioDate } from "./time";

class GenerationCancelledError extends Error {
  constructor() {
    super("Draft generation was cancelled");
    this.name = "GenerationCancelledError";
  }
}

export class GenerationInProgressError extends Error {
  constructor() {
    super("Draft generation is already in progress");
    this.name = "GenerationInProgressError";
  }
}

async function claimGeneration(draftId: string) {
  const claimedAt = new Date();
  const stale = new Date(claimedAt.getTime() - 10 * 60_000);
  const claimed = await db.update(draft).set({ claimedAt, updatedAt: claimedAt })
    .where(and(eq(draft.id, draftId), or(isNull(draft.claimedAt), lt(draft.claimedAt, stale))))
    .returning({ id: draft.id });
  if (!claimed.length) throw new GenerationInProgressError();
  return claimedAt;
}

export function assertGenerationConfiguration() {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");
  const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const hasVercelOidc = Boolean(process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID);
  if (!hasBlobToken && !hasVercelOidc) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured. Add a Vercel Blob store token to generate publishable assets.");
  }
}

async function assertGenerationActive(draftId: string) {
  const current = await db.query.draft.findFirst({ where: eq(draft.id, draftId), columns: { status: true } });
  if (!current || current.status === "CANCELLED") throw new GenerationCancelledError();
}

async function setGenerationStage(draftId: string, generationStage: GenerationStage, generationProgress: number) {
  await assertGenerationActive(draftId);
  await db.update(draft).set({ generationStage, generationProgress, updatedAt: new Date() }).where(eq(draft.id, draftId));
}

function openaiClient() {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const BriefSchema = z.object({
  headline: z.string().min(4).max(84),
  onImageKicker: z.string().min(3).max(30),
  onImageSupport: z.string().min(12).max(120),
  visualBrief: z.string().min(20).max(700),
  facebookCaption: z.string().min(20).max(1800),
  instagramCaption: z.string().min(20).max(1800),
  cta: z.string().min(2).max(100),
  hashtags: z.array(z.string().regex(/^#[A-Za-z0-9]+$/)).max(5),
});

/** Rejects model output that is technically a string but is not usable prose. */
export function hasMeaningfulSocialCopy(value: string) {
  const normalized = value.normalize("NFKC").trim();
  const letters = normalized.match(/\p{L}/gu) || [];
  if (letters.length < 8 || new Set(letters.map((letter) => letter.toLocaleLowerCase("en"))).size < 4) return false;

  const visible = normalized.replace(/\s/g, "").toLocaleLowerCase("en");
  const counts = new Map<string, number>();
  for (const character of visible) counts.set(character, (counts.get(character) || 0) + 1);
  const dominant = Math.max(0, ...counts.values());
  return visible.length > 0 && dominant / visible.length < 0.72;
}

function assertBriefQuality(brief: z.infer<typeof BriefSchema>) {
  if (![brief.headline, brief.facebookCaption, brief.instagramCaption].every(hasMeaningfulSocialCopy)) {
    throw new Error("The content model returned malformed social copy");
  }
}

function normalizeDisplayText(value: string) {
  return value.normalize("NFKC").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();
}

export function wrapHeadline(headline: string, max = 20) {
  const words = headline.trim().split(/\s+/);
  const lines: string[] = [];
  for (const word of words) {
    const current = lines.at(-1);
    if (!current || `${current} ${word}`.length > max) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`;
  }
  return lines.slice(0, 4);
}

function estimatedLineWidth(value: string, fontSize: number) {
  const units = [...value].reduce((total, character) => {
    if (/\s/.test(character)) return total + 0.3;
    if (/[MWmw@%]/.test(character)) return total + 0.9;
    if (/[ilIjtfr1.,'’!:;]/.test(character)) return total + 0.34;
    if (/[A-Z0-9]/.test(character)) return total + 0.64;
    return total + 0.56;
  }, 0);
  return units * fontSize - Math.max(0, value.length - 1) * 2;
}

function wrapToPixelWidth(value: string, fontSize: number, maxWidth: number) {
  const lines: string[] = [];
  const words = normalizeDisplayText(value).split(/\s+/).filter(Boolean).flatMap((word) => {
    if (estimatedLineWidth(word, fontSize) <= maxWidth) return [word];
    const pieces: string[] = [];
    let piece = "";
    for (const character of word) {
      if (piece && estimatedLineWidth(`${piece}${character}`, fontSize) > maxWidth) {
        pieces.push(piece);
        piece = character;
      } else piece += character;
    }
    if (piece) pieces.push(piece);
    return pieces;
  });
  for (const word of words) {
    const current = lines.at(-1);
    const candidate = current ? `${current} ${word}` : word;
    if (!current) lines.push(word);
    else if (estimatedLineWidth(candidate, fontSize) <= maxWidth) lines[lines.length - 1] = candidate;
    else lines.push(word);
  }
  return lines;
}

export function layoutHeadline(headline: string, maxWidth = 520) {
  for (const fontSize of [92, 84, 76, 68, 60, 52, 46, 40, 36, 32, 28]) {
    const lines = wrapToPixelWidth(headline, fontSize, maxWidth);
    if (lines.length <= 4 && lines.every((line) => estimatedLineWidth(line, fontSize) <= maxWidth)) return { lines, fontSize };
  }
  return { lines: wrapToPixelWidth(headline, 26, maxWidth), fontSize: 26 };
}

function wrapWithFont(font: opentype.Font, value: string, fontSize: number, maxWidth: number) {
  const lines: string[] = [];
  const words = normalizeDisplayText(value).split(/\s+/).filter(Boolean).flatMap((word) => {
    if (font.getAdvanceWidth(word, fontSize) <= maxWidth) return [word];
    const pieces: string[] = [];
    let piece = "";
    for (const character of word) {
      if (piece && font.getAdvanceWidth(`${piece}${character}`, fontSize) > maxWidth) {
        pieces.push(piece);
        piece = character;
      } else piece += character;
    }
    if (piece) pieces.push(piece);
    return pieces;
  });

  for (const word of words) {
    const current = lines.at(-1);
    const candidate = current ? `${current} ${word}` : word;
    if (!current) lines.push(word);
    else if (font.getAdvanceWidth(candidate, fontSize) <= maxWidth) lines[lines.length - 1] = candidate;
    else lines.push(word);
  }
  return lines;
}

function layoutWithFont(font: opentype.Font, value: string, maxWidth: number, maxLines: number, sizes: number[]) {
  for (const fontSize of sizes) {
    const lines = wrapWithFont(font, value, fontSize, maxWidth);
    if (lines.length <= maxLines) return { lines, fontSize };
  }
  const fontSize = sizes.at(-1)!;
  return { lines: wrapWithFont(font, value, fontSize, maxWidth), fontSize };
}

function fontPath(font: opentype.Font, value: string, x: number, y: number, fontSize: number, fill: string) {
  const missing = [...value].filter((character) => !/\s/.test(character) && !font.hasChar(character));
  if (missing.length) throw new Error(`The creative font does not support: ${[...new Set(missing)].join(" ")}`);
  return `<path d="${font.getPath(value, x, y, fontSize).toPathData(2)}" fill="${fill}"/>`;
}

let rendererFontsPromise: Promise<{ sans: opentype.Font; mono: opentype.Font }> | null = null;

function rendererFonts() {
  rendererFontsPromise ??= Promise.all([
    readFile(path.join(process.cwd(), "public/social-fonts/Geist-SemiBold.ttf")),
    readFile(path.join(process.cwd(), "public/social-fonts/GeistMono-Medium.ttf")),
  ]).then(([sans, mono]) => ({
    sans: opentype.parse(sans.buffer.slice(sans.byteOffset, sans.byteOffset + sans.byteLength)),
    mono: opentype.parse(mono.buffer.slice(mono.byteOffset, mono.byteOffset + mono.byteLength)),
  }));
  return rendererFontsPromise;
}

export async function renderCreative(image: Buffer, brief: Pick<CreativeBrief, "headline" | "onImageKicker" | "onImageSupport"> | string) {
  const fonts = await rendererFonts();
  const content = typeof brief === "string" ? { headline: brief } : brief;
  const headline = normalizeDisplayText(content.headline);
  const { lines, fontSize } = layoutWithFont(fonts.sans, headline, 520, 4, [92, 84, 76, 68, 60, 52, 46, 40, 36, 32, 28]);
  const headlineTop = 245;
  const headlineSvg = lines.map((line, index) => fontPath(fonts.sans, line, 76, headlineTop + index * (fontSize + 5), fontSize, "#121820")).join("");
  const support = content.onImageSupport ? normalizeDisplayText(content.onImageSupport) : "";
  const supportLayout = support ? layoutWithFont(fonts.sans, support, 500, 3, [29, 27, 25, 23, 21, 19, 17, 16]) : { lines: [], fontSize: 29 };
  const supportLines = supportLayout.lines;
  const supportTop = headlineTop + lines.length * (fontSize + 5) + 24;
  const supportLineHeight = supportLayout.fontSize + 8;
  const supportSvg = supportLines.map((line, index) => fontPath(fonts.sans, line, 76, supportTop + index * supportLineHeight, supportLayout.fontSize, "#343B43")).join("");
  const kicker = normalizeDisplayText(content.onImageKicker || "FIELD NOTE").toUpperCase();
  const panelHeight = Math.max(610, supportTop + supportLines.length * supportLineHeight + 58);
  const svg = `<svg width="1080" height="1350" xmlns="http://www.w3.org/2000/svg">
    <defs><clipPath id="copy-safe"><rect x="76" y="130" width="560" height="1000"/></clipPath></defs>
    <rect width="1080" height="1350" fill="none"/>
    <rect x="0" y="0" width="760" height="${panelHeight}" fill="#F4F1EA"/>
    <rect x="0" y="0" width="18" height="${panelHeight}" fill="#2457E6"/>
    <line x1="76" y1="120" x2="654" y2="120" stroke="#121820" stroke-width="2"/>
    ${fontPath(fonts.mono, "BAYLINE / FIELD NOTE", 76, 92, 16, "#121820")}
    <g clip-path="url(#copy-safe)">
      ${fontPath(fonts.mono, kicker, 76, 170, 19, "#2457E6")}
      ${headlineSvg}
      ${supportSvg}
    </g>
    <rect x="0" y="1242" width="1080" height="108" fill="#F4F1EA"/>
    <line x1="0" y1="1242" x2="1080" y2="1242" stroke="#121820" stroke-width="2"/>
    ${fontPath(fonts.mono, "BAYLINEDIGITAL.COM", 790, 1307, 16, "#121820")}
  </svg>`;
  const overlay = Buffer.from(new Resvg(svg).render().asPng());
  const logo = await sharp(path.join(process.cwd(), "public/bayline-logo-cropped.png")).resize({ width: 250 }).png().toBuffer();

  return sharp(image)
    .resize(1080, 1350, { fit: "cover" })
    .composite([{ input: overlay, top: 0, left: 0 }, { input: logo, top: 1268, left: 76 }])
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();
}

async function createBrief(spec: typeof automation.$inferSelect.promptSpec, extra?: string) {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await openaiClient().responses.parse({
        model: process.env.OPENAI_TEXT_MODEL || "gpt-5-mini",
        input: [
          { role: "system", content: `You are Bayline Digital's senior social editor. Write useful, specific English copy. Do not invent facts, results, customers, statistics, awards, or capabilities. Keep hashtags restrained and relevant. The headline must be short enough for an editorial image. The on-image kicker is a short editorial category label. The on-image support is one concise sentence that adds a useful second layer without repeating the headline. Every copy field must contain natural English prose—never placeholders, repeated characters, or numeric filler.\n\nAGENCY CONTEXT:\n${AGENCY_CONTEXT}\n\nVISUAL SYSTEM:\n${BRAND_BRIEF}` },
          { role: "user", content: `Topic: ${spec.topic}\nAudience: ${spec.audience}\nKey message: ${spec.keyMessage}\nCTA: ${spec.cta}\nURL: ${spec.url || "None"}\nNotes: ${spec.notes || "None"}${extra ? `\nGeneration context:\n${extra}` : ""}${attempt ? "\nThe previous response was malformed. Return complete natural-language copy in every field." : ""}` },
        ],
        text: { format: zodTextFormat(BriefSchema, "social_creative") },
      });
      if (!response.output_parsed) throw new Error("The content model did not return a creative brief");
      assertBriefQuality(response.output_parsed);
      return response.output_parsed;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("The content model did not return usable social copy");
}

async function createImage(brief: CreativeBrief) {
  const prompt = `${BRAND_BRIEF}\n\nVisual direction: ${brief.visualBrief}\nDo not render this headline or any other text: ${brief.headline}`;
  const generated = await openaiClient().images.generate({
    model: "gpt-image-2",
    prompt,
    size: "1024x1536",
    quality: "medium",
    output_format: "png",
  });
  const encoded = generated.data?.[0]?.b64_json;
  if (!encoded) throw new Error("The image model did not return image data");
  return { prompt, image: Buffer.from(encoded, "base64") };
}

async function uploadVersionAssets(draftId: string, version: number, source: Buffer, final: Buffer) {
  const id = crypto.randomUUID();
  const base = `social/drafts/${draftId}/v${version}-${id}`;
  const [sourceBlob, finalBlob] = await Promise.all([
    put(`${base}-source.png`, source, { access: "public", addRandomSuffix: false, contentType: "image/png" }),
    put(`${base}.png`, final, { access: "public", addRandomSuffix: false, contentType: "image/png" }),
  ]);
  return { sourceBlob, finalBlob };
}

export async function generateDraftVersion(draftId: string, extra?: string) {
  const claimedAt = await claimGeneration(draftId);
  try {
    assertGenerationConfiguration();
    const [record] = await db.select({ draft, automation }).from(draft).leftJoin(automation, eq(draft.automationId, automation.id)).where(eq(draft.id, draftId)).limit(1);
    if (!record?.automation) throw new Error("Draft automation not found");
    if (record.draft.status === "CANCELLED") throw new GenerationCancelledError();
    const latest = await db.select().from(draftVersion).where(eq(draftVersion.draftId, draftId)).orderBy(desc(draftVersion.version)).limit(1);
    const recentVersions = record.automation.kind === "WEEKLY"
      ? await db.select({ headline: draftVersion.brief }).from(draftVersion)
        .innerJoin(draft, and(eq(draft.currentVersionId, draftVersion.id), eq(draft.automationId, record.automation.id)))
        .orderBy(desc(draft.scheduledFor))
        .limit(6)
      : [];
    const version = (latest[0]?.version || 0) + 1;
    await db.update(draft).set({ status: "GENERATING", generationStage: "WRITING", generationProgress: 12, lastError: null, updatedAt: new Date() }).where(eq(draft.id, draftId));
    const generationContext = [
      `Scheduled occurrence: ${formatStudioDate(record.draft.scheduledFor)}.`,
      record.automation.kind === "WEEKLY" ? "This is part of a recurring series. Choose a fresh, self-contained angle instead of repeating the same post." : "",
      recentVersions.length ? `Avoid repeating these recent headlines: ${recentVersions.map((item) => item.headline.headline).join(" | ")}.` : "",
      extra ? `Editor request: ${extra}` : "",
    ].filter(Boolean).join("\n");
    const brief = await createBrief(record.automation.promptSpec, generationContext);
    await setGenerationStage(draftId, "GENERATING_IMAGE", 38);
    const generated = await createImage(brief);
    await setGenerationStage(draftId, "COMPOSITING", 68);
    const final = await renderCreative(generated.image, brief);
    await setGenerationStage(draftId, "UPLOADING", 86);
    const blobs = await uploadVersionAssets(draftId, version, generated.image, final);
    await assertGenerationActive(draftId);
    const versionId = crypto.randomUUID();
    await db.transaction(async (tx) => {
      await tx.insert(draftVersion).values({
        id: versionId,
        draftId,
        version,
        brief,
        facebookCaption: brief.facebookCaption,
        instagramCaption: `${brief.instagramCaption}${brief.hashtags.length ? `\n\n${brief.hashtags.join(" ")}` : ""}`,
        imagePrompt: generated.prompt,
        sourceImageUrl: blobs.sourceBlob.url,
        assetUrl: blobs.finalBlob.url,
        assetPathname: blobs.finalBlob.pathname,
        model: "gpt-image-2",
        promptVersion: CONTENT_PROMPT_VERSION,
      });
      const updated = await tx.update(draft).set({ currentVersionId: versionId, status: "AWAITING_APPROVAL", generationStage: "READY", generationProgress: 100, approval: "PENDING", claimedAt: null, failureCount: 0, lastError: null, updatedAt: new Date() })
        .where(and(eq(draft.id, draftId), eq(draft.claimedAt, claimedAt), eq(draft.status, "GENERATING")))
        .returning({ id: draft.id });
      if (!updated.length) throw new GenerationCancelledError();
    });
    return versionId;
  } catch (error) {
    if (error instanceof GenerationCancelledError) {
      await db.update(draft).set({ claimedAt: null, updatedAt: new Date() })
        .where(and(eq(draft.id, draftId), eq(draft.claimedAt, claimedAt)));
      throw error;
    }
    await db.update(draft).set({ status: "GENERATION_FAILED", claimedAt: null, lastError: sanitizeError(error), updatedAt: new Date() })
      .where(and(eq(draft.id, draftId), eq(draft.claimedAt, claimedAt)));
    throw error;
  }
}

export async function editDraftVersion(draftId: string, input: { headline: string; facebookCaption: string; instagramCaption: string }) {
  const [current] = await db.select().from(draftVersion).innerJoin(draft, and(eq(draft.currentVersionId, draftVersion.id), eq(draft.id, draftId))).limit(1);
  if (!current) throw new Error("Current version not found");
  const sourceUrl = current.social_draft_version.sourceImageUrl;
  if (!sourceUrl) throw new Error("Source artwork is unavailable");
  const sourceResponse = await fetch(sourceUrl);
  if (!sourceResponse.ok) throw new Error("Unable to read source artwork");
  const source = Buffer.from(await sourceResponse.arrayBuffer());
  const nextVersion = current.social_draft_version.version + 1;
  const final = await renderCreative(source, { ...current.social_draft_version.brief, headline: input.headline });
  const blobs = await uploadVersionAssets(draftId, nextVersion, source, final);
  const versionId = crypto.randomUUID();
  const brief = { ...current.social_draft_version.brief, headline: input.headline, facebookCaption: input.facebookCaption, instagramCaption: input.instagramCaption };
  await db.transaction(async (tx) => {
    await tx.insert(draftVersion).values({
      ...current.social_draft_version,
      id: versionId,
      version: nextVersion,
      brief,
      facebookCaption: input.facebookCaption,
      instagramCaption: input.instagramCaption,
      sourceImageUrl: blobs.sourceBlob.url,
      assetUrl: blobs.finalBlob.url,
      assetPathname: blobs.finalBlob.pathname,
      createdAt: new Date(),
    });
    await tx.update(draft).set({ currentVersionId: versionId, status: "AWAITING_APPROVAL", approval: "PENDING", updatedAt: new Date() }).where(eq(draft.id, draftId));
  });
  return versionId;
}

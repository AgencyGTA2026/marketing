import "server-only";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { put } from "@vercel/blob";
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
  headline: z.string().min(4).max(52),
  onImageKicker: z.string().min(3).max(22),
  onImageSupport: z.string().min(12).max(90),
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
  for (const word of value.trim().split(/\s+/).filter(Boolean)) {
    const current = lines.at(-1);
    const candidate = current ? `${current} ${word}` : word;
    if (!current) lines.push(word);
    else if (estimatedLineWidth(candidate, fontSize) <= maxWidth) lines[lines.length - 1] = candidate;
    else lines.push(word);
  }
  return lines;
}

export function layoutHeadline(headline: string, maxWidth = 520) {
  for (const fontSize of [92, 84, 76, 68, 60, 52, 46]) {
    const lines = wrapToPixelWidth(headline, fontSize, maxWidth);
    if (lines.length <= 4 && lines.every((line) => estimatedLineWidth(line, fontSize) <= maxWidth)) return { lines, fontSize };
  }
  return { lines: wrapToPixelWidth(headline, 42, maxWidth), fontSize: 42 };
}

export async function renderCreative(image: Buffer, _brief?: Pick<CreativeBrief, "headline" | "onImageKicker" | "onImageSupport"> | string) {
  void _brief;
  const accent = Buffer.from('<svg width="18" height="1350" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="1350" fill="#2457E6"/></svg>');
  return sharp(image)
    .resize(1080, 1350, { fit: "cover" })
    .composite([{ input: accent, top: 0, left: 0 }])
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
  const prompt = `${BRAND_BRIEF}

Create the complete finished 1080 × 1350 social graphic. Render every line below directly in the image using proper English characters. Copy the wording exactly—do not rewrite, omit, duplicate, add, or misspell anything.

TEXT TO RENDER:
Small top label: "BAYLINE / FIELD NOTE"
Blue category kicker: "${(brief.onImageKicker || "FIELD NOTE").toUpperCase()}"
Main headline: "${brief.headline}"
Supporting sentence: "${brief.onImageSupport || ""}"
Small footer label: "BAYLINEDIGITAL.COM"

LAYOUT REQUIREMENTS:
- Keep all text horizontally aligned to one left edge.
- Keep every character fully inside generous safe margins; no text may touch or cross an edge.
- Use no more than three balanced lines for the main headline.
- Keep the supporting sentence visually separate beneath the headline.
- Make the complete English copy immediately readable at social-feed size.
- Include no other words, letters, numbers, logos, signatures, or watermarks.

Visual direction: ${brief.visualBrief}`;
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
  const nextVersion = current.social_draft_version.version + 1;
  const brief = { ...current.social_draft_version.brief, headline: input.headline, facebookCaption: input.facebookCaption, instagramCaption: input.instagramCaption };
  const headlineChanged = input.headline !== current.social_draft_version.brief.headline;
  let source: Buffer;
  let final: Buffer;
  let imagePrompt = current.social_draft_version.imagePrompt;

  if (headlineChanged) {
    const generated = await createImage(brief);
    source = generated.image;
    final = await renderCreative(generated.image);
    imagePrompt = generated.prompt;
  } else {
    const [sourceResponse, finalResponse] = await Promise.all([
      fetch(current.social_draft_version.sourceImageUrl || current.social_draft_version.assetUrl),
      fetch(current.social_draft_version.assetUrl),
    ]);
    if (!sourceResponse.ok || !finalResponse.ok) throw new Error("Unable to read the current artwork");
    [source, final] = await Promise.all([
      sourceResponse.arrayBuffer().then((buffer) => Buffer.from(buffer)),
      finalResponse.arrayBuffer().then((buffer) => Buffer.from(buffer)),
    ]);
  }
  const blobs = await uploadVersionAssets(draftId, nextVersion, source, final);
  const versionId = crypto.randomUUID();
  await db.transaction(async (tx) => {
    await tx.insert(draftVersion).values({
      ...current.social_draft_version,
      id: versionId,
      version: nextVersion,
      brief,
      facebookCaption: input.facebookCaption,
      instagramCaption: input.instagramCaption,
      imagePrompt,
      sourceImageUrl: blobs.sourceBlob.url,
      assetUrl: blobs.finalBlob.url,
      assetPathname: blobs.finalBlob.pathname,
      createdAt: new Date(),
    });
    await tx.update(draft).set({ currentVersionId: versionId, status: "AWAITING_APPROVAL", approval: "PENDING", updatedAt: new Date() }).where(eq(draft.id, draftId));
  });
  return versionId;
}

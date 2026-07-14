import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { draft, draftVersion, publicationAttempt, socialConnection } from "@/lib/db/schema";
import { decryptToken, sanitizeError } from "./crypto";
import { GRAPH_BASE_URL } from "./constants";

type MetaError = { error?: { message?: string; code?: number; error_subcode?: number; is_transient?: boolean } };

async function graph<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${GRAPH_BASE_URL}${path}`, { ...init, cache: "no-store" });
  const data = (await response.json()) as T & MetaError;
  if (!response.ok || data.error) {
    const suffix = data.error?.code ? ` (Meta ${data.error.code}${data.error.error_subcode ? `/${data.error.error_subcode}` : ""})` : "";
    throw new Error(`${data.error?.message || "Meta request failed"}${suffix}`);
  }
  return data;
}

export async function checkMetaConnection(connectionId: string) {
  const connection = await db.query.socialConnection.findFirst({ where: eq(socialConnection.id, connectionId) });
  if (!connection) throw new Error("Meta connection not found");
  try {
    const token = decryptToken(connection.encryptedPageToken);
    await graph<{ id: string }>(`/${connection.pageId}?fields=id&access_token=${encodeURIComponent(token)}`);
    await db.update(socialConnection).set({ status: "CONNECTED", lastCheckedAt: new Date(), lastError: null, updatedAt: new Date() }).where(eq(socialConnection.id, connectionId));
    return true;
  } catch (error) {
    const message = sanitizeError(error);
    await db.update(socialConnection).set({ status: message.includes("190") ? "EXPIRED" : "ERROR", lastCheckedAt: new Date(), lastError: message, updatedAt: new Date() }).where(eq(socialConnection.id, connectionId));
    return false;
  }
}

async function publishFacebook(input: { pageId: string; token: string; imageUrl: string; caption: string }) {
  const body = new URLSearchParams({ url: input.imageUrl, caption: input.caption, published: "true", access_token: input.token });
  const result = await graph<{ id: string; post_id?: string }>(`/${input.pageId}/photos`, { method: "POST", body });
  const externalPostId = result.post_id || result.id;
  return { externalPostId, permalink: `https://www.facebook.com/${externalPostId.replace("_", "/posts/")}` };
}

async function publishInstagram(input: { accountId: string; token: string; imageUrl: string; caption: string }) {
  const createBody = new URLSearchParams({ image_url: input.imageUrl, caption: input.caption, access_token: input.token });
  const container = await graph<{ id: string }>(`/${input.accountId}/media`, { method: "POST", body: createBody });

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const status = await graph<{ status_code: "EXPIRED" | "ERROR" | "FINISHED" | "IN_PROGRESS" | "PUBLISHED" }>(`/${container.id}?fields=status_code&access_token=${encodeURIComponent(input.token)}`);
    if (status.status_code === "FINISHED") break;
    if (status.status_code === "ERROR" || status.status_code === "EXPIRED") throw new Error(`Instagram container ${status.status_code.toLowerCase()}`);
    if (attempt === 9) throw new Error("Instagram container processing timed out");
    await new Promise((resolve) => setTimeout(resolve, 2_000));
  }

  const published = await graph<{ id: string }>(`/${input.accountId}/media_publish`, {
    method: "POST",
    body: new URLSearchParams({ creation_id: container.id, access_token: input.token }),
  });
  const media = await graph<{ permalink?: string }>(`/${published.id}?fields=permalink&access_token=${encodeURIComponent(input.token)}`);
  return { externalPostId: published.id, permalink: media.permalink || null };
}

export async function publishDraft(draftId: string) {
  const [record] = await db.select({ draft, version: draftVersion }).from(draft)
    .innerJoin(draftVersion, eq(draft.currentVersionId, draftVersion.id))
    .where(eq(draft.id, draftId)).limit(1);
  if (!record) throw new Error("Draft or approved version not found");
  if (record.draft.approval !== "APPROVED") throw new Error("Draft is not approved");

  const connection = await db.query.socialConnection.findFirst({ where: eq(socialConnection.ownerUserId, record.draft.approvedBy!) });
  if (!connection || connection.status !== "CONNECTED") throw new Error("Meta connection is not healthy");
  const token = decryptToken(connection.encryptedPageToken);
  await db.update(draft).set({ status: "PUBLISHING", updatedAt: new Date() }).where(eq(draft.id, draftId));

  for (const platform of record.draft.destinations) {
    const key = `${record.version.id}:${platform}`;
    const existing = await db.query.publicationAttempt.findFirst({ where: eq(publicationAttempt.idempotencyKey, key) });
    if (existing?.status === "PUBLISHED") continue;
    const attemptId = existing?.id || crypto.randomUUID();
    if (!existing) {
      await db.insert(publicationAttempt).values({ id: attemptId, draftId, versionId: record.version.id, platform, idempotencyKey: key });
    }
    await db.update(publicationAttempt).set({ status: "PUBLISHING", attempts: (existing?.attempts || 0) + 1, updatedAt: new Date() }).where(eq(publicationAttempt.id, attemptId));
    try {
      const result = platform === "FACEBOOK"
        ? await publishFacebook({ pageId: connection.pageId, token, imageUrl: record.version.assetUrl, caption: record.version.facebookCaption })
        : connection.instagramAccountId
          ? await publishInstagram({ accountId: connection.instagramAccountId, token, imageUrl: record.version.assetUrl, caption: record.version.instagramCaption })
          : (() => { throw new Error("No linked Instagram professional account"); })();
      await db.update(publicationAttempt).set({ status: "PUBLISHED", externalPostId: result.externalPostId, permalink: result.permalink, publishedAt: new Date(), lastError: null, updatedAt: new Date() }).where(eq(publicationAttempt.id, attemptId));
    } catch (error) {
      await db.update(publicationAttempt).set({ status: "FAILED", lastError: sanitizeError(error), updatedAt: new Date() }).where(eq(publicationAttempt.id, attemptId));
    }
  }

  const attempts = await db.select().from(publicationAttempt).where(and(eq(publicationAttempt.versionId, record.version.id)));
  const complete = record.draft.destinations.every((platform) => attempts.some((attempt) => attempt.platform === platform && attempt.status === "PUBLISHED"));
  await db.update(draft).set({ status: complete ? "PUBLISHED" : "PUBLISH_FAILED", claimedAt: null, updatedAt: new Date() }).where(eq(draft.id, draftId));
  return complete;
}

import "server-only";
import { and, eq, inArray, isNull, lte, lt, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { automation, draft } from "@/lib/db/schema";
import { GENERATION_LEAD_DAYS, MAX_FAILURES } from "./constants";
import { notifyOwner } from "./email";
import { generateDraftVersion, GenerationInProgressError } from "./generation";
import { publishDraft } from "./meta";
import { dueDisposition, generationWindowOpens, nextWeeklyOccurrence, occurrenceKey } from "./time";

async function claimDraft(id: string) {
  const stale = new Date(Date.now() - 10 * 60_000);
  const rows = await db.update(draft).set({ claimedAt: new Date(), updatedAt: new Date() })
    .where(and(eq(draft.id, id), or(isNull(draft.claimedAt), lt(draft.claimedAt, stale))))
    .returning({ id: draft.id });
  return rows.length === 1;
}

export async function materializeDueAutomations(now = new Date()) {
  // Fetch a slightly wider set, then enforce the exact Toronto calendar-day boundary below.
  // Three local days can span 71–73 elapsed hours when DST changes.
  const windowEnd = new Date(now.getTime() + (GENERATION_LEAD_DAYS * 24 + 2) * 3_600_000);
  const due = await db.select().from(automation).where(and(eq(automation.status, "ACTIVE"), lte(automation.nextOccurrenceAt, windowEnd))).limit(10);
  const created: string[] = [];

  for (const item of due) {
    const scheduledFor = item.nextOccurrenceAt;
    if (!scheduledFor) continue;
    if (generationWindowOpens(scheduledFor) > now) continue;
    const draftId = crypto.randomUUID();
    const inserted = await db.insert(draft).values({
      id: draftId,
      automationId: item.id,
      occurrenceKey: occurrenceKey(item.id, scheduledFor),
      scheduledFor,
      destinations: item.destinations,
    }).onConflictDoNothing({ target: draft.occurrenceKey }).returning({ id: draft.id });

    let next: Date | null = null;
    if (item.kind === "WEEKLY" && item.weekdays?.length) {
      next = nextWeeklyOccurrence({
        after: scheduledFor,
        startDate: item.startDate,
        endDate: item.endDate,
        weekdays: item.weekdays,
        publishTime: item.publishTime,
        timezone: item.timezone,
      });
    }
    await db.update(automation).set({
      lastOccurrenceAt: scheduledFor,
      nextOccurrenceAt: next,
      status: next || item.kind === "WEEKLY" ? item.status : "COMPLETED",
      updatedAt: new Date(),
    }).where(eq(automation.id, item.id));

    if (inserted[0]) created.push(draftId);
  }

  // Bound expensive image jobs per tick. Remaining rows are picked up by retryDraftGeneration.
  for (const id of created.slice(0, 2)) {
    try { await generateDraftVersion(id); }
    catch (error) {
      if (error instanceof GenerationInProgressError) continue;
      await db.update(draft).set({ failureCount: 1, claimedAt: null })
        .where(and(eq(draft.id, id), inArray(draft.status, ["GENERATING", "GENERATION_FAILED"])));
    }
  }
  return created.length;
}

export async function retryDraftGeneration() {
  const pending = await db.select().from(draft).where(and(
    inArray(draft.status, ["GENERATING", "GENERATION_FAILED"]),
    lt(draft.failureCount, MAX_FAILURES),
  )).limit(2);
  for (const item of pending) {
    try { await generateDraftVersion(item.id); }
    catch (error) {
      if (error instanceof GenerationInProgressError) continue;
      const failures = item.failureCount + 1;
      const failed = await db.update(draft).set({ failureCount: failures, claimedAt: null })
        .where(and(eq(draft.id, item.id), inArray(draft.status, ["GENERATING", "GENERATION_FAILED"]))).returning({ id: draft.id });
      if (!failed.length) continue;
      if (failures >= MAX_FAILURES) await notifyOwner("A social draft could not be generated", "Generation retries are exhausted. Open the studio to review the failure.", item.scheduledFor);
    }
  }
  return pending.length;
}

export async function processDueDrafts(now = new Date()) {
  const due = await db.select().from(draft).where(and(
    lte(draft.scheduledFor, now),
    inArray(draft.status, ["AWAITING_APPROVAL", "APPROVED", "PUBLISH_FAILED"]),
  )).limit(10);
  for (const item of due) {
    if (!(await claimDraft(item.id))) continue;
    if (dueDisposition({ scheduledFor: item.scheduledFor, now, approval: item.approval }) === "MISSED") {
      await db.update(draft).set({ status: "MISSED", claimedAt: null, updatedAt: new Date() }).where(eq(draft.id, item.id));
      await notifyOwner("A social post was skipped", "The scheduled post was not approved before its publish time. It was not published.", item.scheduledFor);
      continue;
    }
    try {
      const complete = await publishDraft(item.id);
      if (!complete && item.failureCount + 1 >= MAX_FAILURES) await notifyOwner("A social post needs attention", "One or more platforms could not publish after repeated attempts. Successful platforms will not be duplicated.", item.scheduledFor);
      if (!complete) await db.update(draft).set({ failureCount: item.failureCount + 1, claimedAt: null }).where(eq(draft.id, item.id));
    } catch (error) {
      const failures = item.failureCount + 1;
      await db.update(draft).set({ status: "PUBLISH_FAILED", failureCount: failures, claimedAt: null, lastError: error instanceof Error ? error.message.slice(0, 1000) : "Publish failed" }).where(eq(draft.id, item.id));
      if (failures >= MAX_FAILURES) await notifyOwner("A social post could not be published", "Publishing retries are exhausted. Open the studio to inspect and retry the failed platform.", item.scheduledFor);
    }
  }
  return due.length;
}

export async function runSocialTick(now = new Date()) {
  const generated = await materializeDueAutomations(now);
  const retried = await retryDraftGeneration();
  const processed = await processDueDrafts(now);
  return { generated, retried, processed, at: now.toISOString() };
}

import { and, desc, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { automation, draft, draftVersion, publicationAttempt } from "@/lib/db/schema";
import { assertSameOrigin, requireStudioApi } from "@/lib/studio-auth";
import { generateDraftVersion, editDraftVersion, GenerationInProgressError } from "@/lib/social/generation";
import { sanitizeError } from "@/lib/social/crypto";
import { generateSocialIdeas } from "@/lib/social/ideas";
import { publishDraft } from "@/lib/social/meta";
import { runSocialTick } from "@/lib/social/scheduler";
import { nextWeeklyOccurrence, occurrenceKey, zonedDateTimeToUtc } from "@/lib/social/time";

export const maxDuration = 300;

const AUTOPILOT_DEFAULTS = {
  audience: "Owners and marketing leaders at growing service businesses in Ontario.",
  keyMessage: "Choose one practical, specific takeaway that helps the audience make a clearer digital decision.",
  cta: "Visit Bayline Digital to start a conversation.",
} as const;

const PromptSchema = z.object({
  topic: z.string().trim().min(3).max(160),
  audience: z.string().trim().max(300).optional(),
  keyMessage: z.string().trim().max(600).optional(),
  cta: z.string().trim().max(160).optional(),
  url: z.string().url().optional().or(z.literal("")),
  notes: z.string().max(1200).optional(),
});

const CreateSchema = z.object({
  action: z.literal("create"),
  name: z.string().trim().max(120).optional(),
  kind: z.enum(["ONE_TIME", "WEEKLY"]),
  promptSpec: PromptSchema,
  destinations: z.array(z.enum(["FACEBOOK", "INSTAGRAM"])).min(1),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  weekdays: z.array(z.number().int().min(0).max(6)).optional(),
  publishTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  oneTimeDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

const OperationSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("ideas") }),
  CreateSchema,
  z.object({ action: z.literal("tick") }),
  z.object({ action: z.literal("approve"), draftId: z.string().uuid() }),
  z.object({ action: z.literal("publishNow"), draftId: z.string().uuid() }),
  z.object({ action: z.literal("regenerate"), draftId: z.string().uuid(), notes: z.string().max(600).optional() }),
  z.object({ action: z.literal("edit"), draftId: z.string().uuid(), headline: z.string().min(3).max(84), facebookCaption: z.string().min(3).max(1800), instagramCaption: z.string().min(3).max(1800) }),
  z.object({ action: z.literal("pause"), automationId: z.string().uuid(), paused: z.boolean() }),
  z.object({ action: z.literal("deleteSchedule"), automationId: z.string().uuid() }),
  z.object({ action: z.literal("reschedule"), draftId: z.string().uuid(), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/) }),
  z.object({ action: z.literal("cancel"), draftId: z.string().uuid() }),
  z.object({ action: z.literal("delete"), draftId: z.string().uuid() }),
  z.object({ action: z.literal("retry"), draftId: z.string().uuid() }),
]);

function response(ok: boolean, message: string, status = 200) {
  revalidatePath("/studio/social");
  return NextResponse.json({ ok, message }, { status });
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const session = await requireStudioApi(request);
    const input = OperationSchema.parse(await request.json());

    if (input.action === "ideas") {
      const [versions, schedules] = await Promise.all([
        db.select({ brief: draftVersion.brief }).from(draftVersion)
          .innerJoin(draft, eq(draftVersion.draftId, draft.id))
          .innerJoin(automation, and(eq(draft.automationId, automation.id), eq(automation.ownerUserId, session.user.id)))
          .orderBy(desc(draftVersion.createdAt)).limit(30),
        db.select({ name: automation.name, promptSpec: automation.promptSpec }).from(automation)
          .where(eq(automation.ownerUserId, session.user.id)).orderBy(desc(automation.createdAt)).limit(20),
      ]);
      const history = [
        ...versions.map(({ brief }) => `${brief.headline} — ${brief.facebookCaption.slice(0, 220)}`),
        ...schedules.map(({ name, promptSpec }) => `${name}: ${promptSpec.topic} — ${promptSpec.keyMessage}`),
      ];
      const ideas = await generateSocialIdeas([...new Set(history)]);
      return NextResponse.json({ ok: true, ideas });
    }

    if (input.action === "tick") {
      const result = await runSocialTick();
      revalidatePath("/studio/social");
      return NextResponse.json({
        ok: true,
        message: "Local social worker completed.",
        changed: result.generated > 0 || result.retried > 0 || result.processed > 0,
        ...result,
      });
    }

    if (input.action === "create") {
      if (input.kind === "WEEKLY" && !input.weekdays?.length) return response(false, "Select at least one weekday.", 400);
      const now = new Date();
      const oneTimeAt = input.kind === "ONE_TIME" ? zonedDateTimeToUtc(input.oneTimeDate || input.startDate, input.publishTime) : null;
      const next = oneTimeAt || nextWeeklyOccurrence({
        after: new Date(now.getTime() - 60_000),
        startDate: input.startDate,
        endDate: input.endDate,
        weekdays: input.weekdays || [],
        publishTime: input.publishTime,
      });
      if (!next || next <= now) return response(false, "The first publish time must be in the future.", 400);
      const automationId = crypto.randomUUID();
      const promptSpec = {
        topic: input.promptSpec.topic,
        audience: input.promptSpec.audience || AUTOPILOT_DEFAULTS.audience,
        keyMessage: input.promptSpec.keyMessage || AUTOPILOT_DEFAULTS.keyMessage,
        cta: input.promptSpec.cta || AUTOPILOT_DEFAULTS.cta,
        url: input.promptSpec.url || undefined,
        notes: input.promptSpec.notes || undefined,
      };
      await db.insert(automation).values({
        id: automationId,
        ownerUserId: session.user.id,
        name: input.name || input.promptSpec.topic.slice(0, 120),
        kind: input.kind,
        promptSpec,
        destinations: input.destinations,
        startDate: input.startDate,
        endDate: input.endDate,
        weekdays: input.kind === "WEEKLY" ? input.weekdays : null,
        publishTime: input.publishTime,
        oneTimeAt,
        nextOccurrenceAt: next,
      });
      const draftId = crypto.randomUUID();
      await db.insert(draft).values({ id: draftId, automationId, occurrenceKey: occurrenceKey(automationId, next), scheduledFor: next, destinations: input.destinations });
      const following = input.kind === "WEEKLY" ? nextWeeklyOccurrence({ after: next, startDate: input.startDate, endDate: input.endDate, weekdays: input.weekdays || [], publishTime: input.publishTime }) : null;
      await db.update(automation).set({ lastOccurrenceAt: next, nextOccurrenceAt: following, status: following ? "ACTIVE" : "COMPLETED" }).where(eq(automation.id, automationId));
      try {
        await generateDraftVersion(draftId);
      } catch (error) {
        if (error instanceof Error && error.name === "GenerationCancelledError") {
          return response(true, "Schedule created. Draft generation was cancelled.");
        }
        return response(true, "Schedule created. Draft generation will retry automatically; no action is needed unless retries are exhausted.");
      }
      return response(true, input.kind === "WEEKLY"
        ? "Recurring schedule created. The first draft is ready; future drafts will generate automatically three days ahead."
        : "One-time schedule created and its draft is ready for approval.");
    }

    if (input.action === "approve") {
      const rows = await db.update(draft).set({ approval: "APPROVED", status: "APPROVED", approvedAt: new Date(), approvedBy: session.user.id, updatedAt: new Date() })
        .where(and(eq(draft.id, input.draftId), eq(draft.status, "AWAITING_APPROVAL"))).returning({ id: draft.id });
      return rows.length ? response(true, "Draft approved for publishing.") : response(false, "Only a current, unapproved draft can be approved.", 409);
    }

    if (input.action === "publishNow") {
      const item = await db.query.draft.findFirst({ where: eq(draft.id, input.draftId) });
      if (!item || item.approval !== "APPROVED") return response(false, "Approve this draft before publishing.", 409);
      const complete = await publishDraft(input.draftId);
      return response(complete, complete ? "Published to every selected destination." : "At least one destination failed. Successful posts will not be duplicated.", complete ? 200 : 502);
    }

    if (input.action === "regenerate") {
      await generateDraftVersion(input.draftId, input.notes);
      return response(true, "A new immutable version is ready for review.");
    }
    if (input.action === "edit") {
      await editDraftVersion(input.draftId, input);
      return response(true, "Edits saved as a new version. Approval was reset.");
    }
    if (input.action === "pause") {
      await db.update(automation).set({ status: input.paused ? "PAUSED" : "ACTIVE", updatedAt: new Date() }).where(and(eq(automation.id, input.automationId), eq(automation.ownerUserId, session.user.id)));
      return response(true, input.paused ? "Automation paused." : "Automation resumed.");
    }
    if (input.action === "deleteSchedule") {
      const result = await db.transaction(async (tx) => {
        const owned = await tx.select({ id: automation.id }).from(automation)
          .where(and(eq(automation.id, input.automationId), eq(automation.ownerUserId, session.user.id))).limit(1);
        if (!owned.length) return null;

        const linked = await tx.select({ id: draft.id, status: draft.status }).from(draft)
          .where(eq(draft.automationId, input.automationId));
        const linkedIds = linked.map((item) => item.id);
        const publishedAttempts = linkedIds.length
          ? await tx.select({ draftId: publicationAttempt.draftId }).from(publicationAttempt)
            .where(and(inArray(publicationAttempt.draftId, linkedIds), eq(publicationAttempt.status, "PUBLISHED")))
          : [];
        const protectedIds = new Set(publishedAttempts.map((item) => item.draftId));
        const removableIds = linked
          .filter((item) => !["PUBLISHED", "PUBLISHING"].includes(item.status) && !protectedIds.has(item.id))
          .map((item) => item.id);

        if (removableIds.length) {
          await tx.delete(publicationAttempt).where(inArray(publicationAttempt.draftId, removableIds));
          await tx.delete(draft).where(inArray(draft.id, removableIds));
        }
        await tx.delete(automation).where(eq(automation.id, input.automationId));
        return { removedDrafts: removableIds.length };
      });
      if (!result) return response(false, "Schedule not found.", 404);
      return response(true, `Schedule deleted${result.removedDrafts ? ` with ${result.removedDrafts} unpublished ${result.removedDrafts === 1 ? "draft" : "drafts"}` : ""}. Published history was preserved.`);
    }
    if (input.action === "reschedule") {
      const scheduledFor = zonedDateTimeToUtc(input.date, input.time);
      if (scheduledFor <= new Date()) return response(false, "Choose a future publish time.", 400);
      await db.update(draft).set({ scheduledFor, approval: "PENDING", approvedAt: null, approvedBy: null, status: "AWAITING_APPROVAL", updatedAt: new Date() }).where(and(eq(draft.id, input.draftId), inArray(draft.status, ["AWAITING_APPROVAL", "APPROVED", "MISSED", "PUBLISH_FAILED"])));
      return response(true, "Draft rescheduled. Approval was reset.");
    }
    if (input.action === "cancel") {
      const owned = await db.select({ id: draft.id }).from(draft).innerJoin(automation, and(eq(draft.automationId, automation.id), eq(automation.ownerUserId, session.user.id))).where(eq(draft.id, input.draftId)).limit(1);
      if (!owned.length) return response(false, "Draft not found.", 404);
      const cancelled = await db.update(draft).set({ status: "CANCELLED", approval: "PENDING", approvedAt: null, approvedBy: null, claimedAt: null, updatedAt: new Date() })
        .where(and(eq(draft.id, input.draftId), inArray(draft.status, ["GENERATING", "AWAITING_APPROVAL", "APPROVED", "GENERATION_FAILED"]))).returning({ id: draft.id });
      return cancelled.length ? response(true, "Draft cancelled. Generation will stop after its current stage.") : response(false, "This draft can no longer be cancelled.", 409);
    }
    if (input.action === "delete") {
      const owned = await db.select({ id: draft.id }).from(draft).innerJoin(automation, and(eq(draft.automationId, automation.id), eq(automation.ownerUserId, session.user.id))).where(eq(draft.id, input.draftId)).limit(1);
      if (!owned.length) return response(false, "Draft not found.", 404);
      const deleted = await db.delete(draft).where(and(
        eq(draft.id, input.draftId),
        inArray(draft.status, ["AWAITING_APPROVAL", "APPROVED", "GENERATION_FAILED", "MISSED", "CANCELLED"]),
      )).returning({ id: draft.id });
      return deleted.length ? response(true, "Draft permanently deleted from the queue.") : response(false, "Cancel active generation before deleting this draft.", 409);
    }
    if (input.action === "retry") {
      const item = await db.query.draft.findFirst({ where: eq(draft.id, input.draftId) });
      if (!item) return response(false, "Draft not found.", 404);
      if (item.status === "GENERATION_FAILED") await generateDraftVersion(item.id, "Retry the previous generation while keeping the approved strategy.");
      else if (item.approval === "APPROVED") await publishDraft(item.id);
      else return response(false, "Approve the draft before retrying publication.", 409);
      return response(true, "Retry completed.");
    }
    return response(false, "Unsupported action.", 400);
  } catch (error) {
    if (error instanceof z.ZodError) return response(false, error.issues[0]?.message || "Invalid input", 400);
    if (error instanceof GenerationInProgressError) return response(false, error.message, 409);
    const message = error instanceof Error && error.message === "UNAUTHORIZED" ? "Unauthorized" : error instanceof Error ? error.message : "Request failed";
    return response(false, message === "Unauthorized" ? message : sanitizeError(error), message === "Unauthorized" ? 401 : 500);
  }
}

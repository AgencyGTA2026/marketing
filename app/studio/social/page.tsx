import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { automation, draft, draftVersion, publicationAttempt, socialConnection } from "@/lib/db/schema";
import { requireStudioSession } from "@/lib/studio-auth";
import { StudioClient, type StudioData } from "./studio-client";

export const dynamic = "force-dynamic";

export default async function SocialStudioPage() {
  const session = await requireStudioSession();
  const [connection, automations, drafts, attempts] = await Promise.all([
    db.query.socialConnection.findFirst({ where: eq(socialConnection.ownerUserId, session.user.id) }),
    db.select().from(automation).where(eq(automation.ownerUserId, session.user.id)).orderBy(asc(automation.nextOccurrenceAt)),
    db.select({ draft, version: draftVersion }).from(draft).leftJoin(draftVersion, eq(draft.currentVersionId, draftVersion.id)).orderBy(desc(draft.scheduledFor)).limit(100),
    db.select().from(publicationAttempt).orderBy(desc(publicationAttempt.createdAt)).limit(100),
  ]);
  const ownDrafts = drafts.filter((item) => !item.draft.automationId || automations.some((entry) => entry.id === item.draft.automationId));
  const data: StudioData = JSON.parse(JSON.stringify({ connection: connection || null, automations, drafts: ownDrafts, attempts, ownerEmail: session.user.email }));
  return <StudioClient data={data} />;
}

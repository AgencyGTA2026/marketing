import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { socialConnection } from "@/lib/db/schema";
import { assertSameOrigin, requireStudioApi } from "@/lib/studio-auth";

export async function POST(request: Request) {
  assertSameOrigin(request);
  const session = await requireStudioApi(request);
  await db.update(socialConnection).set({ status: "DISCONNECTED", encryptedPageToken: "revoked", updatedAt: new Date() }).where(eq(socialConnection.ownerUserId, session.user.id));
  return NextResponse.json({ ok: true });
}

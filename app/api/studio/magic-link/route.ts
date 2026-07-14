import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { assertSameOrigin } from "@/lib/studio-auth";
import { sanitizeError } from "@/lib/social/crypto";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const { email } = (await request.json()) as { email?: string };
    const normalized = email?.trim().toLowerCase();
    const owner = process.env.STUDIO_OWNER_EMAIL?.trim().toLowerCase();

    // Keep the response indistinguishable for non-owner addresses.
    if (!normalized || !owner || normalized !== owner) return NextResponse.json({ ok: true });

    const existing = await db.query.user.findFirst({ where: eq(user.email, owner) });
    if (!existing) {
      await db.insert(user).values({
        id: crypto.randomUUID(),
        name: "Studio Owner",
        email: owner,
        emailVerified: true,
      }).onConflictDoNothing({ target: user.email });
    }

    await auth.api.signInMagicLink({
      body: { email: owner, callbackURL: "/studio/social", errorCallbackURL: "/studio/sign-in" },
      headers: request.headers,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[studio/magic-link]", sanitizeError(error));
    return NextResponse.json({ ok: false, error: "Unable to send a sign-in link right now." }, { status: 500 });
  }
}

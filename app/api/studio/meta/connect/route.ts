import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { oauthState } from "@/lib/db/schema";
import { requireStudioApi } from "@/lib/studio-auth";
import { GRAPH_VERSION } from "@/lib/social/constants";

export async function GET(request: Request) {
  const session = await requireStudioApi(request);
  const state = crypto.randomUUID();
  await db.insert(oauthState).values({ state, userId: session.user.id, expiresAt: new Date(Date.now() + 10 * 60_000) });
  const callback = new URL("/api/studio/meta/callback", process.env.BETTER_AUTH_URL).toString();
  const query = new URLSearchParams({
    client_id: process.env.META_APP_ID!,
    redirect_uri: callback,
    state,
    response_type: "code",
    scope: "pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish",
  });
  return NextResponse.redirect(`https://www.facebook.com/${GRAPH_VERSION}/dialog/oauth?${query}`);
}

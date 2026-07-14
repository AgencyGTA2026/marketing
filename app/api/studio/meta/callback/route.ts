import { and, eq, gt } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { oauthState, socialConnection } from "@/lib/db/schema";
import { requireStudioApi } from "@/lib/studio-auth";
import { encryptToken, sanitizeError } from "@/lib/social/crypto";
import { GRAPH_BASE_URL } from "@/lib/social/constants";

type TokenResponse = { access_token?: string; token_type?: string; expires_in?: number; error?: { message: string } };
type PermissionResponse = { data?: Array<{ permission: string; status: "granted" | "declined" | "expired" }>; error?: { message: string } };
type PageResponse = { data?: Array<{ id: string; name: string; access_token?: string; tasks?: string[]; instagram_business_account?: { id: string; username?: string } }>; error?: { message: string } };

const REQUIRED_META_PERMISSIONS = [
  "pages_show_list",
  "pages_read_engagement",
  "pages_manage_posts",
  "instagram_basic",
  "instagram_content_publish",
] as const;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const stateValue = url.searchParams.get("state");
  try {
    const session = await requireStudioApi(request);
    if (!code || !stateValue) throw new Error("Meta did not return an authorization code");
    const stored = await db.query.oauthState.findFirst({ where: and(eq(oauthState.state, stateValue), eq(oauthState.userId, session.user.id), gt(oauthState.expiresAt, new Date())) });
    if (!stored) throw new Error("Meta authorization state is invalid or expired");
    await db.delete(oauthState).where(eq(oauthState.state, stateValue));
    const callback = new URL("/api/studio/meta/callback", process.env.BETTER_AUTH_URL).toString();
    const shortResponse = await fetch(`${GRAPH_BASE_URL}/oauth/access_token?${new URLSearchParams({ client_id: process.env.META_APP_ID!, client_secret: process.env.META_APP_SECRET!, redirect_uri: callback, code })}`, { cache: "no-store" });
    const short = await shortResponse.json() as TokenResponse;
    if (!short.access_token) throw new Error(short.error?.message || "Unable to exchange Meta authorization code");
    const longResponse = await fetch(`${GRAPH_BASE_URL}/oauth/access_token?${new URLSearchParams({ grant_type: "fb_exchange_token", client_id: process.env.META_APP_ID!, client_secret: process.env.META_APP_SECRET!, fb_exchange_token: short.access_token })}`, { cache: "no-store" });
    const long = await longResponse.json() as TokenResponse;
    if (!long.access_token) throw new Error(long.error?.message || "Unable to obtain a long-lived Meta token");

    const permissionsResponse = await fetch(`${GRAPH_BASE_URL}/me/permissions?access_token=${encodeURIComponent(long.access_token)}`, { cache: "no-store" });
    const permissions = await permissionsResponse.json() as PermissionResponse;
    if (!permissionsResponse.ok || permissions.error) throw new Error(permissions.error?.message || "Unable to inspect granted Meta permissions");
    const granted = new Set(permissions.data?.filter((item) => item.status === "granted").map((item) => item.permission));
    console.info("[studio/meta/callback] granted permissions:", [...granted].sort().join(", ") || "none");
    const missing = REQUIRED_META_PERMISSIONS.filter((permission) => !granted.has(permission));
    if (missing.length) {
      throw new Error(`Meta did not grant required permissions: ${missing.join(", ")}. Enable them for this Meta app's configured login use case and reconnect.`);
    }

    const pagesResponse = await fetch(`${GRAPH_BASE_URL}/me/accounts?fields=id,name,access_token,tasks,instagram_business_account{id,username}&limit=100&access_token=${encodeURIComponent(long.access_token)}`, { cache: "no-store" });
    const pages = await pagesResponse.json() as PageResponse;
    if (!pagesResponse.ok || pages.error) throw new Error(pages.error?.message || "Unable to list manageable Facebook Pages");
    console.info(
      "[studio/meta/callback] pages returned:",
      pages.data?.length || 0,
      "task sets:",
      pages.data?.map((item) => item.tasks?.sort().join("+") || "none").join(", ") || "none",
    );

    const page = pages.data?.find((item) => item.instagram_business_account && item.access_token)
      || pages.data?.find((item) => item.access_token);
    if (!page?.access_token) {
      throw new Error("No manageable Facebook Page was found");
    }
    const values = {
      pageId: page.id,
      pageName: page.name,
      instagramAccountId: page.instagram_business_account?.id || null,
      instagramUsername: page.instagram_business_account?.username || null,
      encryptedPageToken: encryptToken(page.access_token),
      tokenExpiresAt: long.expires_in ? new Date(Date.now() + long.expires_in * 1000) : null,
      status: "CONNECTED" as const,
      lastCheckedAt: new Date(),
      lastError: null,
      updatedAt: new Date(),
    };
    await db.insert(socialConnection).values({ id: crypto.randomUUID(), ownerUserId: session.user.id, ...values })
      .onConflictDoUpdate({ target: socialConnection.ownerUserId, set: values });
    return NextResponse.redirect(new URL("/studio/social?meta=connected", request.url));
  } catch (error) {
    console.error("[studio/meta/callback]", sanitizeError(error));
    const target = new URL("/studio/social", request.url);
    target.searchParams.set("meta", "error");
    target.searchParams.set("message", sanitizeError(error));
    return NextResponse.redirect(target);
  }
}

import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getStudioSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  const owner = process.env.STUDIO_OWNER_EMAIL?.toLowerCase();
  if (!session || !owner || session.user.email.toLowerCase() !== owner) return null;
  return session;
}

export async function requireStudioSession() {
  const session = await getStudioSession();
  if (!session) redirect("/studio/sign-in");
  return session;
}

export async function requireStudioApi(request?: Request) {
  const session = await auth.api.getSession({ headers: request?.headers || await headers() });
  const owner = process.env.STUDIO_OWNER_EMAIL?.toLowerCase();
  if (!session || !owner || session.user.email.toLowerCase() !== owner) throw new Error("UNAUTHORIZED");
  return session;
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const expected = process.env.BETTER_AUTH_URL || process.env.SITE_URL;
  if (origin && expected && new URL(origin).origin !== new URL(expected).origin) throw new Error("INVALID_ORIGIN");
}

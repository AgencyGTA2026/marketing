import { NextRequest, NextResponse } from "next/server";
import { hostnameFromHostHeader, isLoopbackHostname } from "@/lib/local-studio";

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get("host") || request.headers.get("x-forwarded-host") || request.nextUrl.hostname;
  if (!isLoopbackHostname(hostnameFromHostHeader(hostHeader))) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
    });
  }
  if (!request.nextUrl.pathname.startsWith("/studio/social")) return NextResponse.next();
  const hasSession = request.cookies.has("better-auth.session_token") || request.cookies.has("__Secure-better-auth.session_token");
  if (!hasSession) {
    const signIn = new URL("/studio/sign-in", request.url);
    signIn.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(signIn);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/studio/:path*",
    "/api/studio/:path*",
    "/api/auth/:path*",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MOBILE_RE = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already on mobile route — never redirect again
  if (pathname.startsWith("/m")) return NextResponse.next();

  const ua = request.headers.get("user-agent") ?? "";
  if (MOBILE_RE.test(ua)) {
    const url = request.nextUrl.clone();
    url.pathname = "/m";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|.*\\..*).*)"],
};

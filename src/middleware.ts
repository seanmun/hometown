/* ============================================================
   Middleware — lets the studio live on its own subdomain.
   Requests to admin.<your-domain> are rewritten to /admin,
   so once the subdomain is added to the Vercel project,
   admin.hometownhotspots.com just works.
   ============================================================ */

import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("admin.") && !request.nextUrl.pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  // Skip static assets and API routes.
  matcher: ["/((?!_next|api|images|.*\\..*).*)"],
};

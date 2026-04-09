import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PROTECTED_ROUTES, AUTH_ROUTES } from "@/config/routes";

export function proxy(request: NextRequest) {
  void request;
  void PROTECTED_ROUTES;
  void AUTH_ROUTES;
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

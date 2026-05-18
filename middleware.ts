import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const isDev = process.env.NODE_ENV === "development";

export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());

  // React requires 'unsafe-eval' in dev mode for stack trace reconstruction.
  // It is never used in production — safe to gate on NODE_ENV.
  const scriptSrc = isDev
    ? `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://accounts.google.com`
    : `script-src 'self' 'nonce-${nonce}' https://accounts.google.com`;

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    scriptSrc,
    // 'unsafe-inline' kept — React style={{}} props produce HTML style="" attributes which cannot be nonced
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://api.andgatepos.com",
    "font-src 'self' data:",
    "connect-src 'self' https://api.andgatepos.com https://accounts.google.com",
    "worker-src 'self'",
    "manifest-src 'self'",
    "media-src 'self'",
  ].join("; ");

  // x-nonce on the REQUEST lets Next.js App Router apply the nonce to its
  // own generated inline scripts (RSC payloads, chunk bootstrap, etc.)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

// Run on all page routes. Skip Next.js internals, static assets, and prefetch
// requests — those don't need a per-request nonce.
export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon\\.ico|images|svg|data).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

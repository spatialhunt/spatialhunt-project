import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication (prefix-matched)
const PROTECTED_PREFIXES = ["/dashboard", "/landlord", "/admin", "/hunter", "/list-property", "/logout"];

// Routes only accessible when NOT signed in
const AUTH_ONLY_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];

/**
 * NOTE ON SESSION STORAGE:
 * The JWT is stored in browser sessionStorage (lib/auth-client.ts).
 * sessionStorage is not readable by the server or middleware, so full
 * server-side route protection requires setting an httpOnly cookie on login.
 *
 * Current approach:
 * - Client-side guards in each dashboard layout (useAuthSession())
 * - Proxy hard-blocks /admin/* when there is no sh_token cookie
 * - When a future login endpoint sets httpOnly sh_token cookie, extend the
 *   token-check logic below to cover all PROTECTED_PREFIXES.
 */
function getToken(req: NextRequest): string | null {
  return req.cookies.get("sh_token")?.value ?? null;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow API routes through
  if (pathname.startsWith("/api/")) return NextResponse.next();

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthOnly  = AUTH_ONLY_ROUTES.some((p) => pathname.startsWith(p));

  if (!isProtected && !isAuthOnly) return NextResponse.next();

  const token = getToken(req);

  // Hard-block /admin/* at the network level even without full JWT verification
  if (pathname.startsWith("/admin") && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/landlord/:path*",
    "/admin/:path*",
    "/hunter/:path*",
    "/list-property/:path*",
    "/logout",
    "/login",
    "/signup/:path*",
    "/forgot-password",
    "/reset-password",
  ],
};

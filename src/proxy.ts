import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isAuthenticated = !!req.auth;
  // Only consider a user "fully set up" if they have a creator profile in their token.
  // Without this check, Google OAuth users (who have a session but no creator yet)
  // would get bounced: /dashboard → /login → /dashboard → loop.
  const hasCreator = !!(req.auth as { user?: { creatorId?: string } } | null)?.user?.creatorId;
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (isDashboard && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && isAuthenticated && hasCreator) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ["/admin"];

// Define auth routes that should redirect if already authenticated
const authRoutes = ["/login", "/register"];

// Token data interface
interface TokenData {
  token: string;
  expiresAt: number;
}

// Helper function to check if token is valid and not expired
function isValidToken(tokenData: string | undefined): boolean {
  if (!tokenData) return false;

  try {
    const parsed: TokenData = JSON.parse(tokenData);

    // Check if token exists and is not expired
    if (!parsed.token || !parsed.expiresAt) return false;

    // Check if token is expired
    if (Date.now() > parsed.expiresAt) return false;

    return true;
  } catch (error) {
    // Invalid JSON or other parsing error
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get token data from cookies (preferred) or fallback to simple token
  const tokenData = request.cookies.get("auth_token_data")?.value;
  const simpleToken = request.cookies.get("auth_token")?.value;

  // Check authentication status
  let isAuthenticated = false;

  if (tokenData) {
    // Check structured token data with expiration
    isAuthenticated = isValidToken(tokenData);
  } else if (simpleToken) {
    // Fallback to simple token check (for backward compatibility)
    isAuthenticated = !!simpleToken;
  }

  // If trying to access protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    // Clear invalid/expired cookies
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("auth_token");
    response.cookies.delete("auth_token_data");

    return response;
  }

  // If trying to access auth routes while already authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

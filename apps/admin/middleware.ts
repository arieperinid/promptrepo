import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // TODO: Implement actual admin role checking
  // This is a placeholder guard without real logic
  
  const { pathname } = request.nextUrl;
  
  // For now, just log the request and continue
  console.log(`Admin access attempt to: ${pathname}`);
  
  // Future implementation would:
  // 1. Extract user session from cookie/header
  // 2. Verify user role from database
  // 3. Redirect to login if not authenticated
  // 4. Redirect to unauthorized if not admin
  
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
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

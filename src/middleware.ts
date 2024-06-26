import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const tokenValue = request.cookies.get("token")?.value || "";

  if (isPublicPath && tokenValue) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !tokenValue) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup", "/verifyemail"],
};

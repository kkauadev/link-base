import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "./constants/base-url";

export async function middleware(request: NextRequest) {
  const token = request.cookies.has("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/folder/:path*", "/link/:path*"],
};

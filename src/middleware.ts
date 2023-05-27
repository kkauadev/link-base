import Cookies from "js-cookie";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(request.cookies.has("token"));
  if (!request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/folder/:path*", "/link/:path*"],
};

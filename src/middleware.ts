import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "./constants/base-url";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  try {
    const res = await fetch(`${baseUrl}/verify`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!res.ok && res.status === 401) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/folder/:path*", "/link/:path*"],
};

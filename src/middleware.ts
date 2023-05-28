import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "./constants/base-url";

export async function middleware(request: NextRequest) {
  if (!request.cookies.has("token")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const token = request.cookies.get("token");
  const id = request.cookies.get("id");

  try {
    const res = await fetch(`${baseUrl}/user/${id?.value}`, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    if (!res.ok) {
      throw new Error("Not authorized");
    }

    return;
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/folder/:path*", "/link/:path*"],
};

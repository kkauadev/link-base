import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "./constants/base-url";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const id = request.cookies.get("id");

  if (!token || !id) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const res = await fetch(`${baseUrl}/user/${id?.value}`, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      next: {
        revalidate: 10,
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

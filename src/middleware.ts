import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    console.log("Middleware running on:", req.nextUrl.pathname);
    return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
    matcher: ["/movies", "/movies/:path*"],
}
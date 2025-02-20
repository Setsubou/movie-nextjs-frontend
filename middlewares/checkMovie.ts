import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./types";
import checkAccessToken from "./util/checkAccessToken";
import { cookies } from "next/headers";

// Check for access token when accessing movies, and check its validity.
// If not valid, delete access token and redirect back to login screen

export const checkAuth: MiddlewareFactory = (next: NextMiddleware) => {
    return async (req: NextRequest, _next: NextFetchEvent) => {
        // Early return if URL is not part of movies
        if(!req.nextUrl.pathname.startsWith("/movies")) {
            return next(req, _next);
        }

        const cookieStore = await cookies()
        const access_token = cookieStore.get("access_token")
        
        if (access_token == null) {
            return NextResponse.redirect(new URL("/", req.url))
        }

        const isTokenValid = await checkAccessToken()
        if(!isTokenValid) {
            (await cookies()).delete("access_token")
            return NextResponse.redirect(new URL("/", req.url))
        }
        
        return next(req, _next);   
    }
}
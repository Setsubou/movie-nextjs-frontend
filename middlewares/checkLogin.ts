import { NextMiddleware, NextRequest, NextFetchEvent, NextResponse } from "next/server";
import { MiddlewareFactory } from "./types";
import checkAccessToken from "./util/checkAccessToken";
import { cookies } from "next/headers";

// Check for access token when accessing login, and check its validity.
// If valid, redirect to movie screen automatically otherwise delete it

export const checkLogin: MiddlewareFactory = (next: NextMiddleware) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    // Early return if the URL is not the root
    if (req.nextUrl.pathname !== "/") {
      return next(req, _next);
    }
    
    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token");
    
    if (access_token == null) {
        return next(req, _next)
    }

    const isTokenValid = await checkAccessToken()
    if(isTokenValid) {
        return NextResponse.redirect(new URL("/movies", req.url))
    } else {
        (await cookies()).delete("access_token")
    }

    return next(req, _next);
  };
};

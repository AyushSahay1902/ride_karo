import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/home",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const currentUrl = req.nextUrl.clone();
  const isHome = currentUrl.pathname === "/home";

  if (userId && isPublicRoute(req) && !isHome) {
    return NextResponse.rewrite(
      new URL("/home", req.nextUrl.origin).toString()
    );
  }

  if (!userId && !isPublicRoute(req)) {
    return NextResponse.rewrite(
      new URL("/sign-in", req.nextUrl.origin).toString()
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

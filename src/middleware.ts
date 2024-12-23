'use server';

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { readPayloadJose } from "@/lib/jwt";

export const middleware = async (request: NextRequest) => {
  const cookiesStore = await cookies(); // Await cookies
  const token = cookiesStore.get("token");

  const url = request.nextUrl;
  const pathname = url.pathname;

  if (token) {
    let tokenData;
    try {
      tokenData = await readPayloadJose<{ id: string; roles: string }>(token.value);
      console.log("Decoded token data:", tokenData);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return NextResponse.redirect(new URL("/forbidden", url)); // Redirect to forbidden page
    }

    // Protect login and register if token exists
    const isAuthPage = pathname === "/login" || pathname === "/register";
    if (isAuthPage) {
      console.log(`Redirecting from ${pathname} to home because user is already authenticated.`);
      return NextResponse.redirect(new URL("/", url)); // Redirect to homepage
    }

    // Protect admin routes
    const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
    if (isAdminRoute) {
      if (!tokenData.roles.includes("admin")) {
        console.log(tokenData.roles);
        console.warn("Access denied: User does not have the 'admin' role.");
        return NextResponse.redirect(new URL("/forbidden", url)); // Redirect to forbidden page
      }

      console.log("Access granted to admin route.");
    }
  } else {
    console.log("No token found.");
    const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

    if (isAdminRoute) {
      console.warn("Unauthorized access to admin route without token.");
      return NextResponse.redirect(new URL("/forbidden", url)); // Redirect to forbidden page
    }
  }

  console.log(`Accessing path: ${pathname}`);
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/admin/:path*",  // Match all admin routes
    "/api/admin/:path*", // Match all API admin routes
    "/login",          // Protect login page
    "/register",       // Protect register page
  ],
};

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/", "/login"];
const BUYER_ROUTES = ["/buyer"];
const SUPPLIER_ROUTES = ["/supplier"];

async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req) {
  const token = req.cookies.get("promote_bharat_token")?.value;
  const { pathname } = req.nextUrl;
  const user = token ? await verifyToken(token) : null;

  // 🟢 PUBLIC ROUTES
  if (PUBLIC_ROUTES.includes(pathname)) {
    if (user && pathname === "/login") {
      return NextResponse.redirect(
        new URL(`/${user.role}/dashboard`, req.url)
      );
    }
    return NextResponse.next();
  }

  // 🔴 NOT LOGGED IN → protect dashboard routes
  if (!user) {
    if (pathname.startsWith("/buyer") || pathname.startsWith("/supplier") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // 🔐 ROLE BASED ACCESS
  if (pathname.startsWith("/supplier") && user.role !== "supplier") {
    return NextResponse.redirect(
      new URL(`/${user.role}/dashboard`, req.url)
    );
  }

  if (pathname.startsWith("/buyer") && user.role !== "buyer") {
    return NextResponse.redirect(
      new URL(`/${user.role}/dashboard`, req.url)
    );
  }

  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(
      new URL(`/${user.role}/dashboard`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/buyer/:path*",
    "/supplier/:path*",
    "/admin/:path*",
  ],
};
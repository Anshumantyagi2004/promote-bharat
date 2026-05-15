import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/", "/login"];

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
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("promote_bharat_token")?.value;

  // public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // no token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = await verifyToken(token);

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // only role check here (NO DB CALL)
  if (pathname.startsWith("/supplier") && user.role !== "supplier") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/buyer") && user.role !== "buyer") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
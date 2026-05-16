import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/db";
import User from "@/models/User";
import Session from "@/models/Session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("promote_bharat_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const session = await Session.findById(decoded.sessionId);

    // ❌ SESSION NOT FOUND → FORCE LOGOUT
    if (!session) {
      const response = NextResponse.json({ user: null });

      response.cookies.set("promote_bharat_token", "", {
        path: "/",
        maxAge: 0,
      });

      return response;
    }

    const user = await User.findById(decoded.id).select("-password");

    return NextResponse.json({ user });

  } catch (err) {
    return NextResponse.json({ user: null });
  }
}
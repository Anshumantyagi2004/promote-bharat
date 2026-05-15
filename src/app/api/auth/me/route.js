import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/db";
import User from "@/models/User";
import Session from "@/models/Session";

export async function GET() {
  try {
    await connectDB();

    // ✅ FIXED: await cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get("promote_bharat_token")?.value;

    if (!token) {
      return Response.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 session check (important)
    const sessionExists = await Session.findById(decoded.sessionId);

    if (!sessionExists) {
      return Response.json({ user: null });
    }

    const user = await User.findById(decoded.id).select("-password");

    return Response.json({ user });

  } catch (error) {
    return Response.json({ user: null });
  }
}
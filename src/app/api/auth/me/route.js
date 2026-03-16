import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();   // important
    const token = cookieStore.get("promote_bharat_token")?.value;

    if (!token) {
      return Response.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    return Response.json({ user });
  } catch (error) {
    return Response.json({ user: null });
  }
}
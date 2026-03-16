import { connectDB } from "@/config/db";
import { registerUser } from "@/controllers/auth/authController";
import { serialize } from "cookie";

export async function POST(req) {
  try {

    await connectDB();

    const body = await req.json();

    const { user, token } = await registerUser(body);

    const cookie = serialize(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * process.env.COOKIE_EXPIRE,
      path: "/",
      sameSite: "lax",
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
        user,
      }),
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {

    return Response.json(
      { success: false, message: error.message },
      { status: 400 }
    );

  }
}
import { cookies } from "next/headers";

export async function POST() {

  const cookieStore = await cookies();   // FIX

  cookieStore.delete("promote_bharat_token");

  return Response.json({
    success: true,
    message: "Logout successful",
  });
}
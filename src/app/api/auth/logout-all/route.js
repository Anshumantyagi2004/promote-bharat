// import { connectDB } from "@/config/db";
// import User from "@/models/User";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const cookieStore = await cookies();

//     const token = cookieStore.get("promote_bharat_token")?.value;

//     if (!token) {
//       return Response.json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     await User.findByIdAndUpdate(decoded.id, {
//       $inc: { tokenVersion: 1 },
//     });

//     cookieStore.delete("promote_bharat_token");

//     return Response.json({
//       success: true,
//       message: "Logged out from all devices",
//     });
//   } catch (error) {
//     console.log(error);

//     return Response.json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// }
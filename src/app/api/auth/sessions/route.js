import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Session from "@/models/Session";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
    try {
        await connectDB();

        // ✅ SAFE cookie access
        const cookieStore = await cookies();
        const token = cookieStore.get("promote_bharat_token")?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const sessions = await Session.find({ userId: decoded.id })
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            sessions,
        });

    } catch (err) {
        console.log(err);

        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await connectDB();

        const cookieStore = cookies();
        const token = cookieStore.get("promote_bharat_token")?.value;

        if (!token) {
            return Response.json(
                { success: false, message: "No token found" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { id: userId, sessionId } = decoded;

        // 🔥 DELETE ALL SESSIONS EXCEPT CURRENT ONE
        await Session.deleteMany({
            userId,
            _id: { $ne: sessionId },
        });

        return Response.json({
            success: true,
            message: "All other devices logged out",
        });

    } catch (err) {
        console.log(err);

        return Response.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
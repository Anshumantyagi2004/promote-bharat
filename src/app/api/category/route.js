import { connectDB } from "@/config/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export const getUserId = (req) => {
  return req.headers.get("x-user-id");
};

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { categoryName, metaTitle, metaDescription, categoryDescription, userId } = body;

    if (!categoryName || !userId) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const category = await Category.create({
      categoryName,
      metaTitle,
      metaDescription,
      categoryDescription,
      userId,
    });

    return NextResponse.json(
      { message: "Category created", data: category },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const userId = getUserId(req);

    if (!userId) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 401 }
      );
    }

    const categories = await Category.find({ userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ data: categories });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
import { connectDB } from "@/config/db";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// ✅ slug function
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

// ✅ CREATE
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      name,
      metaTitle,
      metaDescription,
      categoryDescription,
      industryId,
      parentCategoryId,
    } = body;

    // validation
    if (!name || !industryId) {
      return NextResponse.json(
        { message: "Name & Industry required" },
        { status: 400 }
      );
    }

    const slug = slugify(name);

    const category = await Category.create({
      name,
      slug,
      metaTitle,
      metaDescription,
      categoryDescription,
      industryId,
      parentCategoryId: parentCategoryId || null,
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

    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type"); // main | sub
    const parentId = searchParams.get("parentId");

    let filter = {};

    // ✅ Main Categories
    if (type === "main") {
      filter.parentCategoryId = null;
    }

    // ✅ Sub Categories (all)
    if (type === "sub" && !parentId) {
      filter.parentCategoryId = { $ne: null };
    }

    // ✅ Sub Categories by Parent
    if (parentId) {
      filter.parentCategoryId = parentId;
    }

    const categories = await Category.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ data: categories });

  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
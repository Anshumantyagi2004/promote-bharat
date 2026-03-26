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

// ✏️ UPDATE
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const updateData = {
      ...body,
    };

    // update slug if name changes
    if (body.name) {
      updateData.slug = slugify(body.name);
    }

    const updated = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}

// 🗑️ DELETE
export async function DELETE(_, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    await Category.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
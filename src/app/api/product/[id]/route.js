import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Product from "@/models/Product";

// ✅ UPDATE
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updated = await Product.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

// ✅ DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

// Get
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findOne({ slug: id })
      .populate("categoryId", "name")
      .populate("subCategoryId", "name");

    if (!product) {
      return NextResponse.json({
        success: false,
        error: "Product not found",
      });
    }

    return NextResponse.json({
      success: true,
      data: product,
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}
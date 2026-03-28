import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Product from "@/models/Product";

// ✅ CREATE PRODUCT
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const product = await Product.create(body);

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

// ✅ GET ALL PRODUCTS
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const supplierId = searchParams.get("supplierId");

    let filter = {};

    // ✅ Filter by supplier
    if (supplierId) {
      filter.supplierId = supplierId;
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products,
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}
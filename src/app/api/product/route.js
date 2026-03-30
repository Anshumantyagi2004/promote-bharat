import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Product from "@/models/Product";

// ✅ slug function
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

// ✅ CREATE PRODUCT
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    let slug = slugify(body.name);

    let existing = await Product.findOne({ slug });
    let count = 1;

    while (existing) {
      slug = `${slugify(body.name)}-${count}`;
      existing = await Product.findOne({ slug });
      count++;
    }

    body.slug = slug;
    const product = await Product.create(body);
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
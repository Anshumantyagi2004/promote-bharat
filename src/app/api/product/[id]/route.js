import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Product from "@/models/Product";
import ProductMedia from "@/models/ProductMedia";

// ✅ slug function
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

// ✅ UPDATE
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({
        success: false,
        error: "Product not found",
      });
    }

    // 🔥 IF NAME CHANGED → UPDATE SLUG
    if (body.name && body.name !== existingProduct.name) {
      let slug = slugify(body.name);

      let existing = await Product.findOne({
        slug,
        _id: { $ne: id }, // exclude current product
      });

      let count = 1;

      while (existing) {
        slug = `${slugify(body.name)}-${count}`;
        existing = await Product.findOne({
          slug,
          _id: { $ne: id },
        });
        count++;
      }

      body.slug = slug;
    }

    // 🔥 UPDATE
    const updated = await Product.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
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
    const { id } = await params; // slug

    const product = await Product.findOne({ slug: id })
      .populate("categoryId", "name")
      .populate("subCategoryId", "name");

    const media = await ProductMedia.find({
      productId: product._id,
    });

    const primaryImage = media.find((m) => m.isPrimary);
    if (!product || product.length === 0) {
      return NextResponse.json({
        success: false,
        error: "Product not found",
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...product.toObject(),
        media,
        primaryImage,
      },
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}
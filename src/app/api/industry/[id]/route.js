import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Industry from "@/models/Industry";

// simple slug
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")          // replace &
    .replace(/[^a-z0-9]+/g, "-")   // replace special chars
    .replace(/--+/g, "-")          // remove double -
    .replace(/^-+|-+$/g, "");      // trim - from start/end

// ✏️ UPDATE
export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const { name, metaTitle, metaDescription, imageUrl } = await req.json();

  const updated = await Industry.findByIdAndUpdate(
    id,
    {
      name,
      slug: name ? slugify(name) : undefined,
      metaTitle,
      metaDescription,
      imageUrl,
    },
    { new: true }
  );

  return NextResponse.json(updated);
}

// 🗑️ DELETE
export async function DELETE(_, { params }) {
  await connectDB();
  const { id } = await params;
  await Industry.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" });
}
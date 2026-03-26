// app/api/industry/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Industry from "@/models/Industry";
import Category from "@/models/Category";

// ✅ Simple slug generator
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")          // replace &
    .replace(/[^a-z0-9]+/g, "-")   // replace special chars
    .replace(/--+/g, "-")          // remove double -
    .replace(/^-+|-+$/g, "");      // trim - from start/end

export async function POST(req) {
  try {
    await connectDB();

    const { name, metaTitle, metaDescription, imageUrl } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    // ✅ Generate slug
    const slug = slugify(name);

    // ✅ Check duplicate
    const exists = await Industry.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { message: "Industry already exists" },
        { status: 400 }
      );
    }

    // ✅ Create Industry
    const industry = await Industry.create({
      name,
      slug,
      metaTitle: metaTitle || name,
      metaDescription: metaDescription || `Explore ${name}`,
      imageUrl: imageUrl || "",
    });

    return NextResponse.json(industry, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const industries = await Industry.find().lean();
    const categories = await Category.find().lean();

    // 🧠 build nested structure
    const result = industries.map((industry) => {
      const mainCats = categories.filter(
        (c) =>
          c.industryId.toString() === industry._id.toString() &&
          !c.parentCategoryId
      );

      const mainCategory = mainCats.map((main) => {
        const subs = categories.filter(
          (c) =>
            c.parentCategoryId &&
            c.parentCategoryId.toString() === main._id.toString()
        );

        return {
          ...main,
          subCategory: subs, // ✅ full data
        };
      });

      return {
        ...industry,
        mainCategory,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
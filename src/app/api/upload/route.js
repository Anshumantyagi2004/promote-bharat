import { NextResponse } from "next/server";
import { uploadToR2 } from "@/utils/uploadToR2";
import { deleteFromR2 } from "@/utils/deleteFromR2";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const folder = formData.get("folder") || "others";
    const oldKey = formData.get("oldKey");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // convert file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // unique name
    const fileName = `${Date.now()}-${file.name}`;

    // full path
    const keyPath = `${folder}/${fileName}`;

    // ✅ delete old image (update case)
    if (oldKey) {
      await deleteFromR2(oldKey);
    }

    // ✅ upload new
    const { key, url } = await uploadToR2({
      file: buffer,
      folder,
      fileName,
      contentType: file.type,
    });

    return NextResponse.json({
      success: true,
      key,
      url,
    });

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
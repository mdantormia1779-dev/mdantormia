import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

// GET active CV info
export async function GET() {
  try {
    const cv = await prisma.cv.findFirst({
      where: { isActive: true },
      orderBy: { uploadedAt: "desc" },
    });

    if (!cv) {
      return NextResponse.json({
        success: true,
        data: {
          fileName: "Antor_CV.pdf",
          fileUrl: "/antor.pdf",
          fileSize: null,
          uploadedAt: null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: cv,
    });
  } catch (error) {
    console.error("Failed to fetch CV info:", error);
    return NextResponse.json(
      {
        success: false,
        data: {
          fileName: "Antor_CV.pdf",
          fileUrl: "/antor.pdf",
        },
      },
      { status: 500 }
    );
  }
}

// POST upload new CV
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("cvFile") || formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "Please select a valid PDF file ❌" },
        { status: 400 }
      );
    }

    const originalName = file.name || "Antor_CV.pdf";
    if (!originalName.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { success: false, message: "Only PDF files (.pdf) are allowed ❌" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save directly to public/antor.pdf so default link always stays updated
    const publicPath = path.join(process.cwd(), "public");
    const targetFile = path.join(publicPath, "antor.pdf");
    await fs.writeFile(targetFile, buffer);

    // Also save in public/uploads with unique name for history tracking
    const uploadsDir = path.join(publicPath, "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });
    const safeName = `cv_${Date.now()}_${originalName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const uploadFilePath = path.join(uploadsDir, safeName);
    await fs.writeFile(uploadFilePath, buffer);

    // Deactivate previous active CVs
    await prisma.cv.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // Create new active CV record in PostgreSQL
    const newCv = await prisma.cv.create({
      data: {
        fileName: originalName,
        fileUrl: "/antor.pdf",
        fileSize: buffer.length,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "CV uploaded successfully! 🎉",
      data: newCv,
    });
  } catch (error) {
    console.error("Failed to upload CV:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload CV",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

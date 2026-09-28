import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

// GET active CV info (metadata only, without heavy base64)
export async function GET() {
  try {
    const cv = await prisma.cv.findFirst({
      where: { isActive: true },
      orderBy: { uploadedAt: "desc" },
      select: {
        id: true,
        fileName: true,
        fileUrl: true,
        fileSize: true,
        uploadedAt: true,
      },
    });

    if (!cv) {
      return NextResponse.json({
        success: true,
        data: {
          fileName: "Antor_CV.pdf",
          fileUrl: "/api/cv/download",
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
          fileUrl: "/api/cv/download",
        },
      },
      { status: 500 }
    );
  }
}

// POST upload new CV - stores directly into PostgreSQL & supports serverless runtimes
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

    // Convert file to buffer and base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = buffer.toString("base64");

    // Attempt local file write (works in local dev, gracefully ignored on read-only serverless environments like Vercel)
    try {
      const publicPath = path.join(process.cwd(), "public");
      const targetFile = path.join(publicPath, "antor.pdf");
      await fs.writeFile(targetFile, buffer);
    } catch {
      // Ignored: Vercel serverless filesystem is read-only
    }

    // Deactivate previous active CVs
    await prisma.cv.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // Save full PDF into PostgreSQL database
    const newCv = await prisma.cv.create({
      data: {
        fileName: originalName,
        fileUrl: "/api/cv/download",
        fileSize: buffer.length,
        fileBase64: fileBase64,
        isActive: true,
      },
      select: {
        id: true,
        fileName: true,
        fileUrl: true,
        fileSize: true,
        uploadedAt: true,
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
        message: "Failed to upload CV: " + error.message,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

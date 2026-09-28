import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // 1. Increment CV download count in stats
    try {
      await prisma.stat.upsert({
        where: { type: "CV" },
        update: { count: { increment: 1 } },
        create: { type: "CV", count: 1 },
      });
    } catch (e) {
      console.error("Failed to increment CV count:", e);
    }

    // 2. Get active CV metadata
    let fileName = "Antor_CV.pdf";
    try {
      const activeCv = await prisma.cv.findFirst({
        where: { isActive: true },
        orderBy: { uploadedAt: "desc" },
      });
      if (activeCv && activeCv.fileName) {
        fileName = activeCv.fileName;
      }
    } catch (e) {
      console.error("Failed to fetch active CV:", e);
    }

    // 3. Read the current antor.pdf file from public directory
    const filePath = path.join(process.cwd(), "public", "antor.pdf");
    const fileBuffer = await fs.readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(fileName)}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error serving CV download:", error);
    return NextResponse.json(
      { success: false, message: "CV file not found or download failed" },
      { status: 404 }
    );
  }
}

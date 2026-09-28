import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    await prisma.stat.upsert({
      where: { type: "CV" },
      update: { count: { increment: 1 } },
      create: { type: "CV", count: 1 },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Download tracking failed:", error);
    return NextResponse.json(
      { success: false, message: "Download tracking failed", error: error.message },
      { status: 500 }
    );
  }
}

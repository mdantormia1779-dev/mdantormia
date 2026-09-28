import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    await prisma.stat.upsert({
      where: { type: "SITE_VISITS" },
      update: { count: { increment: 1 } },
      create: { type: "SITE_VISITS", count: 1 },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Visit tracking failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Visit count failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

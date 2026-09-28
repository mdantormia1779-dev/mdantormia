import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const totalProjects = await prisma.project.count();
    const stats = await prisma.stat.findMany();

    const siteVisits = stats.find((s) => s.type === "SITE_VISITS")?.count || 0;
    const cvDownloads = stats.find((s) => s.type === "CV")?.count || 0;

    return NextResponse.json({
      success: true,
      totalProjects,
      totalVisits: siteVisits,
      cvDownloads,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch stats",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

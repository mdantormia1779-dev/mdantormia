import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects ❌",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST create project
export async function POST(request) {
  try {
    const body = await request.json();
    const { image, name, category, description, tech, github, live } = body;

    if (
      !image ||
      !name ||
      !description ||
      !tech ||
      (Array.isArray(tech) && tech.length === 0) ||
      !github ||
      !live
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required ❌",
        },
        { status: 400 }
      );
    }

    const techArray = Array.isArray(tech)
      ? tech
      : typeof tech === "string"
      ? tech.split(",").map((t) => t.trim())
      : [];

    const project = await prisma.project.create({
      data: {
        image,
        name,
        category: category || "Full Stack",
        description,
        tech: techArray,
        github,
        live,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project added successfully 🚀",
      data: project,
    });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET single project
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { _id, id: bodyId, ...rest } = body;

    let updateData = { ...rest };

    if (rest.tech) {
      updateData.tech = Array.isArray(rest.tech)
        ? rest.tech
        : typeof rest.tech === "string"
        ? rest.tech.split(",").map((t) => t.trim())
        : [];
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json(
      { success: false, message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json(
      { success: false, message: "Delete failed", error: error.message },
      { status: 500 }
    );
  }
}

import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const activeCv = await prisma.cv.findFirst({
      where: { isActive: true },
      orderBy: { uploadedAt: "desc" },
    });

    const fileName = activeCv?.fileName || "Antor_CV.pdf";

    if (activeCv?.fileBase64) {
      const fileBuffer = Buffer.from(activeCv.fileBase64, "base64");
      return new Response(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${encodeURIComponent(fileName)}"`,
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const filePath = path.join(process.cwd(), "public", "antor.pdf");
    const fileBuffer = await fs.readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${encodeURIComponent(fileName)}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error serving CV preview:", error);
    return new Response("Preview unavailable", { status: 404 });
  }
}

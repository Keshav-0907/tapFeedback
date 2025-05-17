import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateUserToken } from "@/middlewares/authMiddleware";


export async function PUT(req: NextRequest) {

  const auth = validateUserToken(req);
  if (!auth) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { popupId, ...fieldsToUpdate } = body;

  if (!popupId) {
    return NextResponse.json({ msg: "popupId is required" }, { status: 400 });
  }

  try {
    const popup = await prisma.popup.update({
      where: { id: popupId },
      data: fieldsToUpdate,
    });

    return NextResponse.json(
      { msg: "Popup updated successfully", popup },
      { status: 200 }
    );
  } catch (error) {
    console.error("Popup update error:", error);
    return NextResponse.json(
      { msg: "Failed to update popup" },
      { status: 500 }
    );
  }
}

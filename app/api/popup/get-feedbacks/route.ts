import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { NextRequest } from "next/server";
import { validateUserToken } from "@/middlewares/authMiddleware";

export async function POST(req: NextRequest) {
  try {
    const user = validateUserToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { popupId } = await req.json();

    if (!popupId) {
      return NextResponse.json({ error: "Popup ID is required" }, { status: 400 });
    }

    const popup = await prisma.popup.findFirst({
      where: {
        id: popupId,
        project: {
          userId: user.userId,
        },
      },
      include: {
        Feedback: true,
      },
    });

    if (!popup) {
      return NextResponse.json({ error: "Popup not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(
      {
        msg: "Popup feedbacks fetched successfully",
        impressionCount: popup.impressionCount,
        feedbacks: popup.Feedback,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

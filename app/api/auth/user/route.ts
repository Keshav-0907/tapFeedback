import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/db';
import { validateUserToken } from "@/middlewares/authMiddleware";

export async function GET(req: NextRequest) {
  try {
    const authResult = validateUserToken(req);
    console.log("Auth Result:", authResult);

    if (!authResult) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: authResult.userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

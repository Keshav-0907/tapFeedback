import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { popupId } = await req.json();

        if (!popupId) {
            return NextResponse.json({ error: 'Popup ID is required' }, { status: 400 });
        }

        const feedbacks = await prisma.feedback.findMany({
            where: {
                popupId: popupId,
            },
        });

        if (!feedbacks || feedbacks.length === 0) {
            return NextResponse.json({ msg: 'No feedbacks found' }, { status: 404 });
        }

        return NextResponse.json({
            msg: 'Feedbacks fetched successfully',
            feedbacks,
        }, {
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

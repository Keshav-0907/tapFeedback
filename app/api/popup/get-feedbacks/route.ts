import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextResponse) {
    const { popupId } = await req.json();

    try {
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
            feedbacks: feedbacks,
        }, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({ error: 'Err' }, { status: 500 });
    }
}
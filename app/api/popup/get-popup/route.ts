import { NextRequest } from "next/server";
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { popupId } = body;

        if (!popupId || typeof popupId !== 'string') {
            return new Response(
                JSON.stringify({ message: "Missing or invalid 'popupId'" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const popup = await prisma.popup.findUnique({
            where: { id: popupId },
        });

        if (!popup) {
            return new Response(
                JSON.stringify({ message: "Popup not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ msg: "Popup fetched successfully", popup }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Error fetching popup:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

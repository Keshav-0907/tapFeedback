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

        const updatedPopup = await prisma.popup?.update({
            where: { id: popupId },
            data: {
                impressionCount: {
                    increment: 1
                }
            }
        });

        console.log("Updated Popup:", updatedPopup);


        return new Response(
            JSON.stringify({ msg: "Popup fetched and impressionCount incremented", popup: updatedPopup }),
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

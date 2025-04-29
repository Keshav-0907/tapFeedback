
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from '@/lib/db'


const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    if (!decoded || !decoded.id) {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    const project = await prisma.project.findUnique({
        where: {
            id: id,
            userId: decoded.id,
        },
        select: {
            id: true,
            title: true,
            url: true,
            createdAt: true,
        }
    })

    return new Response(JSON.stringify({
        userId: user?.id,
        project: project,
    }), {
        status: 200,
    })
}
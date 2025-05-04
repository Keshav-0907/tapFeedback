
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from '@/lib/db'

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    if (!decoded || !decoded.id) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
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

    const projects = await prisma.project.findMany({
        where: {
            userId: decoded.id,
        },
        select: {
            id: true,
            title: true,
            url: true,
            createdAt: true,
            screenshot: true,
        }
    })

    return Response.json({
        userId: user?.id,
        projects: projects,
    }, {
        status: 200,
    })
}
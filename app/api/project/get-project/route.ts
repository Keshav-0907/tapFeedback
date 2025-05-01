
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
    const { projectId } = await req.json();

    if (!projectId) {
        return NextResponse.json({ message: "Missing id or userId" }, { status: 400 });
    }

    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ message: "Missing token" }, { status: 401 });
        }
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const userId = decoded.id;
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: userId
            },
        });

        if (!project) {
            return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }

        const popup = await prisma.popup.findMany({
            where: {
                projectId: projectId
            },

        })


        return Response.json({
            msg: "Project fetched successfully",
            project: project,
            popup: popup,
        }, {
            status: 200
        })

    } catch (error) {
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }

}
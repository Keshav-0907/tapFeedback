import { NextResponse } from "next/server";
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
    const { title, url, userId } = await request.json();

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        return Response.json({
            message: "User not found"
        }, {
            status: 404
        })
    }

    const project = await prisma.project.create({
        data: {
            title,
            url,
            userId: user.id
        }
    });

    if (!project) {
        return Response.json({
            message: "Project creation failed"
        }, {
            status: 500
        })
    }

    return Response.json({
        message: "Project created successfully",
        project
    }, {
        status: 201
    })
}
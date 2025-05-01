import { NextResponse } from "next/server";
import { prisma } from '@/lib/db';

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
        });
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
        });
    }

    const popup = await prisma.popup.create({
        data: {
            projectId: project.id,
            title: "We value your feedback!",
            titleSize: "20",
            titleColor: "#000000",
            backgroundColor: "#ffffff",
            textColor: "#000000",
            borderColor: "#cccccc",
            borderWidth: "1",
            borderRadius: "8",
            feedbackType: "text",
            showTextInput: true,
            ctaText: "Submit",
            ctaTextColor: "#ffffff",
            ctaBackgroundColor: "#000000",
            delay: 5,
            entryAnimation: "fade-in",
            exitAnimation: "fade-out"
        }
    });

    return Response.json({
        message: "Project created successfully",
        project,
        popup
    }, {
        status: 201
    });
}

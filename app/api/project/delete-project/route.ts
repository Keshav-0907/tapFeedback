import { prisma } from '@/lib/db'

export async function DELETE(request: Request) {
    const { projectId, userId } = await request.json();

    console.log("Deleting project", projectId, userId)

    if (!projectId || !userId) {
        return Response.json({
            error: "Project ID and User ID are required"
        }, {
            status: 400,
        })
    }

    try {
        const deletedProject = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: userId,
            }
        })
        console.log("Deleted project", deletedProject)

        if (!deletedProject) {
            return Response.json({
                error: "Project not found or you do not have permission to delete this project"
            }, {
                status: 404,
            })
        }

        await prisma.popup.deleteMany({
            where: {
                projectId: projectId,
            },
        });

        await prisma.project.delete({
            where: {
                id: projectId,
            },
        });

        return Response.json({
            message: "Project deleted successfully",
            project: deletedProject,
        }, {
            status: 200,
        })
    } catch (error) {
        return Response.json({
            error: "Error deleting project",
            details: error,
        }, {
            status: 500,
        })
    }
}
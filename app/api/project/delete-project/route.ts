import { prisma } from '@/lib/db'

export async function DELETE(request: Request) {
  try {
    const { projectId, userId } = await request.json();

    console.log("Received request to delete project:", { projectId, userId });

    if (!projectId || !userId) {
      return Response.json({
        error: "Project ID and User ID are required"
      }, {
        status: 400,
      });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: userId,
      }
    });

    if (!project) {
      return Response.json({
        error: "Project not found or you do not have permission to delete this project"
      }, {
        status: 404,
      });
    }

    // Fetch all popups linked to the project
    const popups = await prisma.popup.findMany({
      where: { projectId }
    });

    const popupIds = popups.map(p => p.id);

    // Delete all feedbacks linked to those popups
    if (popupIds.length > 0) {
      await prisma.feedback.deleteMany({
        where: {
          popupId: { in: popupIds }
        }
      });
    }

    // Delete popups
    await prisma.popup.deleteMany({
      where: { projectId }
    });

    // Delete the project
    await prisma.project.delete({
      where: { id: projectId }
    });

    return Response.json({
      message: "Project deleted successfully",
      project,
    }, {
      status: 200,
    });

  } catch (error) {
    console.error("Error deleting project:", error);
    return Response.json({
      error: "Internal Server Error",
      details: error,
    }, {
      status: 500,
    });
  }
}

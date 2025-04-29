'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const ProjectCard = ({ project }: { project: any }) => {
    const router = useRouter()

    const handleNavigation = () => {
        router.push(`/dashboard/project/${project.id}`)
    }

    return (
        <div
            onClick={handleNavigation}
            className="border-2 border-gray-300 rounded-lg p-4 m-2 bg-accent cursor-pointer"
        >
            {project.title}
        </div>
    )
}

export default ProjectCard

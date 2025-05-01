'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentDate } from '@/lib/helperFunctions'
import { Badge } from "@/components/ui/badge"
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'


const ProjectCard = ({ project, key }: { project: any, key: any }) => {
    const router = useRouter()

    const handleNavigation = () => {
        router.push(`/dashboard/project/${project.id}`)
    }

    return (
        <div
            key={key}
            className="rounded-lg py-2 px-4 bg-accent hover:bg-accent/60 border-[1px] hover:border-accent flex flex-col gap-10"
        >
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        {project.title}
                    </div>
                    <Badge variant="outline" className='bg-primary/40'>Active</Badge>
                </div>

                <div className="text-xs text-gray-300">
                    {getCurrentDate({ date: project.createdAt })}
                </div>
            </div>

            <Button variant={'outline'} onClick={handleNavigation} className='cursor-pointer'>
                Open
            </Button>
        </div>
    )
}

export default ProjectCard

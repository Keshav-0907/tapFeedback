'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentDate } from '@/lib/helperFunctions'
import { Badge } from "@/components/ui/badge"
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import Image from 'next/image'


const ProjectCard = ({ project }: { project: any }) => {
    const router = useRouter()
    const [cardHovered, setCardHovered] = useState(false)

    const handleNavigation = () => {
        router.push(`/dashboard/project/${project.id}`)
    }

    console.log(project)

    return (
        <div
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
            className={`rounded-lg py-2 px-2 border-[1px] ${cardHovered ? 'bg-accent/80' : 'bg-white'} flex flex-col gap-2 shadow-sm cursor-pointer transition-all duration-200 ease-in-out`}
        >
            <div>
                <div className='flex items-center justify-between'>
                    <div className='font-medium'>
                        {project.title}
                    </div>
                    <Badge variant="outline" className='bg-green-700 text-white'>Active</Badge>
                </div>

                <div className="text-xs text-accent-foreground">
                    {project.url.length > 30 ? `${project.url.slice(0, 30)}...` : project.url}
                    {/* {getCurrentDate({ date: project.createdAt })} */}
                </div>
            </div>


            <div className='flex flex-col gap-2'>
                <div className="relative w-full h-32 rounded-md overflow-hidden">
                    <Image
                        src={project.screenshot}
                        alt="Project Screenshot"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-full object-cover object-top"
                    />
                    {/* <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${cardHovered ? 'from-accent/60 ' : 'from-accent via-accent/40'}  to-transparent pointer-events-none rounded-b-md`} /> */}
                </div>

                <Button variant={'outline'} onClick={handleNavigation} className='cursor-pointer'>
                    Open
                </Button>
            </div>

        </div>
    )
}

export default ProjectCard

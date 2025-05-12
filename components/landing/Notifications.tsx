'use client'

import React from 'react'
import { AnimatedList } from '../magicui/animated-list'
import { cn } from '@/lib/utils'

interface Item {
    name: string
    description: string
    icon: string
    color: string
    time: string
}

let notifications: Item[] = [
    {
        name: 'New Feedback Received',
        description: 'Project: GharSetu Widget',
        time: '2m ago',
        icon: '💬',
        color: '#1E86FF',
    },
    {
        name: 'User Submitted Rating',
        description: 'Project: AI Interview Form',
        time: '5m ago',
        icon: '⭐',
        color: '#FFC107',
    },
    {
        name: 'Survey Completed',
        description: 'Project: NoteForge AI Widget',
        time: '10m ago',
        icon: '📋',
        color: '#4CAF50',
    },
    {
        name: 'New Text Response',
        description: 'Project: Real Estate Lead Form',
        time: '12m ago',
        icon: '📝',
        color: '#FF7043',
    },
    {
        name: 'Widget Submitted',
        description: 'Project: Cold DM Outreach Widget',
        time: '15m ago',
        icon: '📨',
        color: '#2196F3',
    },
    {
        name: 'NPS Score Submitted',
        description: 'Project: DevPrep Feedback Form',
        time: '18m ago',
        icon: '📈',
        color: '#9C27B0',
    },
    {
        name: 'Widget Embedded',
        description: 'Project: PopUp Survey for SaaS',
        time: '22m ago',
        icon: '🔗',
        color: '#00BCD4',
    },
]


notifications = Array.from({ length: 10 }, () => notifications).flat()

const Notification = ({ name, description, icon, color, time }: Item) => {
    return (
        <figure
            className={cn(
                'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4',
                'transition-all duration-200 ease-in-out hover:scale-[103%]',
                'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
                'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex size-10 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: color }}
                >
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
                        <span className="text-sm sm:text-lg">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">{description}</p>
                </div>
            </div>
        </figure>
    )
}

const Notifications = () => {
    return (
        <div className="relative flex h-[500px] w-full flex-col overflow-hidden p-4">
            <AnimatedList>
                {notifications.map((item, idx) => (
                    <Notification {...item} key={idx} />
                ))}
            </AnimatedList>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        </div>
    )
}

export default Notifications

import React from 'react'
import HeroVideoDialog from '../magicui/hero-video-dialog'


const Demo = () => {
    return (
        <div className='py-20 flex items-center justify-center flex-col gap-5 '>
            <div className='max-w-3xl flex flex-col gap-2'>
                <div className='text-center text-3xl font-bold'>
                    Watch It Work
                </div>

                <div className='text-center text-muted-foreground text-sm'>
                    See how easily you can create, customize, and embed widgets with our platform. This short demo video walks you through the full experience — from setup to insights.
                </div>
            </div>

            <div className='max-w-4xl'>
                <HeroVideoDialog
                    className="block dark:hidden"
                    animationStyle="top-in-bottom-out"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                    thumbnailAlt="Hero Video"
                />
                <HeroVideoDialog
                    className="hidden dark:block"
                    animationStyle="top-in-bottom-out"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Hero Video"
                />
            </div>
        </div>
    )
}

export default Demo
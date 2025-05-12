import React from 'react'
import { DotPattern } from '../magicui/dot-pattern'
import Headline from './Headline'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface HeroProps {
    setShowAuthModal: (show: boolean) => void;

}

const Hero = ({ setShowAuthModal }: HeroProps) => {
    const { user } = useAuth()
    const router = useRouter()

    const handleNavigation = () => {
        if (user) {
            router.push('/dashboard/project')
        } else {
            router.push('/auth')
        }
    }
    return (
        <div>
            <DotPattern
                className={cn(
                    "absolute inset-0 -z-10 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
                )}
            />
            <div className="z-50 w-fit flex flex-col gap-10 h-[80vh] items-center justify-center">
                <Headline text="Introducing SitePop" />


                <div className="flex flex-col gap-5 items-center max-w-2xl">
                    <div className="text-center text-7xl font-bold flex flex-col gap-5">
                        <div>Custom Widgets.</div>
                        <div>
                            Instant <RoughNotation type="highlight" color='#FFF076' show={true}>
                                Feedbacks
                            </RoughNotation>.
                        </div>
                    </div>
                    <div className="text-center text-muted-foreground text-sm">
                        Build fully customizable widgets in minutes, embed them on your website with a single line of code, and start collecting real-time responses and actionable insights — all from one powerful dashboard.
                    </div>


                    <div className="flex flex-col gap-5 md:flex-row">
                        {
                            user ? (
                                <Button className="cursor-pointer" onClick={handleNavigation}>
                                    Go to Dashboard
                                </Button>
                            ) : (
                                <Button className="cursor-pointer" onClick={() => setShowAuthModal(true)}>
                                    Get Started Free
                                </Button>
                            )
                        }
                        <Button variant={"outline"} className="cursor-pointer">
                            See Demo 🎥
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
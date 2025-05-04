'use client';

import { use, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/common/AuthModal";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Headline from "@/components/landing/Headline";
import Demo from "@/components/landing/Demo";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center items-center">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="z-10 my-20 w-fit flex flex-col gap-10">
        <Headline text="Introducing SitePop" />


        <div className="flex flex-col gap-5 items-center max-w-2xl">
          <div className="text-center text-6xl font-bold">
            Custom Widgets. Instant Insights.
          </div>
          <div className="text-center text-muted-foreground text-sm">
            Build fully customizable widgets in minutes, embed them on your website with a single line of code, and start collecting real-time responses and actionable insights — all from one powerful dashboard.
          </div>


          <div className="flex flex-col gap-5 md:flex-row">
            <Button className="cursor-pointer">
              Get Started Free
            </Button>
            <Button variant={"outline"} className="cursor-pointer">
              See Demo 🎥
            </Button>
          </div>

         
        </div>
      </div>
      <Demo/>
    </div>
  );
}

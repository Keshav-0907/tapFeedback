'use client';

import { use, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/common/AuthModal";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout } = useAuth()
  const router = useRouter()


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://localhost:3000/embed/cma5ei9xl0009uls2rmpi3bn0";
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {
        user ? (
          <div>
            <div>Hi {user.name} </div>
            <Button onClick={() => router.push('/dashboard')}> Dashboard </Button>
            <Button variant="outline" onClick={logout} className="cursor-pointer text-white">
              Log Out
            </Button>
          </div>
        ) : (
          <Button className="cursor-pointer text-white" onClick={() => setShowAuthModal(true)}>
            Login
          </Button>
        )
      }

      {
        showAuthModal && (
          <AuthModal setShowAuthModal={setShowAuthModal} />
        )
      }
    </div>
  );
}

'use client';

import { use, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/common/AuthModal";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth()


  useEffect(() => {
    const script = document.createElement("script");
    script.src = `http://localhost:3000/embed/cma2z794r0004ulaw4earho4z`;
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
            <Button> Dashboard </Button>
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

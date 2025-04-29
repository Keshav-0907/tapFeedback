'use client';

import { use, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/common/AuthModal";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth()

  console.log('user', user)

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

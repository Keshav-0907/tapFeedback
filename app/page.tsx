'use client';

import { useEffect, useState } from "react";
import AuthModal from "@/components/common/AuthModal";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Demo from "@/components/landing/Demo";
import Footer from "@/components/landing/Footer";
import LandingHeader from "@/components/landing/LandingHeader";
import Hero from "@/components/landing/Hero";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout } = useAuth()
  const router = useRouter()


useEffect(() => {
  const script = document.createElement("script");
  script.src = "http://localhost:3000/embed/cma5s78nf0005ul4azmvik155";
  script.async = true;
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);
  

  return (
    <div className="flex flex-col justify-center items-center">
      <LandingHeader setShowAuthModal={setShowAuthModal} />
      <Hero />
      <Demo />
      <Footer />


      {
        showAuthModal && (
          <AuthModal setShowAuthModal={setShowAuthModal} />
        )
      }
    </div>
  );
}

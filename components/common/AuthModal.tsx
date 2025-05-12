"use client";

import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "sonner"
import useAuth from "@/hooks/useAuth";


interface AuthModalProps {
    setShowAuthModal: (value: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ setShowAuthModal }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { login } = useAuth()

    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowAuthModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowAuthModal]);

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
    }

    const handleSubmit = async () => {

        if (password.length < 6) {
            toast.info('Password must be at least 6 characters')
            return;
        }

        if (mode === "signin") {
            if (!email || !password) {
                toast.info('Please fill all the fields')
                return;
            }

            const res = await login(email, password);

            if (res?.status === 200) {
                toast.success(res.data.msg, {
                    description: "Login successful",
                })
                setTimeout(() => {
                    window.location.href = "/dashboard/project";
                }, 1000)
                localStorage.setItem("authToken", res.data.token);
                setShowAuthModal(false);
                resetForm();
            }
            else {
                toast.error('Invalid Email or Password')
                setError("Invalid Email or Password");
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        } else {
            if (!name || !email || !password) {
                toast.info('Please fill all the fields')
                return;
            }


            const res = await axios.post("/api/auth/create-user", {
                name,
                email,
                password,
            })

            if (res.data.status === 201) {
                toast.success(res.data.msg, {
                    description: "Account created successfully",
                })
                setMode("signin");
                resetForm();
            }

            if (res.data.status === 409) {
                toast.error(res.data.msg, {
                    description: "User already exists",
                })
                setError(res.data.msg);
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/50">
            <Card ref={modalRef} className="w-full max-w-md p-6">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                        {mode === "signin" ? "Sign In" : "Create Account"}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {
                        mode === "signup" && (
                            <div className="space-y-2">
                                <Label htmlFor="password">Name</Label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                </div>
                            </div>
                        )
                    }
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    {
                        error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )
                    }

                    <Button onClick={handleSubmit} className="w-full cursor-pointer">
                        {mode === "signin" ? "Login" : "Create Account"}
                    </Button>

                </CardContent>



                <CardFooter className="flex flex-col gap-1 items-start text-xs">
                    <div className="flex gap-1">
                        <p className="text-muted-foreground">
                            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}
                        </p>

                        <div
                            className="cursor-pointer hover:text-primary"
                            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                        >
                            {mode === "signin" ? "Sign Up" : "Sign In"}
                        </div>
                    </div>
                    {/* <div className="flex gap-1">
                        <p className="text-muted-foreground">
                            Just want to try it out?
                        </p>

                        <div
                            className="cursor-pointer hover:text-primary"
                            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                        >
                            Demo Login
                        </div>
                    </div> */}
                </CardFooter>
            </Card>
        </div>
    );
};

export default AuthModal;

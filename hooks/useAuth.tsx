'use client'
import { use, useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/types";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (token) {
                    const res = await axios.get("/api/auth/user", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(res.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post("/api/auth/login-user", {
                email,
                password
            })

            localStorage.setItem("authToken", res.data.token);
            window.location.href = "/";
            return res.data;
        } catch (error) {
            console.error("Login error:", error);
            return null;
        }
    }

    const logout = async () => {
        try {
            localStorage.removeItem("authToken");
            setUser(null);
            window.location.href = "/";
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return { user, loading, login, logout };
}

export default useAuth;
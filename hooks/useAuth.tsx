'use client'
import { use, useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
    const [user, setUser] = useState(null);
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

            return res.data;
        } catch (error) {
            console.error("Login error:", error);
            return null;
        }
    }
    
    return { user, loading,login };
}

export default useAuth;
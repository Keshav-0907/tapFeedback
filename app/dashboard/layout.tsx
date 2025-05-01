'use client'
import Sidebar from "@/components/common/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, loading } = useAuth()
    const router = useRouter()

    if(loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading
            </div>
        )
    }

    if(!loading && !user) {
        router.push('/')
        return null
    }
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1">
                <DashboardHeader />
                {children}
            </div>
        </div>
    );
}
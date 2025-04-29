import Sidebar from "@/components/common/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
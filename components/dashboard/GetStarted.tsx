import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface GetStartedProps {
    embedCode: string;
}



const GetStarted = ({ embedCode }: GetStartedProps) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode);
        toast.success("Code copied to clipboard!");
    };


    return (
        <div className="p-6 space-y-8 text-sm text-white">
            <h1 className="text-2xl font-semibold">Get Started</h1>

            <div className="space-y-4">
                <p className="text-muted-foreground">
                    Follow these simple steps to integrate your project:
                </p>

                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                    <li>Copy the following <span className="font-mono bg-muted px-1 py-0.5 rounded">useEffect</span> snippet.</li>
                    <li>Paste it inside your React component/page.</li>
                    <li>The script will load automatically on page mount.</li>
                </ol>

                <div className="relative bg-[#0d0d0d] border border-border rounded-lg p-4 overflow-auto text-xs font-mono">
                    <div className="whitespace-pre text-white">
                        {embedCode}
                    </div>

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopy}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-white cursor-pointer"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>

                <p className="text-muted-foreground">
                    That’s it! You’re ready to go 🚀
                </p>
            </div>
        </div>
    );
};

export default GetStarted;

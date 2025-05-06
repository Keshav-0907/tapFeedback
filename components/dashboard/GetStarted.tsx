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
        toast.success("Embed code copied!");
    };

    return (
        <div className="px-8 py-4 space-y-8 text-sm">
            <div className="space-y-4">
                <div className="flex flex-col">
                    <div className='flex items-center gap-4'>
                        <div className="text-2xl font-semibold">Get Started</div>
                    </div>
                    <p className="text-muted-foreground text-sm">Follow these simple steps to integrate your project</p>
                </div>

                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                    <li>
                        Copy the <code className="font-mono px-1 py-0.5 bg-gray-200 rounded">useEffect</code> snippet below.
                    </li>
                    <li>Paste it inside your React component or page file.</li>
                    <li>The script will auto-load when the component mounts.</li>
                </ol>

                <div className="relative bg-[#0d0d0d] border border-border rounded-lg p-4 overflow-auto text-xs font-mono text-white">
                    <pre className="whitespace-pre-wrap break-words">{embedCode}</pre>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleCopy}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-white"
                        aria-label="Copy embed code"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>

                <p className="text-muted-foreground">
                    That’s it — your widget is live and ready to collect responses 🚀
                </p>
            </div>
        </div>
    );
};

export default GetStarted;

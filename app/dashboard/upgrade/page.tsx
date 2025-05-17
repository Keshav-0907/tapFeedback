import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/components/magicui/shine-border";

const Upgrade = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <Card className="relative overflow-hidden max-w-[350px] w-full">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

        <CardContent className="font-semibold flex justify-center">
          Coming Soon
        </CardContent>

      </Card>
    </div>
  )
}

export default Upgrade

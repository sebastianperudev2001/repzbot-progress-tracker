import { Brain, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MotivationalMessageProps {
  message: string;
  author?: string;
}

const MotivationalMessage = ({ message, author = "RepzBot AI" }: MotivationalMessageProps) => {
  return (
    <Card className="bg-gradient-power border-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-black/30 rounded-lg">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-semibold text-primary-foreground/80 uppercase tracking-wide">
                {author}
              </span>
            </div>
            <blockquote className="text-primary-foreground font-semibold text-lg leading-relaxed">
              "{message}"
            </blockquote>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MotivationalMessage;
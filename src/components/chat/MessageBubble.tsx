import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Brain, Dumbbell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export function MessageBubble({
  message,
  isStreaming = false,
}: MessageBubbleProps) {
  const isBot = message.sender === "bot";

  return (
    <div
      className={cn(
        "flex w-full gap-3 p-4",
        isBot ? "bg-muted/30 border-l-4 border-primary" : "bg-background"
      )}
    >
      {isBot ? (
        <div className="flex-shrink-0 h-9 w-9 rounded-md bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md">
          <Dumbbell className="h-5 w-5 text-primary-foreground" />
        </div>
      ) : (
        <Avatar className="h-9 w-9 border-2 border-border">
          <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
            TÚ
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-semibold text-sm",
              isBot ? "text-primary uppercase tracking-wide" : "text-foreground"
            )}
          >
            {isBot ? "RepzBot" : "Tú"}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div
          className={cn(
            "text-foreground leading-relaxed",
            isBot && "font-medium",
            isStreaming &&
              "after:content-['▋'] after:animate-pulse after:ml-1 after:text-primary"
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}

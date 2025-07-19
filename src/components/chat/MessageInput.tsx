import { useState, FormEvent } from "react";
import { Send, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StreamingStatus } from "@/types/chat";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  streamingStatus: StreamingStatus;
}

export function MessageInput({
  onSendMessage,
  disabled = false,
  streamingStatus,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const isDisabled = disabled || streamingStatus === "streaming";
  const isStreaming = streamingStatus === "streaming";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (message.trim() === "" || isDisabled) return;

    onSendMessage(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
          className={`pr-12 resize-none min-h-[80px] bg-background focus-visible:ring-primary ${
            isStreaming ? "opacity-50" : ""
          }`}
          disabled={isDisabled}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isDisabled || message.trim() === ""}
          className="absolute bottom-2 right-2 h-8 w-8"
          variant="default"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        {isStreaming ? (
          <>
            <Dumbbell className="h-3 w-3 animate-pulse text-primary" />
            <span>RepzBot está respondiendo...</span>
          </>
        ) : (
          <span>Presiona Enter para enviar, Shift+Enter para nueva línea</span>
        )}
      </div>
    </form>
  );
}

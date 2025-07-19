import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { useMockStreamingResponse } from "@/hooks/useMockStreamingResponse";

// Mensaje de bienvenida inicial
const WELCOME_MESSAGE: Message = {
  id: "welcome",
  sender: "bot",
  content:
    "¿Qué excusa tienes hoy? Dime qué estás haciendo para mejorar. STAY HARD.",
  timestamp: new Date(),
};

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { streamingText, status, startStreaming, reset } =
    useMockStreamingResponse();

  // Scroll al último mensaje cuando cambia la lista de mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  // Función para hacer scroll al final del chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Manejar el envío de un nuevo mensaje
  const handleSendMessage = (content: string) => {
    // Crear mensaje del usuario
    const userMessage: Message = {
      id: uuidv4(),
      sender: "user",
      content,
      timestamp: new Date(),
    };

    // Agregar mensaje del usuario
    setMessages((prev) => [...prev, userMessage]);

    // Iniciar la simulación de respuesta del bot
    setTimeout(() => {
      startStreaming();
    }, 500);
  };

  // Efecto para crear el mensaje del bot cuando la respuesta streaming está completa
  useEffect(() => {
    if (status === "complete" && streamingText) {
      const botMessage: Message = {
        id: uuidv4(),
        sender: "bot",
        content: streamingText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      reset();
    }
  }, [status, streamingText, reset]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          {/* Mensajes existentes */}
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Mensaje en streaming (si existe) */}
          {status === "streaming" && (
            <MessageBubble
              message={{
                id: "streaming",
                sender: "bot",
                content: streamingText,
                timestamp: new Date(),
              }}
              isStreaming={true}
            />
          )}

          {/* Elemento para hacer scroll */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input de mensaje */}
      <div className="border-t border-border p-4">
        <MessageInput
          onSendMessage={handleSendMessage}
          streamingStatus={status}
        />
      </div>
    </div>
  );
}

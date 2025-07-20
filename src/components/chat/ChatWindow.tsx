import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { api } from "@/lib/api";
import { ConsultationType } from "@/types/consultation";
import { ConsultationTypeSelector } from "./ConsultationTypeSelector";

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
  const [isLoading, setIsLoading] = useState(false);
  const [consultationType, setConsultationType] = useState<ConsultationType>(
    ConsultationType.PROGRESS
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll al último mensaje cuando cambia la lista de mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Función para hacer scroll al final del chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Manejar el envío de un nuevo mensaje
  const handleSendMessage = async (content: string) => {
    try {
      // Crear mensaje del usuario
      const userMessage: Message = {
        id: uuidv4(),
        sender: "user",
        content,
        timestamp: new Date(),
      };

      // Agregar mensaje del usuario
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Enviar mensaje al backend con el tipo de consulta
      const response = await api.sendMessage(consultationType);

      // Crear mensaje del bot con la respuesta
      const botMessage: Message = {
        id: uuidv4(),
        sender: "bot",
        content: response.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Manejar el error mostrando el mensaje como respuesta del bot
      const errorMessage: Message = {
        id: uuidv4(),
        sender: "bot",
        content: error instanceof Error ? error.message : "Error del servidor",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col p-2">
          {/* Selector de tipo de consulta */}
          <div className="mb-2">
            <ConsultationTypeSelector
              selectedType={consultationType}
              onTypeSelect={setConsultationType}
            />
          </div>

          {/* Mensajes existentes */}
          <div className="space-y-2">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>

          {/* Indicador de carga */}
          {isLoading && (
            <MessageBubble
              message={{
                id: "loading",
                sender: "bot",
                content: "Pensando...",
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
      <div className="border-t border-border p-2">
        <MessageInput
          onSendMessage={handleSendMessage}
          streamingStatus={isLoading ? "streaming" : "idle"}
        />
      </div>
    </div>
  );
}

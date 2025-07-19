import { useState, useEffect } from "react";
import { StreamingStatus } from "@/types/chat";

// Respuestas mockeadas estilo David Goggins
const MOCK_RESPONSES = [
  "Otra vez hiciste lo mismo que la semana pasada. ¿Vas a quedarte débil?",
  "Nadie te va a regalar resultados. ¡Carga más peso!",
  "Deja de buscar excusas. Empieza a mejorar. Stay hard.",
  "El dolor que sientes hoy será la fuerza que sentirás mañana. ¡SIGUE ADELANTE!",
  "Tu mente se rinde antes que tu cuerpo. Supera esa barrera mental.",
  "No entrenas hasta que estés cansado. Entrenas hasta que estés MEJOR.",
  "Las excusas son para los débiles. ¿Eres débil? No lo creo.",
  "Cada repetición cuenta. Cada segundo de dolor te fortalece. ¡NO TE RINDAS!",
];

export function useMockStreamingResponse() {
  const [streamingText, setStreamingText] = useState("");
  const [status, setStatus] = useState<StreamingStatus>("idle");
  const [fullResponse, setFullResponse] = useState("");

  // Inicia la simulación de streaming
  const startStreaming = () => {
    if (status === "streaming") return;

    // Selecciona una respuesta aleatoria
    const randomResponse =
      MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
    setFullResponse(randomResponse);
    setStreamingText("");
    setStatus("streaming");
  };

  // Efecto para simular el streaming de texto
  useEffect(() => {
    if (status !== "streaming") return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullResponse.length) {
        setStreamingText((prev) => prev + fullResponse[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setStatus("complete");
      }
    }, 30); // Velocidad de tipeo (ajustable)

    return () => clearInterval(interval);
  }, [status, fullResponse]);

  // Reinicia el estado para una nueva respuesta
  const reset = () => {
    setStreamingText("");
    setStatus("idle");
    setFullResponse("");
  };

  return {
    streamingText,
    status,
    startStreaming,
    reset,
  };
}

export interface Message {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: Date;
}

export type StreamingStatus = "idle" | "streaming" | "complete";

// Respuestas mockeadas estilo David Goggins
export const MOCK_RESPONSES = [
  "Otra vez hiciste lo mismo que la semana pasada. ¿Vas a quedarte débil?",
  "Nadie te va a regalar resultados. ¡Carga más peso!",
  "Deja de buscar excusas. Empieza a mejorar. Stay hard.",
  "El dolor que sientes hoy será la fuerza que sentirás mañana. ¡SIGUE ADELANTE!",
  "Tu mente se rendirá 100 veces antes que tu cuerpo. No la escuches.",
  "Los días que no quieres entrenar son los días más importantes. LEVÁNTATE.",
  "Si no estás incómodo, no estás mejorando. Busca la incomodidad.",
  "Cuando piensas que ya terminaste, apenas estás al 40% de tu capacidad.",
  "No hay descanso hasta que superes tus límites. Y luego, crea nuevos límites.",
  "La motivación es temporal. La disciplina es permanente. CONSTRUYE DISCIPLINA.",
];

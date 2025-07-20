export enum ConsultationType {
  PROGRESS = "progreso",
  STATISTICS = "estadisticas",
  RECOMMENDATIONS = "recomendaciones",
}

export const consultationTypeLabels: Record<ConsultationType, string> = {
  [ConsultationType.PROGRESS]: "Progreso",
  [ConsultationType.STATISTICS]: "Estadísticas",
  [ConsultationType.RECOMMENDATIONS]: "Recomendaciones",
};

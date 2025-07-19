export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface WorkoutSession {
  id: string;
  date: string;
  duration: number; // in minutes
  exercises: Exercise[];
  totalVolume: number; // calculated: sum of (sets * reps * weight) for all exercises
}

export const mockWorkoutSessions: WorkoutSession[] = [
  {
    id: '1',
    date: '2024-01-19T18:30:00',
    duration: 75,
    exercises: [
      { id: '1a', name: 'Bench Press', sets: 4, reps: 8, weight: 85 },
      { id: '1b', name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: 35 },
      { id: '1c', name: 'Chest Flyes', sets: 3, reps: 12, weight: 20 },
    ],
    totalVolume: 4580 // (4*8*85) + (3*10*35) + (3*12*20)
  },
  {
    id: '2',
    date: '2024-01-17T19:15:00',
    duration: 60,
    exercises: [
      { id: '2a', name: 'Deadlift', sets: 3, reps: 5, weight: 140 },
      { id: '2b', name: 'Bent Over Rows', sets: 4, reps: 8, weight: 70 },
      { id: '2c', name: 'Pull-ups', sets: 3, reps: 10, weight: 0 },
    ],
    totalVolume: 4340 // (3*5*140) + (4*8*70) + (3*10*0)
  },
  {
    id: '3',
    date: '2024-01-15T18:45:00',
    duration: 80,
    exercises: [
      { id: '3a', name: 'Squat', sets: 4, reps: 10, weight: 100 },
      { id: '3b', name: 'Romanian Deadlift', sets: 3, reps: 8, weight: 80 },
      { id: '3c', name: 'Leg Press', sets: 3, reps: 15, weight: 120 },
    ],
    totalVolume: 11320 // (4*10*100) + (3*8*80) + (3*15*120)
  },
  {
    id: '4',
    date: '2024-01-13T19:00:00',
    duration: 70,
    exercises: [
      { id: '4a', name: 'Overhead Press', sets: 4, reps: 8, weight: 50 },
      { id: '4b', name: 'Lateral Raises', sets: 3, reps: 12, weight: 15 },
      { id: '4c', name: 'Rear Delt Flyes', sets: 3, reps: 15, weight: 12 },
    ],
    totalVolume: 2680 // (4*8*50) + (3*12*15) + (3*15*12)
  },
  {
    id: '5',
    date: '2024-01-11T18:20:00',
    duration: 65,
    exercises: [
      { id: '5a', name: 'Bench Press', sets: 4, reps: 8, weight: 82.5 },
      { id: '5b', name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: 32.5 },
      { id: '5c', name: 'Dips', sets: 3, reps: 12, weight: 0 },
    ],
    totalVolume: 3615 // (4*8*82.5) + (3*10*32.5) + (3*12*0)
  }
];

export const motivationalMessages = [
  "El dolor que sientes hoy será la fuerza que sientas mañana. No hay shortcuts para ningún lugar que valga la pena ir.",
  "Cada rep que haces es una promesa que te haces a ti mismo. Mantén esa promesa.",
  "Tu único límite eres tú mismo. Destroza ese límite hoy.",
  "La disciplina es elegir entre lo que quieres ahora y lo que quieres más.",
  "No se trata de ser perfecto, se trata de ser mejor que ayer.",
  "El hierro no miente. Te dice exactamente dónde estás parado.",
  "Cuando quieras rendirte, recuerda por qué empezaste."
];

export const getLastWorkoutSession = () => {
  return mockWorkoutSessions[0];
};

export const getPreviousWorkoutForExercise = (exerciseName: string) => {
  // Find the most recent session before the last one that contains this exercise
  for (let i = 1; i < mockWorkoutSessions.length; i++) {
    const session = mockWorkoutSessions[i];
    const exercise = session.exercises.find(ex => ex.name === exerciseName);
    if (exercise) {
      return exercise;
    }
  }
  return null;
};

export const getRandomMotivationalMessage = () => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};
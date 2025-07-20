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
    id: "1",
    date: "2024-01-19T18:30:00",
    duration: 75,
    exercises: [
      { id: "1a", name: "Bench Press", sets: 4, reps: 8, weight: 85 },
      {
        id: "1b",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weight: 35,
      },
      { id: "1c", name: "Chest Flyes", sets: 3, reps: 12, weight: 20 },
    ],
    totalVolume: 4580, // (4*8*85) + (3*10*35) + (3*12*20)
  },
  {
    id: "2",
    date: "2024-01-17T19:15:00",
    duration: 60,
    exercises: [
      { id: "2a", name: "Deadlift", sets: 3, reps: 5, weight: 140 },
      { id: "2b", name: "Bent Over Rows", sets: 4, reps: 8, weight: 70 },
      { id: "2c", name: "Pull-ups", sets: 3, reps: 10, weight: 0 },
    ],
    totalVolume: 4340, // (3*5*140) + (4*8*70) + (3*10*0)
  },
  {
    id: "3",
    date: "2024-01-15T18:45:00",
    duration: 80,
    exercises: [
      { id: "3a", name: "Squat", sets: 4, reps: 10, weight: 100 },
      { id: "3b", name: "Romanian Deadlift", sets: 3, reps: 8, weight: 80 },
      { id: "3c", name: "Leg Press", sets: 3, reps: 15, weight: 120 },
    ],
    totalVolume: 11320, // (4*10*100) + (3*8*80) + (3*15*120)
  },
  {
    id: "4",
    date: "2024-01-13T19:00:00",
    duration: 70,
    exercises: [
      { id: "4a", name: "Overhead Press", sets: 4, reps: 8, weight: 50 },
      { id: "4b", name: "Lateral Raises", sets: 3, reps: 12, weight: 15 },
      { id: "4c", name: "Rear Delt Flyes", sets: 3, reps: 15, weight: 12 },
    ],
    totalVolume: 2680, // (4*8*50) + (3*12*15) + (3*15*12)
  },
  {
    id: "5",
    date: "2024-01-11T18:20:00",
    duration: 65,
    exercises: [
      { id: "5a", name: "Bench Press", sets: 4, reps: 8, weight: 82.5 },
      {
        id: "5b",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weight: 32.5,
      },
      { id: "5c", name: "Dips", sets: 3, reps: 12, weight: 0 },
    ],
    totalVolume: 3615, // (4*8*82.5) + (3*10*32.5) + (3*12*0)
  },
  {
    id: "6",
    date: "2024-01-08T18:30:00",
    duration: 75,
    exercises: [
      { id: "6a", name: "Deadlift", sets: 3, reps: 5, weight: 135 },
      { id: "6b", name: "Bent Over Rows", sets: 4, reps: 8, weight: 65 },
      { id: "6c", name: "Pull-ups", sets: 3, reps: 8, weight: 0 },
    ],
    totalVolume: 4025, // (3*5*135) + (4*8*65) + (3*8*0)
  },
  {
    id: "7",
    date: "2024-01-05T19:00:00",
    duration: 70,
    exercises: [
      { id: "7a", name: "Squat", sets: 4, reps: 10, weight: 95 },
      { id: "7b", name: "Romanian Deadlift", sets: 3, reps: 8, weight: 75 },
      { id: "7c", name: "Leg Press", sets: 3, reps: 15, weight: 110 },
    ],
    totalVolume: 10440, // (4*10*95) + (3*8*75) + (3*15*110)
  },
  {
    id: "8",
    date: "2024-01-03T18:45:00",
    duration: 65,
    exercises: [
      { id: "8a", name: "Bench Press", sets: 4, reps: 8, weight: 80 },
      {
        id: "8b",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weight: 30,
      },
      { id: "8c", name: "Chest Flyes", sets: 3, reps: 12, weight: 17.5 },
    ],
    totalVolume: 3990, // (4*8*80) + (3*10*30) + (3*12*17.5)
  },
  {
    id: "9",
    date: "2023-12-30T19:15:00",
    duration: 70,
    exercises: [
      { id: "9a", name: "Overhead Press", sets: 4, reps: 8, weight: 47.5 },
      { id: "9b", name: "Lateral Raises", sets: 3, reps: 12, weight: 12.5 },
      { id: "9c", name: "Rear Delt Flyes", sets: 3, reps: 15, weight: 10 },
    ],
    totalVolume: 2430, // (4*8*47.5) + (3*12*12.5) + (3*15*10)
  },
  {
    id: "10",
    date: "2023-12-27T18:30:00",
    duration: 75,
    exercises: [
      { id: "10a", name: "Deadlift", sets: 3, reps: 5, weight: 130 },
      { id: "10b", name: "Bent Over Rows", sets: 4, reps: 8, weight: 60 },
      { id: "10c", name: "Pull-ups", sets: 3, reps: 8, weight: 0 },
    ],
    totalVolume: 3840, // (3*5*130) + (4*8*60) + (3*8*0)
  },
  {
    id: "11",
    date: "2023-12-23T19:00:00",
    duration: 80,
    exercises: [
      { id: "11a", name: "Squat", sets: 4, reps: 10, weight: 90 },
      { id: "11b", name: "Romanian Deadlift", sets: 3, reps: 8, weight: 70 },
      { id: "11c", name: "Leg Press", sets: 3, reps: 15, weight: 100 },
    ],
    totalVolume: 9660, // (4*10*90) + (3*8*70) + (3*15*100)
  },
  {
    id: "12",
    date: "2023-12-20T18:45:00",
    duration: 65,
    exercises: [
      { id: "12a", name: "Bench Press", sets: 4, reps: 8, weight: 77.5 },
      {
        id: "12b",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weight: 27.5,
      },
      { id: "12c", name: "Dips", sets: 3, reps: 10, weight: 0 },
    ],
    totalVolume: 3305, // (4*8*77.5) + (3*10*27.5) + (3*10*0)
  },
  {
    id: "13",
    date: "2023-12-17T19:15:00",
    duration: 70,
    exercises: [
      { id: "13a", name: "Overhead Press", sets: 4, reps: 8, weight: 45 },
      { id: "13b", name: "Lateral Raises", sets: 3, reps: 12, weight: 10 },
      { id: "13c", name: "Rear Delt Flyes", sets: 3, reps: 15, weight: 7.5 },
    ],
    totalVolume: 2182.5, // (4*8*45) + (3*12*10) + (3*15*7.5)
  },
  {
    id: "14",
    date: "2023-12-14T18:30:00",
    duration: 75,
    exercises: [
      { id: "14a", name: "Deadlift", sets: 3, reps: 5, weight: 125 },
      { id: "14b", name: "Bent Over Rows", sets: 4, reps: 8, weight: 55 },
      { id: "14c", name: "Pull-ups", sets: 3, reps: 7, weight: 0 },
    ],
    totalVolume: 3650, // (3*5*125) + (4*8*55) + (3*7*0)
  },
  {
    id: "15",
    date: "2023-12-11T19:00:00",
    duration: 70,
    exercises: [
      { id: "15a", name: "Squat", sets: 4, reps: 10, weight: 85 },
      { id: "15b", name: "Romanian Deadlift", sets: 3, reps: 8, weight: 65 },
      { id: "15c", name: "Leg Press", sets: 3, reps: 15, weight: 90 },
    ],
    totalVolume: 8880, // (4*10*85) + (3*8*65) + (3*15*90)
  },
  {
    id: "16",
    date: "2023-12-08T18:45:00",
    duration: 65,
    exercises: [
      { id: "16a", name: "Bench Press", sets: 4, reps: 8, weight: 75 },
      {
        id: "16b",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weight: 25,
      },
      { id: "16c", name: "Chest Flyes", sets: 3, reps: 12, weight: 15 },
    ],
    totalVolume: 3540, // (4*8*75) + (3*10*25) + (3*12*15)
  },
  {
    id: "17",
    date: "2023-12-05T19:15:00",
    duration: 70,
    exercises: [
      { id: "17a", name: "Overhead Press", sets: 4, reps: 8, weight: 42.5 },
      { id: "17b", name: "Lateral Raises", sets: 3, reps: 12, weight: 7.5 },
      { id: "17c", name: "Rear Delt Flyes", sets: 3, reps: 15, weight: 5 },
    ],
    totalVolume: 1935, // (4*8*42.5) + (3*12*7.5) + (3*15*5)
  },
  {
    id: "18",
    date: "2023-12-02T18:30:00",
    duration: 75,
    exercises: [
      { id: "18a", name: "Deadlift", sets: 3, reps: 5, weight: 120 },
      { id: "18b", name: "Bent Over Rows", sets: 4, reps: 8, weight: 50 },
      { id: "18c", name: "Pull-ups", sets: 3, reps: 6, weight: 0 },
    ],
    totalVolume: 3400, // (3*5*120) + (4*8*50) + (3*6*0)
  },
  {
    id: "19",
    date: "2023-11-29T19:00:00",
    duration: 70,
    exercises: [
      { id: "19a", name: "Squat", sets: 4, reps: 10, weight: 80 },
      { id: "19b", name: "Romanian Deadlift", sets: 3, reps: 8, weight: 60 },
      { id: "19c", name: "Leg Press", sets: 3, reps: 15, weight: 80 },
    ],
    totalVolume: 8040, // (4*10*80) + (3*8*60) + (3*15*80)
  },
  {
    id: "20",
    date: "2023-11-26T18:45:00",
    duration: 65,
    exercises: [
      { id: "20a", name: "Bench Press", sets: 4, reps: 8, weight: 72.5 },
      {
        id: "20b",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weight: 22.5,
      },
      { id: "20c", name: "Dips", sets: 3, reps: 8, weight: 0 },
    ],
    totalVolume: 3005, // (4*8*72.5) + (3*10*22.5) + (3*8*0)
  },
  {
    id: "21",
    date: "2023-11-23T19:15:00",
    duration: 70,
    exercises: [
      { id: "21a", name: "Overhead Press", sets: 4, reps: 8, weight: 40 },
      { id: "21b", name: "Lateral Raises", sets: 3, reps: 12, weight: 5 },
      { id: "21c", name: "Rear Delt Flyes", sets: 3, reps: 15, weight: 5 },
    ],
    totalVolume: 1855, // (4*8*40) + (3*12*5) + (3*15*5)
  },
  {
    id: "22",
    date: "2023-11-20T18:30:00",
    duration: 75,
    exercises: [
      { id: "22a", name: "Deadlift", sets: 3, reps: 5, weight: 115 },
      { id: "22b", name: "Bent Over Rows", sets: 4, reps: 8, weight: 45 },
      { id: "22c", name: "Pull-ups", sets: 3, reps: 5, weight: 0 },
    ],
    totalVolume: 3165, // (3*5*115) + (4*8*45) + (3*5*0)
  },
  {
    id: "23",
    date: "2023-11-17T19:00:00",
    duration: 70,
    exercises: [
      { id: "23a", name: "Squat", sets: 4, reps: 10, weight: 75 },
      { id: "23b", name: "Romanian Deadlift", sets: 3, reps: 8, weight: 55 },
      { id: "23c", name: "Leg Press", sets: 3, reps: 15, weight: 70 },
    ],
    totalVolume: 7320, // (4*10*75) + (3*8*55) + (3*15*70)
  },
  {
    id: "24",
    date: "2023-11-14T18:45:00",
    duration: 65,
    exercises: [
      { id: "24a", name: "Bench Press", sets: 4, reps: 8, weight: 70 },
      {
        id: "24b",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weight: 20,
      },
      { id: "24c", name: "Chest Flyes", sets: 3, reps: 12, weight: 12.5 },
    ],
    totalVolume: 3190, // (4*8*70) + (3*10*20) + (3*12*12.5)
  },
  {
    id: "25",
    date: "2023-11-11T18:30:00",
    duration: 70,
    exercises: [
      { id: "25a", name: "Overhead Press", sets: 4, reps: 8, weight: 37.5 },
      { id: "25b", name: "Lateral Raises", sets: 3, reps: 12, weight: 5 },
      { id: "25c", name: "Rear Delt Flyes", sets: 3, reps: 12, weight: 5 },
    ],
    totalVolume: 1680, // (4*8*37.5) + (3*12*5) + (3*12*5)
  },
  {
    id: "26",
    date: "2023-11-08T19:00:00",
    duration: 75,
    exercises: [
      { id: "26a", name: "Deadlift", sets: 3, reps: 5, weight: 110 },
      { id: "26b", name: "Bent Over Rows", sets: 4, reps: 8, weight: 40 },
      { id: "26c", name: "Pull-ups", sets: 3, reps: 5, weight: 0 },
    ],
    totalVolume: 2980, // (3*5*110) + (4*8*40) + (3*5*0)
  },
  {
    id: "27",
    date: "2023-11-05T18:45:00",
    duration: 70,
    exercises: [
      { id: "27a", name: "Squat", sets: 4, reps: 10, weight: 70 },
      { id: "27b", name: "Romanian Deadlift", sets: 3, reps: 8, weight: 50 },
      { id: "27c", name: "Leg Press", sets: 3, reps: 15, weight: 60 },
    ],
    totalVolume: 6500, // (4*10*70) + (3*8*50) + (3*15*60)
  },
  {
    id: "28",
    date: "2023-11-02T19:15:00",
    duration: 65,
    exercises: [
      { id: "28a", name: "Bench Press", sets: 4, reps: 8, weight: 67.5 },
      {
        id: "28b",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weight: 17.5,
      },
      { id: "28c", name: "Dips", sets: 3, reps: 6, weight: 0 },
    ],
    totalVolume: 2685, // (4*8*67.5) + (3*10*17.5) + (3*6*0)
  },
  {
    id: "29",
    date: "2023-10-30T18:30:00",
    duration: 70,
    exercises: [
      { id: "29a", name: "Overhead Press", sets: 4, reps: 8, weight: 35 },
      { id: "29b", name: "Lateral Raises", sets: 3, reps: 10, weight: 5 },
      { id: "29c", name: "Rear Delt Flyes", sets: 3, reps: 12, weight: 5 },
    ],
    totalVolume: 1600, // (4*8*35) + (3*10*5) + (3*12*5)
  },
  {
    id: "30",
    date: "2023-10-27T19:00:00",
    duration: 75,
    exercises: [
      { id: "30a", name: "Deadlift", sets: 3, reps: 5, weight: 105 },
      { id: "30b", name: "Bent Over Rows", sets: 4, reps: 8, weight: 35 },
      { id: "30c", name: "Pull-ups", sets: 3, reps: 4, weight: 0 },
    ],
    totalVolume: 2795, // (3*5*105) + (4*8*35) + (3*4*0)
  },
  {
    id: "31",
    date: "2023-10-24T18:45:00",
    duration: 70,
    exercises: [
      { id: "31a", name: "Squat", sets: 4, reps: 10, weight: 65 },
      { id: "31b", name: "Romanian Deadlift", sets: 3, reps: 8, weight: 45 },
      { id: "31c", name: "Leg Press", sets: 3, reps: 15, weight: 50 },
    ],
    totalVolume: 5880, // (4*10*65) + (3*8*45) + (3*15*50)
  },
  {
    id: "32",
    date: "2023-10-21T19:15:00",
    duration: 65,
    exercises: [
      { id: "32a", name: "Bench Press", sets: 4, reps: 8, weight: 65 },
      {
        id: "32b",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weight: 15,
      },
      { id: "32c", name: "Chest Flyes", sets: 3, reps: 12, weight: 10 },
    ],
    totalVolume: 2720, // (4*8*65) + (3*10*15) + (3*12*10)
  },
  {
    id: "33",
    date: "2023-10-18T18:30:00",
    duration: 70,
    exercises: [
      { id: "33a", name: "Overhead Press", sets: 4, reps: 8, weight: 32.5 },
      { id: "33b", name: "Lateral Raises", sets: 3, reps: 10, weight: 5 },
      { id: "33c", name: "Rear Delt Flyes", sets: 3, reps: 10, weight: 5 },
    ],
    totalVolume: 1490, // (4*8*32.5) + (3*10*5) + (3*10*5)
  },
  {
    id: "34",
    date: "2023-10-15T19:00:00",
    duration: 75,
    exercises: [
      { id: "34a", name: "Deadlift", sets: 3, reps: 5, weight: 100 },
      { id: "34b", name: "Bent Over Rows", sets: 4, reps: 8, weight: 30 },
      { id: "34c", name: "Pull-ups", sets: 3, reps: 3, weight: 0 },
    ],
    totalVolume: 2610, // (3*5*100) + (4*8*30) + (3*3*0)
  },
  {
    id: "35",
    date: "2023-10-12T18:45:00",
    duration: 70,
    exercises: [
      { id: "35a", name: "Squat", sets: 4, reps: 10, weight: 60 },
      { id: "35b", name: "Romanian Deadlift", sets: 3, reps: 8, weight: 40 },
      { id: "35c", name: "Leg Press", sets: 3, reps: 15, weight: 40 },
    ],
    totalVolume: 5160, // (4*10*60) + (3*8*40) + (3*15*40)
  },
  {
    id: "36",
    date: "2023-10-09T19:15:00",
    duration: 65,
    exercises: [
      { id: "36a", name: "Bench Press", sets: 4, reps: 8, weight: 60 },
      {
        id: "36b",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weight: 12.5,
      },
      { id: "36c", name: "Dips", sets: 3, reps: 5, weight: 0 },
    ],
    totalVolume: 2295, // (4*8*60) + (3*10*12.5) + (3*5*0)
  },
  {
    id: "37",
    date: "2023-10-06T18:30:00",
    duration: 70,
    exercises: [
      { id: "37a", name: "Overhead Press", sets: 4, reps: 8, weight: 30 },
      { id: "37b", name: "Lateral Raises", sets: 3, reps: 10, weight: 2.5 },
      { id: "37c", name: "Rear Delt Flyes", sets: 3, reps: 10, weight: 2.5 },
    ],
    totalVolume: 1110, // (4*8*30) + (3*10*2.5) + (3*10*2.5)
  },
  {
    id: "38",
    date: "2023-10-03T19:00:00",
    duration: 75,
    exercises: [
      { id: "38a", name: "Deadlift", sets: 3, reps: 5, weight: 95 },
      { id: "38b", name: "Bent Over Rows", sets: 4, reps: 8, weight: 25 },
      { id: "38c", name: "Pull-ups", sets: 2, reps: 3, weight: 0 },
    ],
    totalVolume: 2425, // (3*5*95) + (4*8*25) + (2*3*0)
  },
  {
    id: "39",
    date: "2023-09-30T18:45:00",
    duration: 70,
    exercises: [
      { id: "39a", name: "Squat", sets: 4, reps: 10, weight: 55 },
      { id: "39b", name: "Romanian Deadlift", sets: 3, reps: 8, weight: 35 },
      { id: "39c", name: "Leg Press", sets: 3, reps: 15, weight: 30 },
    ],
    totalVolume: 4440, // (4*10*55) + (3*8*35) + (3*15*30)
  },
  {
    id: "40",
    date: "2023-09-27T19:15:00",
    duration: 65,
    exercises: [
      { id: "40a", name: "Bench Press", sets: 4, reps: 8, weight: 55 },
      {
        id: "40b",
        name: "Incline Dumbbell Press",
        sets: 3,
        reps: 10,
        weight: 10,
      },
      { id: "40c", name: "Chest Flyes", sets: 3, reps: 12, weight: 7.5 },
    ],
    totalVolume: 2150, // (4*8*55) + (3*10*10) + (3*12*7.5)
  },
];

export const motivationalMessages = [
  "El dolor que sientes hoy será la fuerza que sientas mañana. No hay shortcuts para ningún lugar que valga la pena ir.",
  "Cada rep que haces es una promesa que te haces a ti mismo. Mantén esa promesa.",
  "Tu único límite eres tú mismo. Destroza ese límite hoy.",
  "La disciplina es elegir entre lo que quieres ahora y lo que quieres más.",
  "No se trata de ser perfecto, se trata de ser mejor que ayer.",
  "El hierro no miente. Te dice exactamente dónde estás parado.",
  "Cuando quieras rendirte, recuerda por qué empezaste.",
];

export const getLastWorkoutSession = () => {
  return mockWorkoutSessions[0];
};

export const getPreviousWorkoutForExercise = (exerciseName: string) => {
  // Find the most recent session before the last one that contains this exercise
  for (let i = 1; i < mockWorkoutSessions.length; i++) {
    const session = mockWorkoutSessions[i];
    const exercise = session.exercises.find((ex) => ex.name === exerciseName);
    if (exercise) {
      return exercise;
    }
  }
  return null;
};

export const getRandomMotivationalMessage = () => {
  return motivationalMessages[
    Math.floor(Math.random() * motivationalMessages.length)
  ];
};

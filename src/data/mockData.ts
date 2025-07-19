export const mockWorkouts = [
  {
    id: '1',
    date: '2024-01-19T18:30:00',
    exercise: 'Bench Press',
    sets: 4,
    reps: 8,
    weight: 85
  },
  {
    id: '2',
    date: '2024-01-17T19:15:00',
    exercise: 'Deadlift',
    sets: 3,
    reps: 5,
    weight: 140
  },
  {
    id: '3',
    date: '2024-01-15T18:45:00',
    exercise: 'Squat',
    sets: 4,
    reps: 10,
    weight: 100
  },
  {
    id: '4',
    date: '2024-01-13T19:00:00',
    exercise: 'Bench Press',
    sets: 4,
    reps: 8,
    weight: 82.5
  },
  {
    id: '5',
    date: '2024-01-11T18:20:00',
    exercise: 'Pull-ups',
    sets: 3,
    reps: 12,
    weight: 0
  },
  {
    id: '6',
    date: '2024-01-09T19:30:00',
    exercise: 'Deadlift',
    sets: 3,
    reps: 5,
    weight: 135
  },
  {
    id: '7',
    date: '2024-01-07T18:00:00',
    exercise: 'Squat',
    sets: 4,
    reps: 10,
    weight: 95
  },
  {
    id: '8',
    date: '2024-01-05T19:10:00',
    exercise: 'Overhead Press',
    sets: 3,
    reps: 8,
    weight: 50
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

export const getLastWorkout = () => {
  return mockWorkouts[0];
};

export const getPreviousWorkout = (exercise: string) => {
  return mockWorkouts.find((workout, index) => 
    workout.exercise === exercise && index > 0
  );
};

export const getRandomMotivationalMessage = () => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};
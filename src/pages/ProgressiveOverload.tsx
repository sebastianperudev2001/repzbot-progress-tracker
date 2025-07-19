import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockWorkoutSessions } from "@/data/mockData";

const ProgressiveOverload = () => {
  const [selectedExercise, setSelectedExercise] = useState("");

  // Extract unique exercise names from all workout sessions
  const exerciseNames = [
    ...new Set(
      mockWorkoutSessions.flatMap((session) =>
        session.exercises.map((exercise) => exercise.name)
      )
    ),
  ];

  // Mock recommendation based on selected exercise
  const getRecommendation = () => {
    if (!selectedExercise) return null;

    return {
      weight: "75 kg",
      sets: 4,
      reps: "8-10",
      message:
        "Basado en tu progreso, te recomendamos aumentar el peso en 2.5kg y mantener las series y repeticiones para asegurar una sobrecarga progresiva óptima.",
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al dashboard
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-foreground font-display">
            Progressive Overload
          </h1>

          <div className="max-w-md">
            <label className="text-sm font-medium mb-2 block">
              Selecciona un ejercicio
            </label>
            <Select
              onValueChange={setSelectedExercise}
              value={selectedExercise}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar ejercicio" />
              </SelectTrigger>
              <SelectContent>
                {exerciseNames.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedExercise && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">
                Historial de {selectedExercise}
              </h2>

              <div className="grid gap-4">
                {mockWorkoutSessions
                  .filter((session) =>
                    session.exercises.some((ex) => ex.name === selectedExercise)
                  )
                  .map((session) => {
                    const exercise = session.exercises.find(
                      (ex) => ex.name === selectedExercise
                    );
                    return (
                      <Card key={session.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            {session.date}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Peso
                              </p>
                              <p className="font-medium">{exercise?.weight}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Series
                              </p>
                              <p className="font-medium">{exercise?.sets}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Repeticiones
                              </p>
                              <p className="font-medium">{exercise?.reps}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>

              {recommendation && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Recomendación IA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Peso recomendado
                        </p>
                        <p className="font-medium">{recommendation.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Series</p>
                        <p className="font-medium">{recommendation.sets}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Repeticiones
                        </p>
                        <p className="font-medium">{recommendation.reps}</p>
                      </div>
                    </div>
                    <p className="text-sm">{recommendation.message}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProgressiveOverload;

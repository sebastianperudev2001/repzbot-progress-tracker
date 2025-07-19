import { ArrowRight, Dumbbell, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressSummary from "@/components/ProgressSummary";
import WorkoutCard from "@/components/WorkoutCard";
import MotivationalMessage from "@/components/MotivationalMessage";
import { mockWorkouts, getLastWorkout, getPreviousWorkout, getRandomMotivationalMessage } from "@/data/mockData";

const Index = () => {
  const lastWorkout = getLastWorkout();
  const previousWorkout = getPreviousWorkout(lastWorkout.exercise);
  
  const comparison = {
    weightDiff: previousWorkout ? lastWorkout.weight - previousWorkout.weight : 0,
    repsDiff: previousWorkout ? lastWorkout.reps - previousWorkout.reps : 0,
    trend: (() => {
      if (!previousWorkout) return 'same' as const;
      const weightImproved = lastWorkout.weight > previousWorkout.weight;
      const repsImproved = lastWorkout.reps > previousWorkout.reps;
      if (weightImproved || repsImproved) return 'up' as const;
      if (lastWorkout.weight < previousWorkout.weight || lastWorkout.reps < previousWorkout.reps) return 'down' as const;
      return 'same' as const;
    })()
  };

  const motivationalMessage = getRandomMotivationalMessage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-power rounded-lg">
                <Dumbbell className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground font-display">RepzBot</h1>
                <p className="text-xs text-muted-foreground">Tu progreso</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Meta diaria</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Progress Summary */}
          <ProgressSummary 
            lastExercise={lastWorkout}
            comparison={comparison}
          />

          {/* Motivational Message */}
          <MotivationalMessage message={motivationalMessage} />

          {/* Next Routine Button */}
          <div className="flex justify-center">
            <Button variant="next" size="lg" className="gap-3">
              <Target className="h-5 w-5" />
              Ver sugerencia de siguiente rutina
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Workout History */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground font-display">
                Historial de entrenamientos
              </h2>
              <p className="text-sm text-muted-foreground">
                {mockWorkouts.length} sesiones registradas
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {mockWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              "Stay hard, stay disciplined" - Sigue construyendo tu mejor versión
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

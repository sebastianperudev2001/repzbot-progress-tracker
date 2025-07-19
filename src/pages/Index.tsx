import { ArrowRight, Dumbbell, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressSummary from "@/components/ProgressSummary";
import WorkoutSessionCard from "@/components/WorkoutSessionCard";
import MotivationalMessage from "@/components/MotivationalMessage";
import NavBar from "@/components/NavBar";
import {
  mockWorkoutSessions,
  getLastWorkoutSession,
  getPreviousWorkoutForExercise,
  getRandomMotivationalMessage,
} from "@/data/mockData";

const Index = () => {
  const lastSession = getLastWorkoutSession();
  // Get the first exercise from the last session to show in progress summary
  const lastExercise = lastSession.exercises[0];
  const previousExercise = getPreviousWorkoutForExercise(lastExercise.name);

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
                <h1 className="text-xl font-bold text-foreground font-display">
                  RepzBot
                </h1>
                <p className="text-xs text-muted-foreground">Tu progreso</p>
              </div>
            </div>

            <NavBar />

            <div className="hidden sm:flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Meta diaria
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Progress Summary */}
          <ProgressSummary
            lastExercise={lastExercise}
            previousExercise={previousExercise}
            sessionDate={lastSession.date}
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
                {mockWorkoutSessions.length} sesiones registradas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockWorkoutSessions.map((session) => (
                <WorkoutSessionCard key={session.id} session={session} />
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
              "Stay hard, stay disciplined" - Sigue construyendo tu mejor
              versión
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

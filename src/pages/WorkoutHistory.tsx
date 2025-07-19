import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { mockWorkoutSessions } from "@/data/mockData";
import WorkoutSessionCard from "@/components/WorkoutSessionCard";

const WorkoutHistory = () => {
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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground font-display">
              Historial de entrenamientos
            </h1>
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
      </main>
    </div>
  );
};

export default WorkoutHistory;

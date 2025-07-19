import { Calendar, Clock, Activity, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { WorkoutSession } from "@/data/mockData";
import ExerciseRow from "./ExerciseRow";

interface WorkoutSessionCardProps {
  session: WorkoutSession;
}

const WorkoutSessionCard = ({ session }: WorkoutSessionCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('es-ES', { month: 'short' }),
      time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      weekday: date.toLocaleDateString('es-ES', { weekday: 'long' })
    };
  };

  const { day, month, time, weekday } = formatDate(session.date);

  return (
    <Card className="bg-card border-border/50 hover:border-border transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary leading-none">
                {day}
              </div>
              <div className="text-xs text-muted-foreground uppercase">
                {month}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg capitalize">
                {weekday}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {time}
              </div>
            </div>
          </div>
          
          {/* Session Stats */}
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              {session.duration} min
            </div>
            <div className="flex items-center gap-2 text-sm text-accent font-semibold">
              <TrendingUp className="h-4 w-4" />
              {session.totalVolume.toLocaleString()} kg
            </div>
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              {session.exercises.length} ejercicios
            </span>
          </div>
          {session.exercises.map((exercise) => (
            <ExerciseRow key={exercise.id} exercise={exercise} />
          ))}
        </div>

        {/* Footer Summary */}
        <div className="pt-3 border-t border-border/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Volumen total
            </span>
            <span className="font-bold text-accent">
              {session.totalVolume.toLocaleString()} kg
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WorkoutSessionCard;
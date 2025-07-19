import { Calendar, Weight, RotateCcw, Hash } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WorkoutCardProps {
  workout: {
    id: string;
    date: string;
    exercise: string;
    sets: number;
    reps: number;
    weight: number;
  };
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('es-ES', { month: 'short' }),
      time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const { day, month, time } = formatDate(workout.date);

  return (
    <Card className="bg-card border-border/50 hover:border-border transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary leading-none">
                {day}
              </div>
              <div className="text-xs text-muted-foreground uppercase">
                {month}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg">
                {workout.exercise}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {time}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Weight className="h-4 w-4 text-accent" />
              <span className="font-semibold text-accent">{workout.weight}kg</span>
            </div>
            <div className="flex items-center gap-1">
              <RotateCcw className="h-4 w-4 text-progress" />
              <span className="font-semibold text-progress">{workout.reps} reps</span>
            </div>
            <div className="flex items-center gap-1">
              <Hash className="h-4 w-4 text-warning" />
              <span className="font-semibold text-warning">{workout.sets} sets</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WorkoutCard;
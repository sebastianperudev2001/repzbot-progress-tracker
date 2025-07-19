import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProgressSummaryProps {
  lastExercise: {
    exercise: string;
    weight: number;
    reps: number;
    sets: number;
    date: string;
  };
  comparison: {
    weightDiff: number;
    repsDiff: number;
    trend: 'up' | 'down' | 'same';
  };
}

const ProgressSummary = ({ lastExercise, comparison }: ProgressSummaryProps) => {
  const getTrendIcon = () => {
    switch (comparison.trend) {
      case 'up':
        return <TrendingUp className="h-6 w-6 text-success" />;
      case 'down':
        return <TrendingDown className="h-6 w-6 text-destructive" />;
      default:
        return <Minus className="h-6 w-6 text-warning" />;
    }
  };

  const getTrendMessage = () => {
    if (comparison.trend === 'up') {
      if (comparison.weightDiff > 0) {
        return `+${comparison.weightDiff}kg respecto a la última vez`;
      }
      if (comparison.repsDiff > 0) {
        return `+${comparison.repsDiff} reps respecto a la última vez`;
      }
    }
    if (comparison.trend === 'down') {
      return `${comparison.weightDiff}kg respecto a la última vez`;
    }
    return "Mismo peso y reps que la última vez";
  };

  const getTrendEmoji = () => {
    switch (comparison.trend) {
      case 'up':
        return '🔥';
      case 'down':
        return '💪';
      default:
        return '⚡';
    }
  };

  return (
    <Card className="bg-gradient-strength border-border/50 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Último entrenamiento</h3>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className="text-2xl">{getTrendEmoji()}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-2xl font-bold text-primary font-display">
              {lastExercise.exercise}
            </h4>
            <p className="text-muted-foreground text-sm">
              {new Date(lastExercise.date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {lastExercise.weight}kg
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Peso
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {lastExercise.reps}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Reps
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {lastExercise.sets}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Sets
              </div>
            </div>
          </div>
          
          <div className="pt-2 border-t border-border/30">
            <p className="text-sm font-medium text-foreground">
              {getTrendMessage()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProgressSummary;
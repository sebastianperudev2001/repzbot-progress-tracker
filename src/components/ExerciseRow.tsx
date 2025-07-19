import { Weight, RotateCcw, Hash } from "lucide-react";
import { Exercise } from "@/data/mockData";

interface ExerciseRowProps {
  exercise: Exercise;
}

const ExerciseRow = ({ exercise }: ExerciseRowProps) => {
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-md">
      <div className="font-medium text-foreground">
        {exercise.name}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Weight className="h-3 w-3 text-accent" />
          <span className="text-sm font-semibold text-accent">{exercise.weight}kg</span>
        </div>
        <div className="flex items-center gap-1">
          <RotateCcw className="h-3 w-3 text-progress" />
          <span className="text-sm font-semibold text-progress">{exercise.reps}</span>
        </div>
        <div className="flex items-center gap-1">
          <Hash className="h-3 w-3 text-warning" />
          <span className="text-sm font-semibold text-warning">{exercise.sets}</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseRow;
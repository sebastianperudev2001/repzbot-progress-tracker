import { ArrowLeft, Search, TrendingUp, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockWorkoutSessions } from "@/data/mockData";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

// Define the chart data type
interface ChartDataPoint {
  date: string;
  weight: number;
  volume: number;
  sets: number;
  reps: number;
  fullDate: string;
}

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

  // Get sessions containing the selected exercise, sorted by date (oldest to newest for charts)
  const relevantSessions = useMemo(() => {
    if (!selectedExercise) return [];

    return mockWorkoutSessions
      .filter((session) =>
        session.exercises.some((ex) => ex.name === selectedExercise)
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedExercise]);

  // Prepare data for charts
  const chartData = useMemo(() => {
    return relevantSessions
      .map((session) => {
        const exercise = session.exercises.find(
          (ex) => ex.name === selectedExercise
        );

        if (!exercise) return null;

        const volume = exercise.sets * exercise.reps * exercise.weight;
        return {
          date: format(new Date(session.date), "dd/MM"),
          weight: exercise.weight,
          volume: volume,
          sets: exercise.sets,
          reps: exercise.reps,
          fullDate: format(new Date(session.date), "d MMM yyyy"),
        };
      })
      .filter(Boolean);
  }, [relevantSessions, selectedExercise]);

  // Calculate if there's progress between the first and last session
  const progressInsight = useMemo(() => {
    if (chartData.length < 2) return null;

    const firstSession = chartData[0];
    const lastSession = chartData[chartData.length - 1];

    const weightDiff = lastSession.weight - firstSession.weight;
    const volumeDiff = lastSession.volume - firstSession.volume;

    const weightProgress = weightDiff > 0;
    const volumeProgress = volumeDiff > 0;

    if (weightProgress && volumeProgress) {
      return {
        status: "positive",
        weight: `+${weightDiff.toFixed(1)} kg`,
        volume: `+${volumeDiff.toFixed(0)} kg`,
        message:
          "¡Excelente progreso! Has aumentado tanto el peso como el volumen total. Considera incrementar el peso en 2.5kg para tu próxima sesión.",
        recommendation: {
          weight: `${(lastSession.weight + 2.5).toFixed(1)} kg`,
          sets: lastSession.sets,
          reps: lastSession.reps,
        },
      };
    } else if (weightProgress) {
      return {
        status: "neutral",
        weight: `+${weightDiff.toFixed(1)} kg`,
        volume: `${volumeDiff.toFixed(0)} kg`,
        message:
          "Has aumentado el peso pero disminuido el volumen total. Intenta mantener el peso actual y enfócate en completar más repeticiones.",
        recommendation: {
          weight: `${lastSession.weight.toFixed(1)} kg`,
          sets: lastSession.sets,
          reps: lastSession.reps + 1,
        },
      };
    } else {
      return {
        status: "negative",
        weight: `${weightDiff.toFixed(1)} kg`,
        volume: `${volumeDiff.toFixed(0)} kg`,
        message:
          "Parece que has tenido dificultades para progresar. Considera reducir ligeramente el peso y enfocarte en la técnica y rango completo de movimiento.",
        recommendation: {
          weight: `${(lastSession.weight - 2.5).toFixed(1)} kg`,
          sets: lastSession.sets,
          reps: lastSession.reps,
        },
      };
    }
  }, [chartData]);

  // Custom tooltip for charts
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataPoint;
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          <p className="font-medium">{data.fullDate}</p>
          <p className="text-sm text-muted-foreground">
            Peso:{" "}
            <span className="font-medium text-primary">{data.weight} kg</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Volumen:{" "}
            <span className="font-medium text-primary">{data.volume} kg</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Series × Reps:{" "}
            <span className="font-medium">
              {data.sets} × {data.reps}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

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

        <div className="space-y-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground font-display">
                Progressive Overload
              </h1>
            </div>

            <div className="max-w-md mx-auto mt-8 border border-border p-6 rounded-lg bg-background/40">
              <label className="text-sm font-medium mb-3 block flex items-center justify-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
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
          </div>

          {selectedExercise && chartData.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-primary" />
                  Progreso de {selectedExercise}
                </h2>
                <div className="text-sm text-muted-foreground">
                  {chartData.length} sesiones registradas
                </div>
              </div>

              {/* Weight Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progreso de Peso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis
                          dataKey="date"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          unit=" kg"
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="weight"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{
                            r: 6,
                            stroke: "hsl(var(--primary))",
                            strokeWidth: 2,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Volume Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Volumen Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis
                          dataKey="date"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          unit=" kg"
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="volume"
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                          barSize={30}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Latest Session Details */}
              {chartData.length > 0 && (
                <Card className="overflow-hidden border-l-4 border-l-primary">
                  <CardHeader className="pb-2 bg-muted/30">
                    <CardTitle className="text-lg">
                      Última sesión - {chartData[chartData.length - 1].fullDate}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Peso máximo
                        </p>
                        <p className="font-medium text-lg">
                          {chartData[chartData.length - 1].weight} kg
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Series × Reps
                        </p>
                        <p className="font-medium text-lg">
                          {chartData[chartData.length - 1].sets} ×{" "}
                          {chartData[chartData.length - 1].reps}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Volumen total
                        </p>
                        <p className="font-medium text-lg">
                          {chartData[chartData.length - 1].volume} kg
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* AI Insight */}
              {progressInsight && (
                <Card
                  className={`border-l-4 ${
                    progressInsight.status === "positive"
                      ? "border-l-green-500 bg-green-50/10"
                      : progressInsight.status === "neutral"
                      ? "border-l-amber-500 bg-amber-50/10"
                      : "border-l-red-500 bg-red-50/10"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp
                        className={`h-5 w-5 ${
                          progressInsight.status === "positive"
                            ? "text-green-500"
                            : progressInsight.status === "neutral"
                            ? "text-amber-500"
                            : "text-red-500"
                        }`}
                      />
                      Análisis de Progreso
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Cambio en peso
                        </p>
                        <p
                          className={`font-medium ${
                            progressInsight.weight.includes("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {progressInsight.weight}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Cambio en volumen
                        </p>
                        <p
                          className={`font-medium ${
                            progressInsight.volume.includes("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {progressInsight.volume}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Próxima meta
                        </p>
                        <p className="font-medium">
                          {progressInsight.recommendation.weight} ×{" "}
                          {progressInsight.recommendation.sets} ×{" "}
                          {progressInsight.recommendation.reps}
                        </p>
                      </div>
                    </div>
                    <div className="bg-background/80 p-3 rounded-md text-sm">
                      {progressInsight.message}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {selectedExercise && chartData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No hay datos de entrenamiento para este ejercicio.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProgressiveOverload;

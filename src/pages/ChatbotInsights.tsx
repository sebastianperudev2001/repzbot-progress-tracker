import { ArrowLeft, Dumbbell, FlameKindling, Brain, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ChatbotInsights = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-bold text-foreground font-display">
                RepzBot
              </h1>
              <Badge variant="outline" className="ml-2 bg-primary/10">
                Beta
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="rounded-lg border border-border bg-card overflow-hidden h-[70vh] shadow-md">
              <ChatWindow />
            </div>
          </div>

          <div className="space-y-4">
            <Card className="bg-card shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <FlameKindling className="h-5 w-5 text-red-500" />
                  <h2 className="font-bold text-foreground">Modo RepzBot</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  RepzBot está inspirado en el estilo motivacional de David
                  Goggins. No busca ser amable, sino empujarte a superar tus
                  límites.
                </p>
                <div className="flex items-center gap-2 text-xs text-primary font-medium">
                  <Info className="h-3 w-3" />
                  <span>Sin excusas. Sin compromisos.</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-primary" />
                  <h2 className="font-bold text-foreground">Sugerencias</h2>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>"Quiero saltarme el entrenamiento hoy"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>"No veo resultados después de 2 semanas"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>"Necesito motivación para mi PR"</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>
            RepzBot usa IA para simular mensajes motivacionales estilo David
            Goggins.
            <br />
            Versión Beta - Las respuestas son simuladas y no utilizan IA real
            aún.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ChatbotInsights;

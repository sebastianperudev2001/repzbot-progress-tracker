import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ChatbotInsights = () => {
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
            David Goggins Chatbot Insights
          </h1>

          <p>Hello World - Esta página será implementada próximamente</p>
        </div>
      </main>
    </div>
  );
};

export default ChatbotInsights;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import WorkoutHistory from "./pages/WorkoutHistory";
import ProgressiveOverload from "./pages/ProgressiveOverload";
import ChatbotInsights from "./pages/ChatbotInsights";
import AuthCallback from "./pages/AuthCallback";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirmation from "./pages/ResetPasswordConfirmation";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

// Componente para proteger rutas
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  // TEMPORARY: Force bypass authentication for debugging
  // Remove this in production!
  useEffect(() => {
    // Comment out this line to disable the bypass
    setIsAuthenticated(true); // TEMPORARY BYPASS
  }, []);

  useEffect(() => {
    console.log("ProtectedRoute mounted - checking auth");

    // Check if supabase is properly initialized
    console.log("Supabase client:", !!supabase);

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isAuthenticated === null) {
        console.log("Auth check timed out - forcing to false");
        setIsAuthenticated(false);
      }
    }, 5000); // 5 second timeout

    const checkAuth = async () => {
      try {
        console.log("Calling supabase.auth.getSession()");
        const { data, error } = await supabase.auth.getSession();

        console.log("Auth response:", { data, error });

        if (error) {
          console.error("Auth error:", error);
          setIsAuthenticated(false);
          return;
        }

        // Force authentication to false for debugging if needed
        // setIsAuthenticated(false);
        setIsAuthenticated(!!data.session);
        console.log("Authentication state set to:", !!data.session);
      } catch (err) {
        console.error("Unexpected error during auth check:", err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, !!session);
        setIsAuthenticated(!!session);
      }
    );

    return () => {
      console.log("Cleaning up auth listener");
      clearTimeout(timeoutId);
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    // Estado de carga mientras verificamos la autenticación
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-b-blue-700 border-l-blue-500 border-r-blue-700 rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reset-password-confirmation"
            element={<ResetPasswordConfirmation />}
          />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workout-history"
            element={
              <ProtectedRoute>
                <WorkoutHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progressive-overload"
            element={
              <ProtectedRoute>
                <ProgressiveOverload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot-insights"
            element={
              <ProtectedRoute>
                <ChatbotInsights />
              </ProtectedRoute>
            }
          />

          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

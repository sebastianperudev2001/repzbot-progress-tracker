import { useState, useEffect } from "react";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { AuthError } from "@supabase/supabase-js";

const ResetPasswordConfirmation = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Verificar que hay un token de restablecimiento de contraseña en la URL
  useEffect(() => {
    const checkForPasswordResetToken = async () => {
      const hash = window.location.hash;
      if (!hash || !hash.includes("type=recovery")) {
        toast({
          title: "Error",
          description:
            "Enlace de restablecimiento de contraseña inválido o expirado",
          variant: "destructive",
        });
        navigate("/reset-password");
      }
    };

    checkForPasswordResetToken();
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Validar que la contraseña tenga al menos 8 caracteres
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente",
      });

      // Redirigir al usuario al login después de un breve retraso
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: unknown) {
      const authError = error as AuthError;
      setError(authError.message || "Error al actualizar la contraseña");
      toast({
        title: "Error",
        description: authError.message || "Error al actualizar la contraseña",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo y título */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-gradient-power rounded-xl mb-4">
            <Dumbbell className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground font-display">
            RepzBot
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tu compañero de progreso fitness
          </p>
        </div>

        {/* Formulario de nueva contraseña */}
        <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Establecer nueva contraseña
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tu nueva contraseña para continuar
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Nueva contraseña
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground"
                >
                  Confirmar contraseña
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                variant="power"
                disabled={isLoading}
              >
                {isLoading
                  ? "Actualizando contraseña..."
                  : "Actualizar contraseña"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            "Stay hard, stay disciplined" - Sigue construyendo tu mejor versión
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmation;

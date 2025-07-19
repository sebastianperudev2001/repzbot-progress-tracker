import { useState } from "react";
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
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { success } = await resetPassword(email);
      if (success) {
        setIsSubmitted(true);
      }
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

        {/* Formulario de restablecimiento de contraseña */}
        <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Restablecer contraseña
            </CardTitle>
            <CardDescription className="text-center">
              {isSubmitted
                ? "Te hemos enviado un correo con instrucciones para restablecer tu contraseña."
                : "Ingresa tu correo electrónico para recibir instrucciones."}
            </CardDescription>
          </CardHeader>
          {!isSubmitted ? (
            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    ? "Enviando instrucciones..."
                    : "Enviar instrucciones"}
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  <Link to="/login" className="text-primary hover:underline">
                    Volver al inicio de sesión
                  </Link>
                </p>
              </CardFooter>
            </form>
          ) : (
            <CardFooter className="flex-col space-y-4">
              <p className="text-sm text-center text-muted-foreground">
                Revisa tu bandeja de entrada y sigue las instrucciones en el
                correo que te enviamos.
              </p>
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
              >
                Enviar de nuevo
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                <Link to="/login" className="text-primary hover:underline">
                  Volver al inicio de sesión
                </Link>
              </p>
            </CardFooter>
          )}
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

export default ResetPassword;

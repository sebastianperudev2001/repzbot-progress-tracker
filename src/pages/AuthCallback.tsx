import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error al procesar la autenticación:", error);
      }

      // Redirigir al usuario a la página principal después de procesar la autenticación
      navigate("/");
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Procesando autenticación...</h2>
        <p className="text-muted-foreground">
          Por favor espera mientras te redirigimos.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;

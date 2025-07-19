import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Session, User, AuthError } from "@supabase/supabase-js";

// Definir la interfaz para los datos de usuario
export interface UserProfile {
  id: string;
  full_name: string;
  phone_number?: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Función para obtener el perfil del usuario
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error al obtener el perfil:", error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      return null;
    }
  };

  useEffect(() => {
    // Obtener la sesión actual
    const getSession = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        setSession(data.session);
        setUser(data.session?.user ?? null);

        // Si hay un usuario, obtener su perfil
        if (data.session?.user) {
          const userProfile = await fetchProfile(data.session.user.id);
          setProfile(userProfile);
        }
      } catch (error: unknown) {
        const authError = error as AuthError;
        console.error("Error al obtener la sesión:", authError.message);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Escuchar cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Si hay un usuario, obtener su perfil
        if (session?.user) {
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Iniciar sesión con email y contraseña
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error al iniciar sesión",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de nuevo",
      });

      // Si hay un usuario, obtener su perfil
      if (data.user) {
        const userProfile = await fetchProfile(data.user.id);
        setProfile(userProfile);
      }

      return { data };
    } catch (error: unknown) {
      const authError = error as Error;
      toast({
        title: "Error al iniciar sesión",
        description: "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  // Iniciar sesión con teléfono (SMS)
  const signInWithPhone = async (phone: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          channel: "sms",
        },
      });

      if (error) {
        toast({
          title: "Error al enviar el código SMS",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Código SMS enviado",
        description: "Se ha enviado un código de verificación a tu teléfono",
      });

      return { data };
    } catch (error: unknown) {
      const authError = error as Error;
      toast({
        title: "Error al enviar el código SMS",
        description: "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  // Verificar código SMS
  const verifyOtp = async (phone: string, token: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: "sms",
      });

      if (error) {
        toast({
          title: "Error al verificar el código",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Verificación exitosa",
        description: "Has iniciado sesión correctamente",
      });

      // Si hay un usuario, obtener su perfil
      if (data.user) {
        const userProfile = await fetchProfile(data.user.id);
        setProfile(userProfile);
      }

      return { data };
    } catch (error: unknown) {
      const authError = error as Error;
      toast({
        title: "Error al verificar el código",
        description: "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  // Registrar un nuevo usuario
  const signUp = async (
    email: string,
    password: string,
    userData: { full_name?: string; phone_number: string }
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone: userData.phone_number, // This sets the main phone field
        options: {
          data: userData, // This sets the user_metadata
        },
      });

      if (error) {
        toast({
          title: "Error al registrarse",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // Update the user to ensure phone field is set correctly
      if (data.user) {
        await supabase.auth.updateUser({
          phone: userData.phone_number,
        });
      }

      toast({
        title: "Registro exitoso",
        description: "Se ha enviado un correo de confirmación",
      });

      return { data };
    } catch (error: unknown) {
      const authError = error as Error;
      toast({
        title: "Error al registrarse",
        description: "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  // Registrar un nuevo usuario con teléfono (SMS)
  const signUpWithPhone = async (
    phone: string,
    userData?: { full_name?: string }
  ) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          shouldCreateUser: true,
          data: userData,
        },
      });

      if (error) {
        toast({
          title: "Error al registrarse",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Código SMS enviado",
        description: "Se ha enviado un código de verificación a tu teléfono",
      });

      return { data };
    } catch (error: unknown) {
      const authError = error as Error;
      toast({
        title: "Error al registrarse",
        description: "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  // Actualizar perfil de usuario
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "No hay usuario autenticado",
        variant: "destructive",
      });
      return { error: new Error("No hay usuario autenticado") };
    }

    try {
      // Actualizar datos en auth.users
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: profileData.full_name,
          phone_number: profileData.phone_number,
        },
      });

      if (authError) {
        throw authError;
      }

      // Si se está actualizando el número de teléfono, actualizar también el campo phone principal
      if (profileData.phone_number) {
        const { error: phoneError } = await supabase.auth.updateUser({
          phone: profileData.phone_number,
        });

        if (phoneError) {
          throw phoneError;
        }
      }

      // Actualizar datos en la tabla profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) {
        throw profileError;
      }

      // Obtener el perfil actualizado
      const updatedProfile = await fetchProfile(user.id);
      setProfile(updatedProfile);

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado correctamente",
      });

      return { success: true };
    } catch (error: unknown) {
      console.error("Error al actualizar el perfil:", error);
      const err = error as Error;
      toast({
        title: "Error al actualizar el perfil",
        description: err.message || "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
      return { error: err };
    }
  };

  // Cerrar sesión
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast({
          title: "Error al cerrar sesión",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });

      setProfile(null);
      navigate("/login");
      return { success: true };
    } catch (error: unknown) {
      const authError = error as Error;
      toast({
        title: "Error al cerrar sesión",
        description: "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  // Restablecer contraseña
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password-confirmation`,
      });

      if (error) {
        toast({
          title: "Error al enviar el correo",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Correo enviado",
        description: "Se ha enviado un correo para restablecer tu contraseña",
      });

      return { success: true };
    } catch (error: unknown) {
      const authError = error as Error;
      toast({
        title: "Error al enviar el correo",
        description: "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
      return { error: authError };
    }
  };

  return {
    user,
    profile,
    session,
    loading,
    signIn,
    signInWithPhone,
    verifyOtp,
    signUp,
    signUpWithPhone,
    signOut,
    resetPassword,
    updateProfile,
  };
};

import { useState, useEffect } from "react";
import { Dumbbell, User, Phone, Mail, Camera } from "lucide-react";
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
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { StorageError } from "@supabase/storage-js";

const Profile = () => {
  const { user, profile, loading, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.full_name || "");
      setPhone(profile.phone_number || "");
      setAvatarUrl(profile.avatar_url || null);
    }
  }, [profile]);

  const validatePhone = (phone: string) => {
    // Validación básica de teléfono (puedes ajustar según tus necesidades)
    if (!phone) return true; // Permitir teléfono vacío
    const phoneRegex = /^\+?[0-9]{6,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setUploading(true);
      setError(null);

      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user?.id}/avatar.${fileExt}`;

      // Subir la imagen a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Obtener la URL pública de la imagen
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Actualizar el perfil con la URL de la imagen
      if (data) {
        setAvatarUrl(data.publicUrl);
        await updateProfile({ avatar_url: data.publicUrl });
      }
    } catch (error: unknown) {
      const storageError = error as StorageError;
      setError(storageError.message || "Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validar el formato del teléfono si se ha proporcionado
    if (phone && !validatePhone(phone)) {
      setError("El formato del teléfono no es válido");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProfile({
        full_name: name,
        phone_number: phone,
      });
    } catch (error: unknown) {
      const err = error as Error;
      setError(err.message || "Error al actualizar el perfil");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Skeleton className="h-8 w-48 mx-auto mb-2" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-20 rounded-full mx-auto" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }

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

        {/* Formulario de perfil */}
        <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-center">Tu Perfil</CardTitle>
            <CardDescription className="text-center">
              Actualiza tu información personal
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Avatar */}
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl || undefined} alt={name} />
                  <AvatarFallback>
                    {name
                      ? name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .substring(0, 2)
                      : user?.email?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    disabled={uploading}
                  >
                    <Camera className="mr-1 h-3 w-3" />
                    {uploading ? "Subiendo..." : "Cambiar foto"}
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={uploading}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Mail className="mr-2 h-4 w-4" /> Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-background/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    No puedes cambiar tu email
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <User className="mr-2 h-4 w-4" /> Nombre
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Phone className="mr-2 h-4 w-4" /> Teléfono
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-background/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Opcional. Formato: +34 600 000 000
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                variant="power"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

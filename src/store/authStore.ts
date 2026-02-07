import { create } from 'zustand'
import { supabase } from '@lib/supabase.js'
import type { User } from '@supabase/supabase-js'

type AuthStore = {
  user: User | null;                             // El usuario actual (null si no está logueado)
  loading: boolean;                              // Indica si está cargando el usuario

  loginWithProvider: (provider: string) => void; // Función para iniciar sesión
  logout: () => void;                            // Función para cerrar sesión
}

export const useAuthStore = create<AuthStore>()((set) => ({
  // Estado inicial
  user: null,
  loading: true, // Empieza en true mientras carga

  // Iniciar sesión con un proveedor (google, github, etc)
  loginWithProvider: async (provider: string) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/'
      }
    });
  },

  // Cerrar sesión
  logout: async () => {
    await supabase.auth.signOut();
  },

  
}))

// Se ejecuta automáticamente cuando se importa el archivo
// Obtiene el usuario actual
supabase.auth.getUser().then(({ data: { user } }) => {
  useAuthStore.setState({ user, loading: false }); // Marca como cargado
});

// Escucha cambios en la autenticación
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.setState({ user: session?.user || null, loading: false });
});
import { create } from 'zustand'
import { supabase } from '@lib/supabase.js'
import { getProfileById } from '@lib/db.js'
import type { User } from '@supabase/supabase-js'

type Profile = {
  id: string;
  is_admin: boolean;
}

type AuthStore = {
  user: User | null;                             // El usuario actual (null si no está logueado)
  profile: Profile | null;                       // El perfil del usuario
  loading: boolean;                              // Indica si está cargando el usuario

  loginWithProvider: (provider: string) => void; // Función para iniciar sesión
  logout: () => void;                            // Función para cerrar sesión
  fetchProfile: () => Promise<void>;             // Función para cargar el perfil
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  // Estado inicial
  user: null,
  profile: null,
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
    set({ profile: null }); // Limpiar el perfil al cerrar sesión
  },

  // Cargar perfil del usuario
  fetchProfile: async () => {
    const { user } = get();
    if (!user) return;
    
    try {
      const profile = await getProfileById(user.id);
      set({ profile });
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    }
  },
}))

// Se ejecuta automáticamente cuando se importa el archivo
// Obtiene el usuario actual
supabase.auth.getUser().then(({ data: { user } }) => {
  useAuthStore.setState({ user, loading: false }); // Marca como cargado
  if (user) {
    useAuthStore.getState().fetchProfile(); // Cargar perfil automáticamente
  }
});

// Escucha cambios en la autenticación
supabase.auth.onAuthStateChange((event, session) => {
  const user = session?.user || null;
  useAuthStore.setState({ user, loading: false });
  
  if (user && event === 'SIGNED_IN') {
    useAuthStore.getState().fetchProfile(); // Cargar perfil al iniciar sesión
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({ profile: null }); // Limpiar perfil al cerrar sesión
  }
});
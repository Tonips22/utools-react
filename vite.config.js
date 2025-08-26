import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@sections': path.resolve(__dirname, 'src/sections'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@logic': path.resolve(__dirname, 'src/logic'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@auth': path.resolve(__dirname, 'src/auth'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
  build: {
    // Optimizaciones para producción
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          supabase: ['@supabase/supabase-js']
        }
      }
    }
  },
  // Asegurar que los assets se sirvan correctamente
  base: '/',
  publicDir: 'public'
});

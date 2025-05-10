import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),          // React plugin for Vite
    tailwindcss(),    // Tailwind CSS plugin for Vite
  ],
  optimizeDeps: {
    include: ['react-hot-toast'],  // Ensure react-hot-toast is optimized
  },
  ssr: {
    noExternal: ['react-hot-toast'], // Exclude react-hot-toast from externalization for SSR (if using SSR)
  },
  server: {
    host: true,       // Allow network access (useful for testing on mobile)
    port: 5173,       // Ensure consistent port for local development
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    sourcemap: true,   // Helpful for debugging in development
  },
});

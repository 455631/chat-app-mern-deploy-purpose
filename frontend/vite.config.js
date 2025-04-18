// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ['react-hot-toast'],
  },
  ssr: {
    noExternal: ['react-hot-toast'], // Optional: helpful if you're using SSR or deploying to platforms like Render
  },
})
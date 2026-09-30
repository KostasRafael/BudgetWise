import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward API calls to the backend so the browser sees a same-origin request.
      '/api': process.env.API_PROXY_TARGET ?? 'http://localhost:5050',
    },
  },
})

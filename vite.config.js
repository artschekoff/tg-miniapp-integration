import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['localdev.roxl.net', 'app.playdino.fun'],
    host: '0.0.0.0',
    port: 5173,
  },
  plugins: [react()],
})

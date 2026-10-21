import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {proxy: {"/api/auth": "http://127.0.0.1:3001", "/api/predicthq": "http://127.0.0.1:3001"}},
  preview: {proxy: {"/api/auth": "http://127.0.0.1:3001", "/api/predicthq": "http://127.0.0.1:3001"}},
})

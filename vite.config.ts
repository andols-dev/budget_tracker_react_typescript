import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/budget_tracker_react_typescript/',
  plugins: [react()],
})

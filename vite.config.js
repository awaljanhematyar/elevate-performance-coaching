// Vite and Vitest share the React/Tailwind compilation pipeline.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: { environment: 'jsdom', setupFiles: './src/test/setup.js', include: ['src/**/*.test.{js,jsx}'], testTimeout: 20000, pool: 'threads', maxWorkers: 1, fileParallelism: false },
})

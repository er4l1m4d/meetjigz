/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
    // Full-app render tests can take several seconds on constrained/loaded
    // machines; the 5s default caused false CI failures.
    testTimeout: 20000,
  },
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // FE -> BE connection: any request to /api/* is forwarded to the Express server.
    // This avoids CORS issues in development (the browser only talks to :5173).
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  test: {
    globals: true, // describe / it / expect / vi available without imports (like Jest)
    environment: 'node', // React test files opt into jsdom with a docblock comment
    setupFiles: ['./vitest.setup.js'],
    testTimeout: 30000,
    include: ['**/*.test.{js,jsx}'],
    exclude: ['node_modules/**', 'dist/**'],
  },
});

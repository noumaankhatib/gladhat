import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  appType: 'spa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        islands: resolve(__dirname, 'src/islands/index.jsx'),
      },
      output: {
        entryFileNames: (chunk) => (
          chunk.name === 'islands' ? 'islands/islands.js' : 'assets/[name]-[hash].js'
        ),
        chunkFileNames: (chunk) => (
          chunk.facadeModuleId?.includes('/islands/')
            ? 'islands/[name]-[hash].js'
            : 'assets/[name]-[hash].js'
        ),
      },
    },
  },
});

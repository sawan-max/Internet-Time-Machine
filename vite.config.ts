import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: '/Internet-Time-Machine/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/cdx': {
        target: 'https://web.archive.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cdx/, '/cdx/search/cdx'),
        secure: true,
      },
      '/api/wayback': {
        target: 'https://archive.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wayback/, '/wayback/available'),
        secure: true,
      },
    },
  },
});


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    target: 'esnext',
    // Manual chunk splitting to avoid one giant bundle
    rollupOptions: {
      output: {
        // Function form required by Rolldown (Vite 8)
        manualChunks(id) {
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'vendor-react';
          }
          if (id.includes('recharts')) {
            return 'vendor-charts';
          }
          if (id.includes('@vis.gl/react-google-maps')) {
            return 'vendor-maps';
          }
          if (id.includes('@google/generative-ai')) {
            return 'vendor-ai';
          }
          if (id.includes('lucide-react') || id.includes('dompurify') || id.includes('qrcode')) {
            return 'vendor-ui';
          }
        },
      },
    },
    // Warn when a chunk is larger than 500kb
    chunkSizeWarningLimit: 500,
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})

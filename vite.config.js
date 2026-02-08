import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
    minify: 'esbuild', // esbuild is faster than terser, but terser can be used if needed
    // For terser, install: npm install -D terser
    // Then change to: minify: 'terser',
    // terserOptions: {
    //   compress: { drop_console: true }
    // }
    // For now, using esbuild with console removal in production
    // Only remove console.log and console.debug, preserve console.error and console.warn for production debugging
    esbuild: {
      drop: ['console.log', 'console.debug', 'debugger'],
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging (optional)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gray/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    copyPublicDir: true, // правильно
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }    // очищает dist перед сборкой
  }
}
})
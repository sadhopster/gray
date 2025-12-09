// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/*', // Копируем всё из public
          dest: '.'
        }
      ]
    })
  ],
  base: '/gray/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    // Копируем public вручную
    copyPublicDir: true // ← ЭТА СТРОКА ВАЖНА!
  }
})
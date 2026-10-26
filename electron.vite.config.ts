import { resolve } from 'node:path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const alias = { '@': resolve(import.meta.dirname, 'src') }

export default defineConfig({
  main: {
    build: { lib: { entry: resolve(import.meta.dirname, 'electron/main.ts') } },
  },
  preload: {
    build: { lib: { entry: resolve(import.meta.dirname, 'electron/preload.ts') } },
  },
  renderer: {
    root: resolve(import.meta.dirname, 'src/app'),
    build: { rollupOptions: { input: resolve(import.meta.dirname, 'src/app/index.html') } },
    resolve: { alias },
    plugins: [react(), tailwindcss()],
  },
})

import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

let spaOutDir

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    {
      name: 'spa-github-pages-404',
      apply: 'build',
      configResolved(config) {
        spaOutDir = resolve(config.root, config.build.outDir)
      },
      closeBundle() {
        copyFileSync(resolve(spaOutDir, 'index.html'), resolve(spaOutDir, '404.html'))
      },
    },
    react(),
  ]
});

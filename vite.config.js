import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'tentacle'
  },
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/static': 'https://bogx-dev.bladeofgod.net'
    }
  }
})

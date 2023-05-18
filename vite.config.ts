import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import graphql from '@rollup/plugin-graphql'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), graphql()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    cors: {
      origin: "https://talachapp-api-47f5p.ondigitalocean.app/talachapp-api2/graphql",
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    }
  }
})

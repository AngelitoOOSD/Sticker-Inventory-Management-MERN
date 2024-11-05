import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  //abstract the http://localhost:5000 text in the sticker.js file
  //when /api is visited, prefix it with the target
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000"
      }
    }
  }
})

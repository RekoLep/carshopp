import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // 👈 tärkeää!
    emptyOutDir: true, // (vaihtoehtoinen, mutta hyvä että tyhjentää vanhat)
  }
})

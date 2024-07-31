import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':'https://w3xoeef8x8.execute-api.ap-south-1.amazonaws.com/production',
    }
  }
})

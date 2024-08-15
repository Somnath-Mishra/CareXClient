import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy:{
    //   '/carex': 'https://txzazouq7a.execute-api.ap-south-1.amazonaws.com/production',
    //   // '/carex':'http://localhost:9000'
    // }
    proxy: {
      '/carex': {
        target: 'https://txzazouq7a.execute-api.ap-south-1.amazonaws.com/production',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})





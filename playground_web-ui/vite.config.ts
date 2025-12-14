import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    include: ['ts-kraken']
  },
  build: {
    commonjsOptions: {
      include: [/ts-kraken/, /node_modules/]
    }
  },
  server: {
    proxy: {
      '/api/kraken': {
        target: 'https://api.kraken.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kraken/, '/0'),
        secure: false
      },
      '/api/kraken-ws': {
        target: 'wss://ws.kraken.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kraken-ws/, ''),
        ws: true,
        secure: false
      },
      '/api/kraken-ws-auth': {
        target: 'wss://ws-auth.kraken.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kraken-ws-auth/, ''),
        ws: true,
        secure: false
      }
    }
  }
})

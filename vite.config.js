import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['datatech-ai.org', 'www.datatech-ai.org', 'dev.datatech-ai.org'],
    port: 5177,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3010',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor'
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/i18next')) return 'i18n'
          if (id.includes('node_modules/@radix-ui') || id.includes('node_modules/lucide-react')) return 'ui-libs'
        },
      },
    },
  },
})
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2' // Vue 2.7

export default defineConfig({
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    vue(),
  ],
  server: {
    port: 8083,
  },
  define: {
    BUILD_TIMESTAMP: JSON.stringify(new Date()),
 },
})
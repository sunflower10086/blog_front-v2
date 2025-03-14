import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // vite
  resolve: {
    // 配置路径别名
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       silenceDeprecations: ["legacy-js-api"],
  //     },
  //   },
  // },
  // 服务器
  server: {
    port: 9877,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // 构建
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        pure_funcs: ["console.log"],
      },
    },
  },
})

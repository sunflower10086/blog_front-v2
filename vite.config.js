import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {themeConfig} from "./src/assets/themeConfig.mjs";

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
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
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
  // PWA
  pwa: {
    registerType: "autoUpdate",
    selfDestroying: true,
    workbox: {
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      // 资源缓存
      runtimeCaching: [
        {
          urlPattern: /(.*?)\.(woff2|woff|ttf|css)/,
          handler: "CacheFirst",
          options: {
            cacheName: "file-cache",
          },
        },
        {
          urlPattern: /(.*?)\.(ico|webp|png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
          handler: "CacheFirst",
          options: {
            cacheName: "image-cache",
          },
        },
        {
          urlPattern: /^https:\/\/cdn2\.codesign\.qq\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "iconfont-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 2,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
      // 缓存文件
      globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,gif,svg,woff2,ttf}"],
      // 排除路径
      navigateFallbackDenylist: [/^\/sitemap.xml$/, /^\/rss.xml$/, /^\/robots.txt$/],
    },
    manifest: {
      name: themeConfig.siteMeta.title,
      short_name: themeConfig.siteMeta.title,
      description: themeConfig.siteMeta.description,
      display: "standalone",
      start_url: "/",
      theme_color: "#fff",
      background_color: "#efefef",
      icons: [
        {
          src: "/images/logo/favicon-32x32.webp",
          sizes: "32x32",
          type: "image/webp",
        },
        {
          src: "/images/logo/favicon-96x96.webp",
          sizes: "96x96",
          type: "image/webp",
        },
        {
          src: "/images/logo/favicon-256x256.webp",
          sizes: "256x256",
          type: "image/webp",
        },
        {
          src: "/images/logo/favicon-512x512.webp",
          sizes: "512x512",
          type: "image/webp",
        },
      ],
    },
  },
})

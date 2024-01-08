import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    Components({ resolvers: [NaiveUiResolver()] }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ],
      dts: true,
      dirs: [
        'src/store/modules',
        'src/service/api',
      ]
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve('./'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  assetsInclude: ['/config/service-dev.js'],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:3200/',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '') // 重写路径把路径变成空字符
      // }
    }
  },
})

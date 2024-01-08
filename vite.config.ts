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
  }
})

/*
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-31 10:34:09
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-31 10:37:02
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    port: 8043,
  },
  resolve:{
    // 起别名
    alias:[
        {
            find:'@',
            replacement:'/src'
        },
        {
          find:'views',
          replacement:'/src/views'
        },
        {
          find:'components',
          replacement:'/src/components'
        },  
    ]
  }
})

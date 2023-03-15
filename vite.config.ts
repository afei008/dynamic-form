/** @format */

import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './example/index.ts'),
      name: 'dynamic-form',
      fileName: 'dynamic-form',
    },
    commonjsOptions: {
      // 该配置项需要设置为 true
      esmExternals: true,
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'element-plus',
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    // 该配置项需要设置为 true（npm link 的时候需要用到）
    preserveSymlinks: true,
  },
});

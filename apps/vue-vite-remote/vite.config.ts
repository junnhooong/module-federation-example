import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'vueViteRemote',
      filename: 'remoteEntry.js',
      manifest: true,
      exposes: {
        './Timeline': './src/components/Timeline.vue',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.4.0',
        },
      },
    }),
  ],
  server: {
    port: 3005,
    cors: true,
    open: false,
  },
  preview: {
    port: 3005,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});

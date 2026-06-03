import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    svelte(),
    federation({
      name: 'svelteViteRemote',
      filename: 'remoteEntry.js',
      manifest: true,
      exposes: {
        './Dashboard': './src/components/Dashboard.svelte',
      },
      shared: {
        svelte: {
          singleton: true,
          requiredVersion: '^4.2.0',
        },
      },
    }),
  ],
  server: {
    port: 3006,
    cors: true,
    open: false,
  },
  preview: {
    port: 3006,
    cors: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});

import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3000,
  },
  dev: {
    hmr: true,
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'shell',
          remotes: {
            reactRemote: 'reactRemote@http://localhost:3001/mf-manifest.json',
            vueRemote: 'vueRemote@http://localhost:3002/mf-manifest.json',
            svelteRemote: 'svelteRemote@http://localhost:3003/mf-manifest.json',
            // Vite remotes - using direct remoteEntry.js for better compatibility
            reactViteRemote: 'reactViteRemote@http://localhost:3004/remoteEntry.js',
            vueViteRemote: 'vueViteRemote@http://localhost:3005/remoteEntry.js',
            svelteViteRemote: 'svelteViteRemote@http://localhost:3006/remoteEntry.js',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: '^18.3.1',
              eager: true
            },
            'react-dom': {
              singleton: true,
              requiredVersion: '^18.3.1',
              eager: true
            },
          },
        }),
      ],
    },
  },
});

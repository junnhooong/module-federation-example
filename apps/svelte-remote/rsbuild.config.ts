import { defineConfig } from '@rsbuild/core';
import { pluginSvelte } from '@rsbuild/plugin-svelte';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginSvelte()],
  server: {
    port: 3003,
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'svelteRemote',
          exposes: {
            './Card': './src/components/Card.wrapper.tsx',
          },
          filename: 'remoteEntry.js',
          shared: {
            svelte: {
              singleton: true,
              requiredVersion: '^4.2.0',
              eager: true
            },
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

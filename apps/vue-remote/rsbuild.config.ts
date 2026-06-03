import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginVue()],
  server: {
    port: 3002,
  },
  dev: {
    hmr: true,
    assetPrefix: 'http://localhost:3002',
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'vueRemote',
          exposes: {
            './Counter': './src/components/Counter.wrapper.tsx',
          },
          shared: {
            vue: {
              singleton: true,
              requiredVersion: '^3.4.0',
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

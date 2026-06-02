import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3001,
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'reactRemote',
          exposes: {
            './Button': './src/components/Button.tsx',
          },
          filename: 'remoteEntry.js',
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

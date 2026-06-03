# Vite Remote Applications

This directory contains three additional Module Federation remote applications built with **Vite** (instead of Rsbuild), demonstrating cross-build-tool federation.

## Applications

### 1. React Vite Remote (`react-vite-remote`)
- **Port:** 3004
- **Exposes:** `./Card` - An interactive card component with likes counter
- **Build Tool:** Vite + @originjs/vite-plugin-federation
- **Framework:** React 18.3.1

### 2. Vue Vite Remote (`vue-vite-remote`)
- **Port:** 3005
- **Exposes:** `./Timeline` - An interactive timeline component
- **Build Tool:** Vite + @originjs/vite-plugin-federation
- **Framework:** Vue 3.4.0

### 3. Svelte Vite Remote (`svelte-vite-remote`)
- **Port:** 3006
- **Exposes:** `./Dashboard` - A real-time metrics dashboard
- **Build Tool:** Vite + @originjs/vite-plugin-federation
- **Framework:** Svelte 4.2.0

## Key Differences from Rsbuild Remotes

1. **Build Tool:** Uses Vite instead of Rsbuild/Rspack
2. **Federation Plugin:** Uses `@originjs/vite-plugin-federation` instead of `@module-federation/enhanced`
3. **Remote Entry:** Generates `remoteEntry.js` in `/assets/` directory
4. **No Manifest:** Vite federation uses direct entry file (not `mf-manifest.json`)

## Running the Applications

### Start All Vite Remotes at Once

From the project root:
```bash
./start-vite-remotes.sh
```

### Start Individual Remotes

```bash
# React Vite Remote
cd apps/react-vite-remote
pnpm install  # first time only
pnpm dev      # runs on http://localhost:3004

# Vue Vite Remote
cd apps/vue-vite-remote
pnpm install  # first time only
pnpm dev      # runs on http://localhost:3005

# Svelte Vite Remote
cd apps/svelte-vite-remote
pnpm install  # first time only
pnpm dev      # runs on http://localhost:3006
```

### Build for Production

```bash
cd apps/react-vite-remote && pnpm build
cd apps/vue-vite-remote && pnpm build
cd apps/svelte-vite-remote && pnpm build
```

## Integration with Shell

The shell app (running on port 3000) can consume these Vite remotes alongside the Rsbuild remotes. The configuration in `apps/shell/rsbuild.config.ts` includes:

```typescript
remotes: {
  // Rsbuild remotes (manifest-based)
  reactRemote: 'reactRemote@http://localhost:3001/mf-manifest.json',
  vueRemote: 'vueRemote@http://localhost:3002/mf-manifest.json',
  svelteRemote: 'svelteRemote@http://localhost:3003/mf-manifest.json',
  
  // Vite remotes (direct entry file)
  reactViteRemote: 'reactViteRemote@http://localhost:3004/assets/remoteEntry.js',
  vueViteRemote: 'vueViteRemote@http://localhost:3005/assets/remoteEntry.js',
  svelteViteRemote: 'svelteViteRemote@http://localhost:3006/assets/remoteEntry.js',
}
```

## Standalone Development

Each remote can run independently as a standalone app:
- **React Vite:** http://localhost:3004 - Shows the card component
- **Vue Vite:** http://localhost:3005 - Shows the timeline component
- **Svelte Vite:** http://localhost:3006 - Shows the dashboard component

## Technology Stack

| Remote | Framework | Version | Plugin |
|--------|-----------|---------|--------|
| React Vite | React | 18.3.1 | @originjs/vite-plugin-federation |
| Vue Vite | Vue | 3.4.0 | @originjs/vite-plugin-federation |
| Svelte Vite | Svelte | 4.2.0 | @originjs/vite-plugin-federation |

All use **Vite 5.4.11** as the build tool.

## Hot Module Replacement (HMR)

All Vite remotes support HMR out of the box:
- Edit any component file
- Changes are instantly reflected in both standalone and shell views
- No full page reload needed

## Troubleshooting

### Port Already in Use
If ports 3004-3006 are already in use, update the `server.port` in each app's `vite.config.ts`:

```typescript
server: {
  port: 3004, // Change this
  cors: true,
}
```

### CORS Issues
All Vite remotes have CORS enabled by default. If you encounter CORS issues, ensure `cors: true` is set in the Vite config.

### Module Not Found
Make sure all remotes are running before starting the shell app. The shell dynamically loads components at runtime.

## Architecture Notes

**Cross-Build-Tool Federation:** This setup demonstrates that Module Federation 2.0 can work across different build tools (Rsbuild + Vite), proving the flexibility and interoperability of the architecture.

**Shared Dependencies:** React is shared as a singleton between the shell and React remotes to avoid duplicate instances. Vue and Svelte are framework-specific to their respective remotes.

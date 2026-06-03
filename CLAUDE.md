# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Module Federation 2.0 example project demonstrating micro-frontend architecture. The project uses a pnpm monorepo structure with multiple implementations:

### Multi-Framework Shell with Rsbuild Remotes
**Main implementation** - Demonstrates Module Federation 2.0 with multiple frameworks working together:
- **Shell app** (port 3000) - React-based orchestrator that consumes components from all remotes
- **React Remote** (port 3001) - Exposes a React button component (Rsbuild)
- **Vue Remote** (port 3002) - Exposes a Vue counter component (Rsbuild)
- **Svelte Remote** (port 3003) - Exposes a Svelte card component (Rsbuild)

See `/apps/README.md` for detailed documentation on the multi-framework setup.

### Multi-Framework Vite Remotes (`apps/*-vite-remote`)
**Cross-build-tool example** - Demonstrates Module Federation with Vite instead of Rsbuild:
- **React Vite Remote** (port 3004) - Exposes a React card component with likes counter
- **Vue Vite Remote** (port 3005) - Exposes a Vue timeline component
- **Svelte Vite Remote** (port 3006) - Exposes a Svelte dashboard component

These remotes use `@module-federation/vite` and can be consumed by the same shell app alongside Rsbuild remotes. See `/apps/VITE-REMOTES.md` and `VITE-RSBUILD-COMPAT.md` for details.

### Rsbuild Implementation (`apps/rsbuild/`)
- **Host app** - Runs on port 3000, exposes a `ProviderComponent`
- **Remote app** - Runs on port 3001, consumes the Provider component from the host

### Modern.js Implementation (`apps/js/`)
- **Host app** - Runs on port 3001, uses Modern.js framework
- **Remote app** - Consumes components from the Modern.js host

## Architecture

### Module Federation Configuration (Rsbuild)

The Rsbuild implementation demonstrates Module Federation 2.0 with:
- **Host** exposes: `ProviderComponent` at the `.` entry point (port 3000)
- **Remote** consumes: `host` from `http://localhost:3000/mf-manifest.json` (port 3001)
- **Shared dependencies**: React and React-DOM are shared as singletons to avoid duplicate instances
- **Share strategy**: Remote uses `loaded-first` strategy

Each app has two config files:
- `rsbuild.config.ts` - Main build configuration with port settings
- `module-federation.config.ts` - Module Federation setup (exposes/remotes/shared)

### Project Structure

```
apps/
  shell/                # Multi-framework shell app (port 3000)
  
  # Rsbuild remotes
  react-remote/         # React remote (port 3001)
  vue-remote/           # Vue remote (port 3002)
  svelte-remote/        # Svelte remote (port 3003)
  
  # Vite remotes
  react-vite-remote/    # React Vite remote (port 3004)
  vue-vite-remote/      # Vue Vite remote (port 3005)
  svelte-vite-remote/   # Svelte Vite remote (port 3006)
  
  # Other examples
  rsbuild/
    host/               # Rsbuild host application
    remote/             # Rsbuild remote application
  js/
    host/               # Modern.js host application
    remote/             # Modern.js remote application
```

### Bootstrap Pattern

Both apps use a bootstrap pattern where `index.tsx` dynamically imports `bootstrap.tsx`. This ensures shared dependencies are loaded before the app initializes, preventing runtime errors with Module Federation.

## Development Commands

### Multi-Framework Apps (Primary Example)

#### Start All Applications at Once

```bash
# Start all 6 remotes (Rsbuild + Vite) and the shell
./start-all.sh

# This starts:
# - Shell (port 3000)
# - Rsbuild remotes: React (3001), Vue (3002), Svelte (3003)
# - Vite remotes: React (3004), Vue (3005), Svelte (3006)
```

#### Start Applications Individually

```bash
# Rsbuild remotes
cd apps/react-remote && pnpm dev      # http://localhost:3001
cd apps/vue-remote && pnpm dev        # http://localhost:3002
cd apps/svelte-remote && pnpm dev     # http://localhost:3003

# Vite remotes
cd apps/react-vite-remote && pnpm dev    # http://localhost:3004
cd apps/vue-vite-remote && pnpm dev      # http://localhost:3005
cd apps/svelte-vite-remote && pnpm dev   # http://localhost:3006

# Shell
cd apps/shell && pnpm dev             # http://localhost:3000
```

Each remote can also run standalone for development. See `/apps/README.md` and `/apps/VITE-REMOTES.md` for more details.

### Rsbuild Apps

```bash
# Development (starts dev server with auto-open)
cd apps/rsbuild/host && pnpm dev      # Runs on http://localhost:3000
cd apps/rsbuild/remote && pnpm dev    # Runs on http://localhost:3001

# Production build
cd apps/rsbuild/host && pnpm build
cd apps/rsbuild/remote && pnpm build
```

### Modern.js Apps

```bash
# Development
cd apps/js/host && pnpm dev      # Runs on http://localhost:3001
cd apps/js/remote && pnpm dev

# Production build
pnpm build

# Other commands
pnpm lint                        # Run Biome linter
pnpm reset                       # Remove all node_modules
```

**Important**: For all Module Federation setups, both host and remote apps must be running simultaneously. The host/shell consumes components from remotes at runtime.

## Package Management

- Uses **pnpm** with workspaces (required: pnpm@10.27.0)
- Install dependencies from project root: `pnpm install`
- Dependencies are hoisted to the workspace root

## Technology Stack

### Rsbuild Apps
- **Build tool**: Rsbuild 1.7.5
- **Framework**: React 18.3.1
- **Language**: TypeScript 5.7.2
- **Module Federation**: @module-federation/enhanced 2.5.0

### Vite Apps
- **Build tool**: Vite 5.4.21
- **Frameworks**: React 18.3.1, Vue 3.4.0, Svelte 4.2.0
- **Language**: TypeScript 5.7.2
- **Module Federation**: @module-federation/vite 1.16.2

### Modern.js Apps
- **Framework**: Modern.js (canary build)
- **React**: 18.3.1
- **Language**: TypeScript 5.0.4
- **Linter**: Biome 1.8.3
- **Module Federation**: @module-federation/modern-js-v3 2.5.0

### Common
- **Module Federation manifest**: 
  - Rsbuild ↔ Rsbuild: Uses `mf-manifest.json` for remote entry discovery
  - Rsbuild ↔ Vite: Uses direct `remoteEntry.js` for better cross-build-tool compatibility
- **Type safety**: Automatic federated type generation with `@mf-types`
- **Compatibility**: See `VITE-RSBUILD-COMPAT.md` for details on cross-build-tool Module Federation

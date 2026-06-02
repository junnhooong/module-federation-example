# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Module Federation 2.0 example project demonstrating micro-frontend architecture. The project uses a pnpm monorepo structure with multiple implementations:

### Multi-Framework Shell (`apps/shell`, `apps/react-remote`, `apps/vue-remote`, `apps/svelte-remote`)
**Main implementation** - Demonstrates Module Federation 2.0 with multiple frameworks working together:
- **Shell app** (port 3000) - React-based orchestrator that consumes components from all remotes
- **React Remote** (port 3001) - Exposes a React button component
- **Vue Remote** (port 3002) - Exposes a Vue counter component
- **Svelte Remote** (port 3003) - Exposes a Svelte card component

See `/apps/README.md` for detailed documentation on the multi-framework setup.

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
  shell/           # Multi-framework shell app (port 3000)
  react-remote/    # React remote component (port 3001)
  vue-remote/      # Vue remote component (port 3002)
  svelte-remote/   # Svelte remote component (port 3003)
  rsbuild/
    host/          # Rsbuild host application (port 3000)
    remote/        # Rsbuild remote application (port 3001)
  js/
    host/          # Modern.js host application (port 3001)
    remote/        # Modern.js remote application
```

### Bootstrap Pattern

Both apps use a bootstrap pattern where `index.tsx` dynamically imports `bootstrap.tsx`. This ensures shared dependencies are loaded before the app initializes, preventing runtime errors with Module Federation.

## Development Commands

### Multi-Framework Apps (Primary Example)

To run the complete multi-framework setup, start all four applications:

```bash
# Terminal 1 - React Remote
cd apps/react-remote && pnpm dev      # http://localhost:3001

# Terminal 2 - Vue Remote
cd apps/vue-remote && pnpm dev        # http://localhost:3002

# Terminal 3 - Svelte Remote
cd apps/svelte-remote && pnpm dev     # http://localhost:3003

# Terminal 4 - Shell
cd apps/shell && pnpm dev             # http://localhost:3000
```

Each remote can also run standalone for development. See `/apps/README.md` for more details.

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
- **Build tool**: Rsbuild 2.0.0-beta.2
- **Framework**: React 19.2.3
- **Language**: TypeScript 5.7.2
- **Module Federation**: @module-federation/rsbuild-plugin 2.5.0

### Modern.js Apps
- **Framework**: Modern.js (canary build)
- **React**: 18.3.1
- **Language**: TypeScript 5.0.4
- **Linter**: Biome 1.8.3
- **Module Federation**: @module-federation/modern-js-v3 2.5.0

### Common
- **Module Federation manifest**: Uses `mf-manifest.json` for remote entry discovery
- **Type safety**: Automatic federated type generation with `@mf-types`

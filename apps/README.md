# Module Federation 2.0 Multi-Framework Example

This directory contains a complete Module Federation 2.0 setup demonstrating micro-frontend architecture across multiple frameworks.

## Applications

### Shell App (Port 3000)
The main orchestrator application built with React. Consumes components from all remote applications.

**Location**: `apps/shell/`

### React Remote (Port 3001)
Exposes a React button component with click counter functionality.

**Location**: `apps/react-remote/`
**Exposed Module**: `./Button`

### Vue Remote (Port 3002)
Exposes a Vue counter component with increment/decrement functionality.

**Location**: `apps/vue-remote/`
**Exposed Module**: `./Counter`

### Svelte Remote (Port 3003)
Exposes a Svelte card component with flip animation.

**Location**: `apps/svelte-remote/`
**Exposed Module**: `./Card`

## Getting Started

### Install Dependencies
```bash
# From project root
pnpm install
```

### Running All Applications

**Option 1: Use the starter script (easiest)**
```bash
# From project root
./start-all.sh
```

**Option 2: Run manually in separate terminals**

To experience the full Module Federation setup, you need to run all applications simultaneously:

```bash
# Terminal 1 - React Remote
cd apps/react-remote && pnpm dev

# Terminal 2 - Vue Remote
cd apps/vue-remote && pnpm dev

# Terminal 3 - Svelte Remote
cd apps/svelte-remote && pnpm dev

# Terminal 4 - Shell App
cd apps/shell && pnpm dev
```

### Accessing the Applications

- **Shell**: http://localhost:3000 (main application consuming all remotes)
- **React Remote**: http://localhost:3001 (standalone mode)
- **Vue Remote**: http://localhost:3002 (standalone mode)
- **Svelte Remote**: http://localhost:3003 (standalone mode)

## Architecture

### Module Federation Configuration

Each remote application exposes specific components that can be consumed by the shell application at runtime:

- **React Remote** → `reactRemote/Button`
- **Vue Remote** → `vueRemote/Counter`
- **Svelte Remote** → `svelteRemote/Card`

The shell application dynamically loads these components using React Suspense for loading states.

### Key Features

- ✅ **Multi-Framework Support**: React, Vue, and Svelte working together
- ✅ **Independent Deployment**: Each remote can be deployed separately
- ✅ **Shared Dependencies**: React and React-DOM shared as singletons
- ✅ **Type Safety**: TypeScript support across all applications
- ✅ **Standalone Mode**: Each remote can run independently
- ✅ **Dynamic Imports**: Lazy loading with Suspense boundaries

## Building for Production

```bash
# Build all applications
cd apps/shell && pnpm build
cd apps/react-remote && pnpm build
cd apps/vue-remote && pnpm build
cd apps/svelte-remote && pnpm build
```

## Technology Stack

- **Build Tool**: Rsbuild with Rspack
- **Module Federation**: @module-federation/enhanced 0.8.0
- **React**: 18.3.1
- **Vue**: 3.4.0
- **Svelte**: 4.2.0
- **TypeScript**: 5.0.0

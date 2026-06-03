# Multi-Framework Remotes - Detailed Guide

> **Note**: For a quick overview, see the [main README](../README.md) in the project root.

This directory contains all remote applications for the Module Federation example, including both Rsbuild and Vite implementations.

## 📦 Rsbuild Remotes (Ports 3001-3003)

### React Remote (Port 3001)
**Location**: `apps/react-remote/`  
**Exposed Module**: `./Button`  
**Component**: Interactive button with click counter  
**Configuration**: `rsbuild.config.ts` with manifest-based federation

```typescript
// Shell usage
import Button from 'reactRemote/Button';
```

### Vue Remote (Port 3002)
**Location**: `apps/vue-remote/`  
**Exposed Module**: `./Counter`  
**Component**: Counter with increment/decrement  
**Configuration**: Uses Vue wrapper for React integration

```typescript
// Shell usage
import Counter from 'vueRemote/Counter';
```

### Svelte Remote (Port 3003)
**Location**: `apps/svelte-remote/`  
**Exposed Module**: `./Card`  
**Component**: Card with flip animation  
**Configuration**: Uses Svelte wrapper for React integration

```typescript
// Shell usage
import Card from 'svelteRemote/Card';
```

## ⚡ Vite Remotes (Ports 3004-3006)

### React Vite Remote (Port 3004)
**Location**: `apps/react-vite-remote/`  
**Exposed Module**: `./Card`  
**Component**: Card with likes counter  
**Configuration**: `vite.config.ts` with `@originjs/vite-plugin-federation`

```typescript
// Shell usage
import Card from 'reactViteRemote/Card';
```

### Vue Vite Remote (Port 3005)
**Location**: `apps/vue-vite-remote/`  
**Exposed Module**: `./Timeline`  
**Component**: Interactive timeline  
**Configuration**: Vite + Vue with direct entry file

```typescript
// Shell usage
import Timeline from 'vueViteRemote/Timeline';
```

### Svelte Vite Remote (Port 3006)
**Location**: `apps/svelte-vite-remote/`  
**Exposed Module**: `./Dashboard`  
**Component**: Real-time metrics dashboard  
**Configuration**: Vite + Svelte with direct entry file

```typescript
// Shell usage
import Dashboard from 'svelteViteRemote/Dashboard';
```

## 🏠 Shell App (Port 3000)

**Location**: `apps/shell/`  
**Role**: Main orchestrator application  
**Framework**: React (Rsbuild)  
**Consumes**: All 6 remote applications

The shell app dynamically loads all remote components using React Suspense and lazy imports.

## 🚀 Running Applications

### Quick Start (All Apps)
```bash
# From project root
./start-all.sh
```

### Individual Apps
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

## 🔧 Key Configuration Differences

### Rsbuild Configuration
- Uses `@module-federation/enhanced`
- Generates `mf-manifest.json`
- Consumed via: `remoteName@http://localhost:PORT/mf-manifest.json`
- Requires `dev.assetPrefix` for HMR

### Vite Configuration
- Uses `@originjs/vite-plugin-federation`
- Generates `remoteEntry.js` in `/assets/`
- Consumed via: `remoteName@http://localhost:PORT/assets/remoteEntry.js`
- Requires `server.cors: true`

## 🎨 Framework Wrappers

Vue and Svelte components need React wrappers to integrate with the React shell:

**Vue Wrapper Pattern:**
```tsx
// Counter.wrapper.tsx
import { createApp } from 'vue';
import Counter from './Counter.vue';

export default function VueCounter() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      const app = createApp(Counter);
      app.mount(ref.current);
      return () => app.unmount();
    }
  }, []);
  
  return <div ref={ref} />;
}
```

## 📋 Exposed Modules Reference

| Remote | Port | Module | Component Type | Build Tool |
|--------|------|--------|----------------|------------|
| reactRemote | 3001 | ./Button | React Button | Rsbuild |
| vueRemote | 3002 | ./Counter | Vue Counter | Rsbuild |
| svelteRemote | 3003 | ./Card | Svelte Card | Rsbuild |
| reactViteRemote | 3004 | ./Card | React Card | Vite |
| vueViteRemote | 3005 | ./Timeline | Vue Timeline | Vite |
| svelteViteRemote | 3006 | ./Dashboard | Svelte Dashboard | Vite |

## 🏗️ Standalone Mode

Each remote can run independently for development:

1. **Start the remote**: `cd apps/react-remote && pnpm dev`
2. **Visit standalone URL**: `http://localhost:3001`
3. **Develop in isolation**: Make changes and see HMR in action
4. **Test integration**: Start the shell to see it in the federated app

## 🔄 Development Workflow

1. **Edit a component** in any remote
2. **HMR updates** the standalone app instantly
3. **Shell app** detects the change (if running)
4. **No restart needed** for either app

## 📦 Building for Production

```bash
# Build a single remote
cd apps/react-remote && pnpm build

# Build all remotes
for dir in apps/{react,vue,svelte}-{remote,vite-remote}; do
  cd $dir && pnpm build && cd ../..
done

# Build shell
cd apps/shell && pnpm build
```

## 🐛 Troubleshooting

### Remote Won't Load in Shell
1. Verify remote is running: `curl http://localhost:3001/mf-manifest.json`
2. Check browser console for errors
3. Verify CORS is enabled (Vite remotes)
4. Check network tab for 404s

### TypeScript Errors
Add declarations to `apps/shell/src/remotes.d.ts`:
```typescript
declare module 'yourRemote/Component' {
  const Component: React.ComponentType;
  export default Component;
}
```

### HMR Not Working
- Rsbuild: Check `dev.assetPrefix` is set correctly
- Vite: Ensure `server.cors: true` is set
- Both: Verify `dev.hmr: true` (Rsbuild) or default HMR (Vite)

## 📚 Additional Resources

- **[Main README](../README.md)** - Quick start and overview
- **[CLAUDE.md](../CLAUDE.md)** - Architecture and development guidelines
- **[VITE-REMOTES.md](./VITE-REMOTES.md)** - Vite-specific details

---

For more information, see the [main documentation](../README.md).

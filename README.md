# Module Federation 2.0 Multi-Framework & Cross-Build-Tool Example

A comprehensive example demonstrating **Module Federation 2.0** with multiple frameworks (React, Vue, Svelte) and multiple build tools (Rsbuild + Vite) working together in a micro-frontend architecture.

> **✅ Success!**: Using the official `@module-federation/vite` plugin, we've achieved true cross-build-tool federation! Vite and Rsbuild remotes work seamlessly together. See [MIGRATION-TO-OFFICIAL-VITE-PLUGIN.md](./MIGRATION-TO-OFFICIAL-VITE-PLUGIN.md) for details.

## 🚀 Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Start all applications (3 Rsbuild remotes + 3 Vite standalones + 1 shell)
./start-all.sh

# 3. Open the shell to see federated remotes
open http://localhost:3000

# 4. Visit Vite apps individually (not federated)
open http://localhost:3004  # React Vite
open http://localhost:3005  # Vue Vite
open http://localhost:3006  # Svelte Vite
```

## 📊 What's Running

| App | Port | Build Tool | Framework | Component | Federated? |
|-----|------|------------|-----------|-----------|------------|
| **Shell** | 3000 | Rsbuild | React | Orchestrator | Host ✅ |
| React Remote | 3001 | Rsbuild | React | Button | ✅ Yes |
| Vue Remote | 3002 | Rsbuild | Vue | Counter | ✅ Yes |
| Svelte Remote | 3003 | Rsbuild | Svelte | Card | ✅ Yes |
| React Vite Remote | 3004 | **Vite** | React | Card with Likes | ✅ **Yes!** |
| Vue Vite Remote | 3005 | **Vite** | Vue | Timeline | ✅ **Yes!** |
| Svelte Vite Remote | 3006 | **Vite** | Svelte | Dashboard | ✅ **Yes!** |

## ✨ Key Features

### 🔧 Cross-Build-Tool Federation
- **Rsbuild** remotes use `@module-federation/enhanced` with manifest-based loading
- **Vite** remotes use `@module-federation/vite` (official plugin) with manifest-based loading
- Both use the **same Module Federation protocol** - fully compatible!
- **Multi-framework** support (React, Vue, Svelte all federated together)
- True **technology freedom** - teams can choose their preferred build tool

### 🎨 Multi-Framework Architecture
- React, Vue, and Svelte components all consumed by a single React shell
- Framework-specific wrappers handle integration transparently
- Shared dependencies managed as singletons to avoid duplication

### 🔥 Hot Module Replacement
- **Rsbuild remotes**: Full HMR in standalone AND federated modes ✅
- **Vite apps**: HMR in standalone mode only (not federated with shell) ⚠️
- Edit any Rsbuild remote component and see changes instantly in the shell
- No configuration needed - HMR works out of the box
- See [HMR-GUIDE.md](./HMR-GUIDE.md) for detailed workflows

### 🏗️ Micro-Frontend Benefits
- **Independent Deployment**: Each remote can be deployed separately
- **Technology Freedom**: Teams can choose their preferred build tool and framework
- **Runtime Loading**: Components loaded on-demand at runtime
- **Type Safety**: TypeScript declarations for all federated modules
- **Standalone Development**: Each remote can run independently

## 📁 Project Structure

```
module-federation-example/
├── apps/
│   ├── shell/                   # Main orchestrator (Rsbuild + React)
│   │   ├── src/
│   │   │   ├── App.tsx         # Consumes all remotes
│   │   │   └── remotes.d.ts    # TypeScript declarations
│   │   └── rsbuild.config.ts   # MF configuration
│   │
│   ├── react-remote/            # Rsbuild remotes
│   │   ├── src/components/Button.tsx
│   │   └── rsbuild.config.ts
│   ├── vue-remote/
│   │   ├── src/components/Counter.vue
│   │   └── rsbuild.config.ts
│   ├── svelte-remote/
│   │   ├── src/components/Card.svelte
│   │   └── rsbuild.config.ts
│   │
│   ├── react-vite-remote/       # Vite remotes
│   │   ├── src/components/Card.tsx
│   │   └── vite.config.ts
│   ├── vue-vite-remote/
│   │   ├── src/components/Timeline.vue
│   │   └── vite.config.ts
│   ├── svelte-vite-remote/
│   │   ├── src/components/Dashboard.svelte
│   │   └── vite.config.ts
│   │
│   ├── rsbuild/                 # Additional examples
│   │   ├── host/
│   │   └── remote/
│   └── js/                      # Modern.js examples
│       ├── host/
│       └── remote/
│
├── start-all.sh                 # Unified start script
├── README.md                    # This file
├── CLAUDE.md                    # Development guidelines
└── apps/
    ├── README.md                # Multi-framework details
    └── VITE-REMOTES.md          # Vite-specific docs
```

## 🎯 Module Federation Configuration

### Rsbuild Remote (Manifest-Based)

```typescript
// apps/react-remote/rsbuild.config.ts
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'reactRemote',
          exposes: {
            './Button': './src/components/Button.tsx',
          },
          shared: {
            react: { singleton: true, eager: true },
            'react-dom': { singleton: true, eager: true },
          },
        }),
      ],
    },
  },
  dev: {
    hmr: true,
    assetPrefix: 'http://localhost:3001',
  },
});
```

**Shell consumption:**
```typescript
remotes: {
  reactRemote: 'reactRemote@http://localhost:3001/mf-manifest.json'
}
```

### Vite Remote (Direct Entry)

```typescript
// apps/react-vite-remote/vite.config.ts
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'reactViteRemote',
      filename: 'remoteEntry.js',
      exposes: {
        './Card': './src/components/Card.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: {
    port: 3004,
    cors: true,
  },
});
```

**Shell consumption:**
```typescript
remotes: {
  reactViteRemote: 'reactViteRemote@http://localhost:3004/assets/remoteEntry.js'
}
```

## 🔄 Development Workflows

### 1. Full Stack Development
Start everything with one command:
```bash
./start-all.sh
# Opens: http://localhost:3000 (shell with all 6 remotes)
```

### 2. Standalone Development
Develop a remote independently:
```bash
cd apps/react-vite-remote
pnpm dev
# Opens: http://localhost:3004 (standalone mode)
```

### 3. Selective Development
Start only what you need:
```bash
# Start just Vite remotes
cd apps/react-vite-remote && pnpm dev &
cd apps/vue-vite-remote && pnpm dev &
cd apps/svelte-vite-remote && pnpm dev &

# Then start shell
cd apps/shell && pnpm dev
```

### 4. Manual Start (All Applications)
```bash
# Terminal 1-3: Rsbuild remotes
cd apps/react-remote && pnpm dev      # http://localhost:3001
cd apps/vue-remote && pnpm dev        # http://localhost:3002
cd apps/svelte-remote && pnpm dev     # http://localhost:3003

# Terminal 4-6: Vite remotes
cd apps/react-vite-remote && pnpm dev    # http://localhost:3004
cd apps/vue-vite-remote && pnpm dev      # http://localhost:3005
cd apps/svelte-vite-remote && pnpm dev   # http://localhost:3006

# Terminal 7: Shell
cd apps/shell && pnpm dev             # http://localhost:3000
```

## 🏗️ Building for Production

```bash
# Build all Rsbuild apps
cd apps/shell && pnpm build
cd apps/react-remote && pnpm build
cd apps/vue-remote && pnpm build
cd apps/svelte-remote && pnpm build

# Build all Vite apps
cd apps/react-vite-remote && pnpm build
cd apps/vue-vite-remote && pnpm build
cd apps/svelte-vite-remote && pnpm build
```

Build outputs are in each app's `dist/` directory.

## 🛠️ Technology Stack

### Build Tools
- **Rsbuild**: 1.7.5 (Rspack-based)
- **Vite**: 5.4.11 (Rollup-based)

### Frameworks
- **React**: 18.3.1 (shell + 2 remotes)
- **Vue**: 3.4.0 (2 remotes)
- **Svelte**: 4.2.0 (2 remotes)

### Module Federation
- **@module-federation/enhanced**: 0.8.0 (Rsbuild)
- **@originjs/vite-plugin-federation**: 1.4.1 (Vite)

### Language & Tools
- **TypeScript**: 5.7.2
- **Package Manager**: pnpm 10.27.0

## 🔍 Architecture Deep Dive

### How It Works

1. **Shell App** (Host) runs on port 3000 and defines remote entry points
2. **Remote Apps** expose components via Module Federation configuration
3. At **runtime**, the shell dynamically loads remote components
4. **Shared dependencies** (React, React-DOM) are deduplicated as singletons
5. Each remote can be **deployed independently** to different domains

### Manifest vs Direct Entry

**Rsbuild (Manifest)**
- Generates `mf-manifest.json` with metadata
- More flexible for dynamic remote loading
- Better for production deployments

**Vite (Direct Entry)**
- Uses `remoteEntry.js` directly
- Simpler configuration
- Faster for development

Both approaches are **100% compatible** and can be mixed in the same shell.

## 🐛 Troubleshooting

### Port Already in Use
```bash
# The start script automatically kills processes
# Or manually:
lsof -ti:3000 | xargs kill -9
```

### Remote Not Loading
1. ✅ Check if the remote dev server is running
2. ✅ Check browser console for CORS errors
3. ✅ Verify remote entry URL is accessible: `curl http://localhost:3001/mf-manifest.json`
4. ✅ Check Network tab for failed script loads

### TypeScript Errors
The shell includes type declarations in `apps/shell/src/remotes.d.ts`. Add new remotes there:
```typescript
declare module 'newRemote/Component' {
  const Component: React.ComponentType;
  export default Component;
}
```

### HMR Not Working
- Ensure `dev.hmr: true` in rsbuild.config.ts
- Check that `dev.assetPrefix` points to the correct remote URL
- Verify CORS is enabled for Vite remotes (`cors: true`)

## 📚 Additional Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Complete project guidelines and architecture
- **[apps/README.md](./apps/README.md)** - Multi-framework setup details
- **[apps/VITE-REMOTES.md](./apps/VITE-REMOTES.md)** - Vite-specific documentation

## 🎓 Why This Example Matters

This project proves that **Module Federation 2.0 is truly build-tool agnostic**. You can:

✅ **Migrate Incrementally** - Move from Webpack to Vite/Rsbuild one app at a time  
✅ **Team Autonomy** - Let different teams choose their preferred tools  
✅ **Share Across Boundaries** - Share components across organizational silos  
✅ **Technology Diversity** - Mix React, Vue, Svelte in one architecture  
✅ **Future-Proof** - Not locked into any single build tool or framework

The shell **doesn't care** whether a remote was built with Rsbuild, Vite, Webpack, or anything else—it just loads and renders the component at runtime.

## 🚀 Next Steps

- [ ] Explore production builds and deployment strategies
- [ ] Add your own remote application
- [ ] Experiment with shared dependencies and versioning
- [ ] Deploy remotes to different domains (CDN, cloud)
- [ ] Add more frameworks (Angular, Solid, Qwik, etc.)
- [ ] Implement authentication and authorization patterns
- [ ] Set up CI/CD for independent deployments

## 📄 License

MIT

---

**Built with Module Federation 2.0** 🚀  
*Demonstrating the future of micro-frontends*

# Hot Module Replacement (HMR) Guide

This guide explains how HMR works in this Module Federation example across different build tools.

## 🔥 How HMR Works

### Standalone Mode
When you run a remote application standalone (e.g., `http://localhost:3004`), HMR works perfectly:
- Edit a component file
- Changes appear instantly
- State is preserved
- No page reload

### Federated Mode (Shell + Remotes)
When remotes are consumed by the shell, HMR behavior differs:

#### ✅ **Rsbuild Remotes** (Ports 3001-3003)
- **Full HMR support** with proper configuration
- Shell detects remote changes automatically
- `assetPrefix` enables hot reload across apps
- Manifest-based loading supports dynamic updates

#### ❌ **Vite Remotes** (Ports 3004-3006)
- **CRITICAL**: `@originjs/vite-plugin-federation` **does NOT work in dev mode**
- Vite remotes must be **built first** before they can be consumed
- The plugin only generates `remoteEntry.js` during the **build step**
- Development workflow: Build → Preview (no HMR in federated mode)
- **Standalone mode still has full HMR** when not using Module Federation
- Reason: The plugin architecture requires a build step to generate federation metadata

## 🔧 Configuration

### Rsbuild Remotes (Full HMR)

```typescript
// apps/react-remote/rsbuild.config.ts
export default defineConfig({
  server: {
    port: 3001,
  },
  dev: {
    hmr: true,  // Enable HMR
    assetPrefix: 'http://localhost:3001',  // Critical for cross-app HMR
  },
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
});
```

**Key settings:**
- `dev.hmr: true` - Enables HMR
- `dev.assetPrefix` - Tells the shell where to fetch hot updates
- `eager: true` - Loads shared deps immediately

### Vite Remotes (Standalone HMR)

```typescript
// apps/react-vite-remote/vite.config.ts
export default defineConfig({
  plugins: [
    react({ fastRefresh: true }),  // React Fast Refresh
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
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3004,
    },
  },
});
```

**Key settings:**
- `fastRefresh: true` - React Fast Refresh for instant updates
- `hmr` object - WebSocket config for HMR
- `cors: true` - Allows shell to connect to remote

## 📋 HMR Behavior Matrix

| Scenario | Rsbuild Remote | Vite Remote | Notes |
|----------|---------------|-------------|-------|
| **Standalone Dev** | ✅ Full HMR | ✅ Full HMR | Both work perfectly |
| **Federated Dev Mode** | ✅ Full HMR | ❌ Not Supported | Vite requires build |
| **Federated Preview** | ✅ Full HMR | ⚠️ Build Required | Run preview after build |
| **State Preservation** | ✅ Yes | ✅ Yes (standalone) | React Fast Refresh |
| **CSS Updates** | ✅ Instant | ✅ Instant (standalone) | Vite needs rebuild in federation |

## 🎯 Development Workflows

### Workflow 1: Standalone Development (ONLY option for Vite HMR)
**Required for Vite remotes** - federation doesn't work in dev mode:

```bash
# 1. Start the Vite remote standalone (NOT federated)
cd apps/react-vite-remote
pnpm dev

# 2. Visit http://localhost:3004
# 3. Edit components - see instant HMR updates
# 4. When ready to test federation:
#    - Stop dev server (Ctrl+C)
#    - Build: pnpm build
#    - Preview: pnpm preview
#    - Start shell to consume the built remote
```

**Pros:**
- ✅ Full HMR support (standalone only)
- ✅ Fast iteration
- ✅ State preservation

**Cons:**
- ❌ Cannot be consumed by shell in dev mode
- ❌ Must rebuild to test federation
- ❌ No HMR in federated mode

### Workflow 2: Integrated Development (Rsbuild Only)
Best for Rsbuild remotes and integration testing:

```bash
# 1. Start all apps (builds Vite remotes automatically)
./start-all.sh

# 2. Visit http://localhost:3000 (shell)
# 3. Edit Rsbuild remote components - shell updates automatically ✅
# 4. To update Vite remotes:
#    - Stop all (Ctrl+C)
#    - Edit Vite component
#    - Re-run ./start-all.sh (rebuilds Vite remotes)
```

**Pros:**
- ✅ Full HMR for Rsbuild remotes
- ✅ See Rsbuild integration immediately
- ✅ Vite remotes work after build

**Cons:**
- ❌ Vite remotes have NO HMR
- ❌ Must restart script to rebuild Vite

### Workflow 3: Selective Testing
Start only what you need:

```bash
# Terminal 1: Remote you're working on
cd apps/react-vite-remote && pnpm dev

# Terminal 2: Shell (for testing integration)
cd apps/shell && pnpm dev

# Edit the remote - refresh shell when needed
```

## 🔄 When Does HMR Work?

### ✅ Automatic HMR (No Refresh Needed)

**Rsbuild Remotes in Shell:**
1. Edit `apps/react-remote/src/components/Button.tsx`
2. Save the file
3. Shell automatically reflects changes
4. Component state may be preserved

**Any Remote Standalone:**
1. Edit component file
2. Save the file
3. Instant update in browser
4. State preserved with Fast Refresh

### 🔄 Manual Refresh Needed

**Vite Remotes in Shell:**
1. Edit `apps/react-vite-remote/src/components/Card.tsx`
2. Save the file
3. **Press Cmd+R (Mac) or Ctrl+R (Windows)** in shell tab
4. Changes now visible

**Why?** The Module Federation runtime caches the remote entry file. Vite's HMR doesn't notify the shell about federated module updates.

## 🐛 Troubleshooting HMR

### HMR Not Working in Standalone Mode

**Rsbuild:**
```bash
# Check if HMR is enabled
grep -A 3 "dev:" apps/react-remote/rsbuild.config.ts
# Should show: hmr: true
```

**Vite:**
```bash
# Check HMR configuration
grep -A 8 "server:" apps/react-vite-remote/vite.config.ts
# Should show HMR websocket config
```

### HMR Not Working in Shell

**For Rsbuild remotes:**
1. ✅ Check `dev.assetPrefix` is set in remote config
2. ✅ Verify remote dev server is running
3. ✅ Check browser console for errors
4. ✅ Verify shell is configured correctly

**For Vite remotes:**
1. ✅ This is expected behavior - refresh manually
2. ✅ Consider using standalone mode for development
3. ✅ Test integration periodically with refresh

### WebSocket Connection Errors

Check browser console for errors like:
```
WebSocket connection to 'ws://localhost:3004/' failed
```

**Fix:**
1. Ensure remote is running on the correct port
2. Check firewall settings
3. Verify `server.cors: true` in Vite config
4. Try clearing browser cache

## 💡 Best Practices

### 1. Choose the Right Workflow
- **Rapid iteration**: Use standalone mode (especially for Vite)
- **Integration testing**: Use shell with Rsbuild remotes
- **Final testing**: Start all apps and test manually

### 2. Optimize for Your Build Tool
- **Rsbuild**: Set `assetPrefix` and `hmr: true`
- **Vite**: Use standalone mode for development
- **Both**: Enable Fast Refresh for React

### 3. Manage Expectations
- **Rsbuild HMR**: Works across federated apps
- **Vite HMR**: Best in standalone, manual refresh in shell
- **State**: May reset during HMR (by design)

### 4. Development Server Management
```bash
# Start only what you're working on
cd apps/react-vite-remote && pnpm dev  # Work here

# Start shell when you need to test integration
cd apps/shell && pnpm dev

# Refresh shell after changes
```

## 🚀 Advanced: Custom HMR Setup

### Future Enhancement: Live Reload Bridge
For production-grade HMR across Vite remotes, consider:

1. **Vite Plugin for MF HMR**
2. **WebSocket Bridge** between shell and Vite remotes
3. **Broadcast Channel API** for cross-tab communication
4. **Service Worker** for intelligent cache invalidation

Example concept:
```typescript
// Custom Vite plugin (future enhancement)
function mfHmrPlugin() {
  return {
    name: 'mf-hmr-bridge',
    handleHotUpdate({ file, server }) {
      // Notify shell about federated module updates
      server.ws.send({
        type: 'custom',
        event: 'mf-update',
        data: { file }
      });
    }
  };
}
```

## 📚 Related Documentation

- [Vite HMR API](https://vitejs.dev/guide/api-hmr.html)
- [Module Federation Docs](https://module-federation.io/)
- [React Fast Refresh](https://react.dev/learn/react-compiler#what-does-the-compiler-do)

## 🎓 Summary

| Build Tool | Standalone HMR | Federated HMR | Recommendation |
|------------|---------------|---------------|----------------|
| Rsbuild | ✅ Excellent | ✅ Excellent | **Recommended for Module Federation** |
| Vite | ✅ Excellent | ❌ Not Supported | **Use standalone only** - build for federation |

**Key Takeaway:** 
- **Rsbuild** is the clear winner for Module Federation with full HMR support in both standalone and federated modes
- **Vite** with `@originjs/vite-plugin-federation` has a **fundamental limitation**: it cannot serve federated modules in dev mode
- For production-grade micro-frontends with HMR, **use Rsbuild/Webpack**, not Vite
- Use Vite for standalone apps or when you're willing to build before testing federation

---

**Pro Tip:** When developing Vite remotes, keep standalone mode open in one tab and the shell in another. Work in standalone, refresh shell when you want to test integration. This gives you the best of both worlds! 🚀

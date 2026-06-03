# Vite + Rsbuild Module Federation Compatibility Guide

## Issue
Vite remotes were not working with the Rsbuild shell due to version mismatches and configuration incompatibilities.

## Root Causes

### 1. Version Mismatch
- **Rsbuild apps (shell + remotes)**: Used `@module-federation/enhanced` v0.8.0
- **Vite remotes**: Used `@module-federation/vite` v1.0.8
- These versions were incompatible with each other

### 2. Remote Entry Configuration
- The shell was trying to load Vite remotes using `mf-manifest.json` format
- While Vite remotes generate manifests, direct `remoteEntry.js` loading is more reliable for cross-build-tool scenarios

## Solution

### Step 1: Update Package Versions
Updated all Module Federation packages to latest compatible versions:

```bash
# Update Rsbuild apps to Module Federation 2.5.0
pnpm add -D @module-federation/enhanced@^2.5.0 --filter shell --filter react-remote --filter vue-remote --filter svelte-remote

# Update Vite remotes to latest version
pnpm add -D @module-federation/vite@^1.16.2 --filter react-vite-remote --filter vue-vite-remote --filter svelte-vite-remote
```

### Step 2: Update Shell Configuration
Changed the shell's `rsbuild.config.ts` to load Vite remotes using direct `remoteEntry.js` instead of `mf-manifest.json`:

```typescript
// Before (not working)
reactViteRemote: 'reactViteRemote@http://localhost:3004/mf-manifest.json',

// After (working)
reactViteRemote: 'reactViteRemote@http://localhost:3004/remoteEntry.js',
```

## Current Configuration

### Shell (apps/shell/rsbuild.config.ts)
- Uses `@module-federation/enhanced` v2.5.0
- Loads Rsbuild remotes via `mf-manifest.json`
- Loads Vite remotes via direct `remoteEntry.js`

### Rsbuild Remotes
- React Remote (port 3001): `@module-federation/enhanced` v2.5.0
- Vue Remote (port 3002): `@module-federation/enhanced` v2.5.0
- Svelte Remote (port 3003): `@module-federation/enhanced` v2.5.0

### Vite Remotes
- React Vite Remote (port 3004): `@module-federation/vite` v1.16.2
- Vue Vite Remote (port 3005): `@module-federation/vite` v1.16.2
- Svelte Vite Remote (port 3006): `@module-federation/vite` v1.16.2

## Testing

To verify the fix works:

1. Start all remotes and shell:
```bash
./start-all.sh
```

2. Open http://localhost:3000 in your browser

3. Verify that both Rsbuild and Vite remote components render correctly

## Key Takeaways

1. **Version alignment is critical**: Module Federation implementations must use compatible versions
2. **Cross-build-tool support**: Use direct `remoteEntry.js` for better compatibility between different build tools
3. **Rsbuild ↔ Rsbuild**: Can use `mf-manifest.json` (same build tool)
4. **Rsbuild ↔ Vite**: Use `remoteEntry.js` (different build tools)

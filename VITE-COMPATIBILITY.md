# Vite + Module Federation Compatibility

## ⚠️ Critical Finding: Incompatible Implementations

After extensive testing, we've discovered that **`@originjs/vite-plugin-federation` is NOT compatible with `@module-federation/enhanced`** (used by Rsbuild/Webpack 5).

### The Problem

```
Error: remoteEntryExports is undefined
```

This error occurs because the two plugins implement Module Federation using **different formats and runtime APIs**.

## 🔍 Technical Details

### @originjs/vite-plugin-federation (Vite)
- **Format**: ESM-based module loading
- **Runtime**: Custom Vite-specific federation runtime
- **Entry**: Generates ESM `remoteEntry.js`
- **Protocol**: Custom implementation inspired by Webpack MF but not compatible

### @module-federation/enhanced (Rsbuild/Webpack 5)
- **Format**: Global variable exposure with specific API
- **Runtime**: Official Module Federation 2.0 runtime
- **Entry**: Generates `mf-manifest.json` or compatible `remoteEntry.js`
- **Protocol**: Official Webpack Module Federation specification

### Why They're Incompatible

1. **Different module formats**: Vite uses ESM, Webpack expects UMD/Global
2. **Different APIs**: The exposed module structures don't match
3. **Different runtimes**: Each expects its own federation runtime
4. **No interoperability layer**: There's no bridge between the two implementations

## 📊 What Works vs What Doesn't

| Scenario | Status | Notes |
|----------|--------|-------|
| **Vite remote → Vite host** | ✅ Works | Both use `@originjs/vite-plugin-federation` |
| **Webpack remote → Webpack host** | ✅ Works | Official MF 2.0 |
| **Rsbuild remote → Rsbuild host** | ✅ Works | Uses `@module-federation/enhanced` |
| **Vite remote → Rsbuild host** | ❌ **Fails** | **Incompatible** |
| **Rsbuild remote → Vite host** | ❌ **Fails** | **Incompatible** |
| **Vite standalone** | ✅ Works | No federation, just regular app |

## 🎯 This Project's Approach

### What We Implemented

1. **Rsbuild Remotes** (ports 3001-3003)
   - ✅ React, Vue, Svelte remotes using Rsbuild
   - ✅ Consumed by Rsbuild shell successfully
   - ✅ Full HMR support
   - ✅ Multi-framework federation working

2. **Vite Remotes** (ports 3004-3006)
   - ✅ React, Vue, Svelte remotes using Vite
   - ✅ Work perfectly in **standalone mode**
   - ❌ **Cannot** be consumed by Rsbuild shell
   - ✅ Demonstrate Vite build capabilities
   - ❌ Not part of federated setup

### Why We Kept Vite Remotes

Even though they can't federate with Rsbuild, they're valuable for:

1. **Educational purposes**: Show the limitations
2. **Standalone apps**: They work perfectly on their own
3. **Future compatibility**: If a bridge is created
4. **Comparison**: Compare Vite vs Rsbuild for remote development

## 🚀 Alternative Solutions

### Option 1: Use Native Module Federation (Recommended)

Use `@module-federation/enhanced` or `@module-federation/runtime` with Vite instead of `@originjs/vite-plugin-federation`:

**NOT CURRENTLY IMPLEMENTED** - Would require:
- Using `@module-federation/vite` (if it exists)
- Or using Rollup with official MF plugin
- Or using Rspack/Rsbuild instead of Vite

### Option 2: All-Vite Micro-Frontends

Create a separate shell using Vite + `@originjs/vite-plugin-federation`:

```bash
apps/
├── vite-shell/              # Vite-based shell
├── react-vite-remote/       # ✅ Can be consumed
├── vue-vite-remote/         # ✅ Can be consumed
└── svelte-vite-remote/      # ✅ Can be consumed
```

This would work but requires a **completely separate ecosystem**.

### Option 3: Use Rsbuild for Everything (Current Approach)

Stick with Rsbuild for all remotes that need federation:

```bash
apps/
├── shell/                   # Rsbuild shell
├── react-remote/            # ✅ Rsbuild remote
├── vue-remote/              # ✅ Rsbuild remote
├── svelte-remote/           # ✅ Rsbuild remote
└── [vite-remotes]/          # Standalone examples only
```

**This is what we're doing** - and it works great!

## 📚 Lessons Learned

### 1. Module Federation Fragmentation
The Module Federation ecosystem is **fragmented**:
- Official Webpack MF (v1)
- Module Federation 2.0 (`@module-federation/enhanced`)
- Vite's community plugin (`@originjs/vite-plugin-federation`)
- These are **not cross-compatible**

### 2. "Module Federation" ≠ Universal
Just because two tools claim "Module Federation" support doesn't mean they can federate with each other. Always check compatibility.

### 3. Rsbuild/Rspack is Better for MF
For production micro-frontends:
- **Rsbuild**: Full compatibility, better HMR, official support
- **Vite**: Fast for standalone apps, limited MF support

### 4. Vite Plugin Limitations
`@originjs/vite-plugin-federation`:
- ❌ No dev mode support (requires build)
- ❌ Not compatible with official MF implementations
- ❌ Different API surface
- ✅ Works for all-Vite setups

## 🔧 How to Use This Project

### To See Rsbuild Federation (Working)

```bash
# Start Rsbuild remotes + shell
cd apps/react-remote && pnpm dev    # Port 3001
cd apps/vue-remote && pnpm dev      # Port 3002
cd apps/svelte-remote && pnpm dev   # Port 3003
cd apps/shell && pnpm dev           # Port 3000

# Visit http://localhost:3000
# ✅ All three Rsbuild remotes are federated and working!
```

### To See Vite Apps (Standalone)

```bash
# Start Vite remotes standalone
cd apps/react-vite-remote && pnpm dev    # Port 3004
cd apps/vue-vite-remote && pnpm dev      # Port 3005
cd apps/svelte-vite-remote && pnpm dev   # Port 3006

# Visit each individually:
# ✅ http://localhost:3004 - React Vite app
# ✅ http://localhost:3005 - Vue Vite app  
# ✅ http://localhost:3006 - Svelte Vite app
```

## 🎓 Recommendations

### For New Projects

**If you want Module Federation:**
- ✅ Use **Rsbuild** or **Rspack** with `@module-federation/enhanced`
- ✅ Use **Webpack 5** with official Module Federation 2.0
- ❌ Avoid `@originjs/vite-plugin-federation` for cross-team federation

**If you want Vite:**
- ✅ Use Vite for standalone applications
- ✅ Use Vite for all-Vite micro-frontends (same plugin across all apps)
- ❌ Don't try to mix Vite and Webpack/Rsbuild for federation

### For This Project

We've chosen to:
1. **Focus on Rsbuild** for the federated multi-framework example
2. **Keep Vite remotes** as educational standalone examples
3. **Document the incompatibility** clearly for others
4. **Demonstrate what actually works** in production

## 🔮 Future Possibilities

### If Official Vite MF Support Arrives

The Module Federation team is working on broader support. If `@module-federation/vite` becomes available with official compatibility:

1. Replace `@originjs/vite-plugin-federation`
2. Update Vite remote configurations
3. Enable Vite remotes in the shell
4. Enjoy true cross-build-tool federation!

### Bridge/Adapter Layer

A theoretical bridge could:
1. Translate Vite's ESM format to Webpack's expected format
2. Provide runtime adapters
3. Handle different loading mechanisms

**Status**: Does not exist yet

## 📖 Related Documentation

- [Module Federation Official Docs](https://module-federation.io/)
- [Rsbuild Module Federation](https://rsbuild.dev/guide/advanced/module-federation)
- [@originjs/vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)
- [Module Federation 2.0 RFC](https://github.com/module-federation/universe/discussions)

## 💡 Key Takeaway

**Module Federation is not yet truly "universal"** across build tools. For production micro-frontends with Module Federation, standardize on one build tool family (Webpack/Rspack/Rsbuild) across all remotes and shells.

This project successfully demonstrates:
- ✅ **Multi-framework** Module Federation (React + Vue + Svelte)
- ✅ **Full HMR** in development
- ✅ **Production-ready** Rsbuild-based federation
- ⚠️ **Limitations** of cross-tool federation

---

**Bottom Line**: Use Rsbuild/Rspack for all apps in your Module Federation setup. Save Vite for standalone apps or all-Vite micro-frontend ecosystems.

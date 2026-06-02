# Module Federation 2.0 Example

A comprehensive example showcasing Module Federation 2.0 with multiple frameworks (React, Vue, Svelte) working together in a micro-frontend architecture.

## 🚀 Features

- **Multi-Framework Support**: React, Vue, and Svelte components working seamlessly together
- **Module Federation 2.0**: Latest version with enhanced features and performance
- **Independent Deployment**: Each micro-frontend can be developed and deployed independently
- **Type Safety**: Full TypeScript support across all applications
- **Multiple Build Tools**: Examples using Rsbuild and Modern.js

## 📁 Project Structure

```
apps/
├── shell/           # Main React shell app that orchestrates all remotes (port 3000)
├── react-remote/    # React component library (port 3001)
├── vue-remote/      # Vue component library (port 3002)
├── svelte-remote/   # Svelte component library (port 3003)
├── rsbuild/         # Rsbuild implementation example
└── js/              # Modern.js implementation example
```

## 🏃 Quick Start

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start all applications**
   ```bash
   # Use the starter script (easiest)
   ./start-all.sh
   ```
   
   Or manually in 4 separate terminals:
   ```bash
   cd apps/react-remote && pnpm dev
   cd apps/vue-remote && pnpm dev
   cd apps/svelte-remote && pnpm dev
   cd apps/shell && pnpm dev
   ```

3. **Open your browser**
   - Shell: http://localhost:3000 (main application)
   - React Remote: http://localhost:3001 (standalone)
   - Vue Remote: http://localhost:3002 (standalone)
   - Svelte Remote: http://localhost:3003 (standalone)

## 📚 Documentation

- See [CLAUDE.md](./CLAUDE.md) for development guidelines
- See [apps/README.md](./apps/README.md) for detailed multi-framework setup documentation

## 🛠️ Technology Stack

- **Module Federation**: @module-federation/enhanced 0.8.0
- **Build Tools**: Rsbuild 1.7.5, Modern.js
- **Frameworks**: React 18.3.1, Vue 3.4.0, Svelte 4.2.0
- **Language**: TypeScript 5.0+
- **Package Manager**: pnpm 10.27.0

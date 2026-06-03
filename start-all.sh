#!/bin/bash

# Module Federation Complete Starter Script
# This script starts all applications: Rsbuild remotes, Vite remotes, and shell

echo "🚀 Starting Module Federation Complete Example"
echo ""

# Kill any existing processes on all ports
echo "🧹 Cleaning up existing processes..."
for port in 3000 3001 3002 3003 3004 3005 3006; do
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
done

sleep 1

echo ""
echo "📦 Starting Rsbuild Remotes..."
echo "   Starting React Remote (port 3001)..."
(cd apps/react-remote && pnpm dev > /dev/null 2>&1) &
REACT_PID=$!

echo "   Starting Vue Remote (port 3002)..."
(cd apps/vue-remote && pnpm dev > /dev/null 2>&1) &
VUE_PID=$!

echo "   Starting Svelte Remote (port 3003)..."
(cd apps/svelte-remote && pnpm dev > /dev/null 2>&1) &
SVELTE_PID=$!

echo ""
echo "⚡ Building and Starting Vite Remotes (Preview Mode)..."
echo "   Note: Using @module-federation/vite (official plugin)"
echo "   Vite remotes must be built to generate federation manifest"
echo ""

# Build all Vite remotes
echo "   Building React Vite Remote..."
(cd apps/react-vite-remote && pnpm build > /dev/null 2>&1)
echo "   Building Vue Vite Remote..."
(cd apps/vue-vite-remote && pnpm build > /dev/null 2>&1)
echo "   Building Svelte Vite Remote..."
(cd apps/svelte-vite-remote && pnpm build > /dev/null 2>&1)

echo ""
echo "   Starting React Vite Remote preview (port 3004)..."
(cd apps/react-vite-remote && pnpm preview > /dev/null 2>&1) &
REACT_VITE_PID=$!

echo "   Starting Vue Vite Remote preview (port 3005)..."
(cd apps/vue-vite-remote && pnpm preview > /dev/null 2>&1) &
VUE_VITE_PID=$!

echo "   Starting Svelte Vite Remote preview (port 3006)..."
(cd apps/svelte-vite-remote && pnpm preview > /dev/null 2>&1) &
SVELTE_VITE_PID=$!

echo ""
echo "🏠 Starting Shell App (port 3000)..."
(cd apps/shell && pnpm dev > /dev/null 2>&1) &
SHELL_PID=$!

echo ""
echo "⏳ Waiting for all servers to start..."
sleep 10

echo ""
echo "✅ All servers started!"
echo ""
echo "📍 URLs:"
echo ""
echo "   🏠 Shell:                http://localhost:3000"
echo ""
echo "   🔧 Rsbuild Remotes:"
echo "      React Remote:         http://localhost:3001"
echo "      Vue Remote:           http://localhost:3002"
echo "      Svelte Remote:        http://localhost:3003"
echo ""
echo "   ⚡ Vite Remotes (Preview Mode - Federated!):"
echo "      React Vite Remote:    http://localhost:3004"
echo "      Vue Vite Remote:      http://localhost:3005"
echo "      Svelte Vite Remote:   http://localhost:3006"
echo ""
echo "💡 Open http://localhost:3000 to see ALL 6 remotes federated together!"
echo ""
echo "✅ Shell successfully consumes:"
echo "   - 3 Rsbuild remotes (dev mode with HMR)"
echo "   - 3 Vite remotes (preview mode after build)"
echo ""
echo "🎉 True cross-build-tool Module Federation achieved!"
echo ""
echo "💡 Edit Rsbuild components - see instant HMR"
echo "💡 Edit Vite components - restart script to rebuild"
echo ""
echo "📖 See MIGRATION-TO-OFFICIAL-VITE-PLUGIN.md for details"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all servers..."
    kill $REACT_PID $VUE_PID $SVELTE_PID $SHELL_PID $REACT_VITE_PID $VUE_VITE_PID $SVELTE_VITE_PID 2>/dev/null
    for port in 3000 3001 3002 3003 3004 3005 3006; do
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    done
    echo "✅ All servers stopped"
    exit 0
}

trap cleanup INT TERM

# Wait for all background processes
wait

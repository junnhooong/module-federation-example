#!/bin/bash

# Module Federation Multi-Framework Starter Script
# This script starts all four applications for the multi-framework example

echo "🚀 Starting Module Federation Multi-Framework Example"
echo ""

# Kill any existing processes on the ports
echo "🧹 Cleaning up existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
lsof -ti:3002 | xargs kill -9 2>/dev/null || true
lsof -ti:3003 | xargs kill -9 2>/dev/null || true

sleep 1

echo ""
echo "📦 Starting React Remote (port 3001)..."
cd apps/react-remote && pnpm dev > /dev/null 2>&1 &
REACT_PID=$!

echo "📦 Starting Vue Remote (port 3002)..."
cd ../vue-remote && pnpm dev > /dev/null 2>&1 &
VUE_PID=$!

echo "📦 Starting Svelte Remote (port 3003)..."
cd ../svelte-remote && pnpm dev > /dev/null 2>&1 &
SVELTE_PID=$!

echo "📦 Starting Shell App (port 3000)..."
cd ../shell && pnpm dev > /dev/null 2>&1 &
SHELL_PID=$!

echo ""
echo "⏳ Waiting for servers to start..."
sleep 8

echo ""
echo "✅ All servers started!"
echo ""
echo "📍 URLs:"
echo "   Shell:          http://localhost:3000"
echo "   React Remote:   http://localhost:3001"
echo "   Vue Remote:     http://localhost:3002"
echo "   Svelte Remote:  http://localhost:3003"
echo ""
echo "💡 Press Ctrl+C to stop all servers"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all servers..."
    kill $REACT_PID $VUE_PID $SVELTE_PID $SHELL_PID 2>/dev/null
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    lsof -ti:3001 | xargs kill -9 2>/dev/null || true
    lsof -ti:3002 | xargs kill -9 2>/dev/null || true
    lsof -ti:3003 | xargs kill -9 2>/dev/null || true
    echo "✅ All servers stopped"
    exit 0
}

trap cleanup INT TERM

# Wait for all background processes
wait

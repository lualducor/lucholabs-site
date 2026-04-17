#!/usr/bin/env bash
set -e

echo "→ TypeScript check..."
npx tsc -b

echo "→ Vite client build..."
npx vite build

echo "→ Vite SSR build..."
npx vite build --ssr src/entry-server.tsx --outDir dist-ssr

echo "→ SSR prerender injection..."
node scripts/prerender.mjs

echo "✓ Build complete"

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'

// In SSR builds, CSS imports cause PostCSS to choke on `@import "tailwindcss"`.
// Stub them all out — the SSR bundle only needs the JS rendering logic.
function stubCssInSsr(): Plugin {
  return {
    name: 'stub-css-in-ssr',
    resolveId(id) {
      if (id.endsWith('.css')) return id
    },
    load(id) {
      if (id.endsWith('.css')) return ''
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    ...(isSsrBuild ? [stubCssInSsr()] : [tailwindcss()]),
  ],
  ssr: {
    noExternal: [],
  },
}))

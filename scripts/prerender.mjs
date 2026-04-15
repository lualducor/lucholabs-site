/**
 * Post-build pre-render script.
 * Renders App to HTML string and injects it into dist/index.html
 * so crawlers see full content without executing JavaScript.
 *
 * Run via: node scripts/prerender.mjs
 */
import { readFileSync, writeFileSync, rmSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

// Import the SSR bundle produced by `vite build --ssr`
const { render } = await import(resolve(ssrDir, 'entry-server.js'))

// Render app to HTML string
const appHtml = render()

// Read the built client HTML template
const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8')

// Inject rendered markup — replaces the empty root div
// Keep existing noscript tag intact (it follows the root div)
const result = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`
)

writeFileSync(resolve(distDir, 'index.html'), result)
console.log('✓ Pre-render complete — dist/index.html now contains full HTML')

// Clean up SSR build artefacts
rmSync(ssrDir, { recursive: true, force: true })
console.log('✓ Cleaned dist-ssr/')

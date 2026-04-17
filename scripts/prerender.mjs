/**
 * Post-build pre-render script.
 * Renders SSR HTML for every static route and injects per-route metadata so
 * crawlers and social unfurlers receive the final document without JS.
 *
 * Run via: node scripts/prerender.mjs
 */
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const SITE_URL = 'https://lucholabs.dev'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')
const postsIndexPath = resolve(root, 'src/lib/blog/posts.generated.json')

const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8')
const posts = JSON.parse(readFileSync(postsIndexPath, 'utf-8'))
  .filter(post => !post.frontmatter.draft)
const tags = [...new Set(posts.flatMap(post => post.frontmatter.tags ?? []))].sort()

const { render } = await import(resolve(ssrDir, 'entry-server.js'))

const homeMeta = {
  title: 'Luis Alberto Duarte Cortés — AI Systems & Automation Engineer | lucholabs.dev',
  description: 'I build AI-powered systems and automation infrastructure. Bogotá · Remote · C1 English.',
  canonical: `${SITE_URL}/`,
  ogImage: DEFAULT_OG_IMAGE,
  ogType: 'website',
}

const blogIndexMeta = {
  title: 'Blog — LuchoLabs',
  description: 'Build logs, automation deep-dives, and AI experiments by Luis Alberto Duarte Cortés.',
  canonical: `${SITE_URL}/blog`,
  ogImage: DEFAULT_OG_IMAGE,
  ogType: 'website',
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => (
    {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[character]
  ))
}

function injectMetadata(html, meta) {
  return html
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    )
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace(
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
    )
    .replace(
      /<meta property="og:type" content="[^"]*" \/>/,
      `<meta property="og:type" content="${escapeHtml(meta.ogType)}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*" \/>/,
      `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />`,
    )
    .replace(
      /<meta name="twitter:url" content="[^"]*" \/>/,
      `<meta name="twitter:url" content="${escapeHtml(meta.canonical)}" />`,
    )
}

function injectAppHtml(html, appHtml) {
  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

function renderRoute(url, outputPath, meta) {
  const appHtml = render(url)
  const withAppHtml = injectAppHtml(template, appHtml)
  const withMetadata = injectMetadata(withAppHtml, meta)

  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, withMetadata)
  console.log(`✓ Pre-rendered ${url} → ${outputPath}`)
}

renderRoute('/', resolve(distDir, 'index.html'), homeMeta)
renderRoute('/blog', resolve(distDir, 'blog', 'index.html'), blogIndexMeta)

for (const post of posts) {
  renderRoute(`/blog/${post.slug}`, resolve(distDir, 'blog', post.slug, 'index.html'), {
    title: `${post.frontmatter.title} — LuchoLabs`,
    description: post.frontmatter.description,
    canonical: `${SITE_URL}/blog/${post.slug}`,
    ogImage: post.frontmatter.ogImage
      ? `${SITE_URL}/blog/og/${post.frontmatter.ogImage}`
      : DEFAULT_OG_IMAGE,
    ogType: 'article',
  })
}

for (const tag of tags) {
  const encodedTag = encodeURIComponent(tag)
  renderRoute(`/blog/tag/${encodedTag}`, join(distDir, 'blog', 'tag', encodedTag, 'index.html'), {
    title: `#${tag} — LuchoLabs Blog`,
    description: `Posts tagged ${tag} on LuchoLabs.`,
    canonical: `${SITE_URL}/blog/tag/${encodedTag}`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
  })
}

rmSync(ssrDir, { recursive: true, force: true })
console.log('✓ Cleaned dist-ssr/')

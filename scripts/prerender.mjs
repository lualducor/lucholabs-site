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
import contentJson from '../src/data/content.json' with { type: 'json' }

const SITE_URL = 'https://lucholabs.dev'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')
const postsIndexPath = resolve(root, 'src/lib/blog/posts.generated.json')

const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8')
const posts = JSON.parse(readFileSync(postsIndexPath, 'utf-8'))
  .filter(post => !post.frontmatter.draft)
const tags = [...new Set(posts.flatMap(post => post.frontmatter.tags ?? []))].sort()
const talks = contentJson.talks ?? []
const prerenderedRoutes = new Set([
  '/',
  '/blog',
  '/es/',
  '/es/blog',
  ...posts.map(post => `/blog/${post.slug}`),
  ...tags.map(tag => `/blog/tag/${encodeURIComponent(tag)}`),
  ...talks.flatMap(talk => [
    `/talks/${talk.slug}`,
    `/es/talks/${talk.slug}`,
  ]),
])

const { render, profilePageSchema } = await import(resolve(ssrDir, 'entry-server.js'))

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

// TODO(user): once THELAB ships, add /lab to sitemap and add a Vercel rewrite for /lab/:path*

function toAbsoluteUrl(url) {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return url.startsWith('/') ? `${SITE_URL}${url}` : `${SITE_URL}/${url}`
}

function toSectionUrl(section, slug) {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '')
  return `${SITE_URL}/${section}/${cleanSlug}`
}

function locationSchema(location) {
  const [addressLocality, addressCountry] = location
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)

  return {
    '@type': 'Place',
    name: location,
    address: {
      '@type': 'PostalAddress',
      ...(addressLocality ? { addressLocality } : {}),
      ...(addressCountry ? { addressCountry } : {}),
    },
  }
}

function personSchema(identity) {
  const sameAs = (contentJson.contact ?? [])
    .map(entry => entry.href)
    .filter(href => href.startsWith('https://'))

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: identity.name,
    url: SITE_URL,
    image: {
      '@type': 'ImageObject',
      url: toAbsoluteUrl(identity.photo),
      width: 192,
      height: 192,
      caption: identity.name,
    },
    jobTitle: 'AI Systems & Automation Engineer',
    description:
      'Freelance automation engineer building AI-powered systems and integration infrastructure. Based in Bogotá, available remote for US & European time zones.',
    sameAs,
  }
}

function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'LuchoLabs',
    url: SITE_URL,
    description:
      'Personal engineering site of Luis Alberto Duarte Cortés — automation, AI systems, and build logs.',
    author: { '@id': PERSON_ID },
  }
}

function articleSchema(post) {
  const url = toSectionUrl('blog', post.slug)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    headline: post.frontmatter.title,
    datePublished: post.frontmatter.date,
    description: post.frontmatter.description,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  }
}

function eventSchema(talk, url = toSectionUrl('talks', talk.slug)) {
  const description = talk.abstract?.[0] ?? talk.subtitle ?? ''

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${url}#event`,
    url,
    name: talk.title,
    startDate: talk.absoluteDate,
    description,
    image: talk.heroPhoto ? toAbsoluteUrl(talk.heroPhoto) : undefined,
    performer: { '@id': PERSON_ID },
    organizer: { '@id': PERSON_ID },
    location: locationSchema(talk.location),
  }
}

function faqSchema(faqs) {
  if (!faqs?.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: toAbsoluteUrl(crumb.url),
    })),
  }
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

function truncateTitle(title, max = 60) {
  const normalizedTitle = String(title).trim()
  if (normalizedTitle.length <= max) return normalizedTitle

  const slicedTitle = normalizedTitle.slice(0, max).trimEnd()
  const lastSpace = slicedTitle.lastIndexOf(' ')

  if (lastSpace > Math.floor(max * 0.6)) {
    return slicedTitle.slice(0, lastSpace).trimEnd()
  }

  return slicedTitle
}

function alternateLinks(canonical) {
  const canonicalPath = new URL(canonical).pathname
  const isSpanish = canonicalPath.startsWith('/es/')
  const englishPath = isSpanish
    ? canonicalPath.replace(/^\/es(?=\/)/, '')
    : canonicalPath
  const spanishPath = isSpanish
    ? canonicalPath
    : englishPath === '/' ? '/es/' : `/es${englishPath}`

  if (!prerenderedRoutes.has(englishPath) || !prerenderedRoutes.has(spanishPath)) {
    return ''
  }

  const englishUrl = `${SITE_URL}${englishPath}`
  const spanishUrl = `${SITE_URL}${spanishPath}`

  return [
    `    <link rel="alternate" hreflang="en" href="${escapeHtml(englishUrl)}" />`,
    `    <link rel="alternate" hreflang="es" href="${escapeHtml(spanishUrl)}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${escapeHtml(englishUrl)}" />`,
  ].join('\n')
}

function injectMetadata(html, meta) {
  const twitterTitle = truncateTitle(meta.title)
  const alternates = alternateLinks(meta.canonical)
  const htmlWithoutAlternates = html.replace(
    /[ \t]*<link\b(?=[^>]*\brel=["']alternate["'])(?=[^>]*\bhreflang=["'][^"']+["'])[^>]*\/?>[ \t]*(?:\r?\n)?/gi,
    '',
  )

  return htmlWithoutAlternates
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />${alternates ? `\n${alternates}` : ''}`,
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
      `<meta name="twitter:title" content="${escapeHtml(twitterTitle)}" />`,
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

function injectJsonLd(html, jsonLdObjects) {
  const scripts = (jsonLdObjects ?? [])
    .filter(object => object && typeof object === 'object' && Object.keys(object).length > 0)
    .map(object => (
      `    <script type="application/ld+json">${JSON.stringify(object).replace(/</g, '\\u003c')}</script>`
    ))

  if (scripts.length === 0) return html
  return html.replace('</head>', `${scripts.join('\n')}\n  </head>`)
}

function injectAppHtml(html, appHtml) {
  const preloadPattern = /<link rel="preload"[^>]*>/g
  const preloadLinks = appHtml.match(preloadPattern) ?? []
  const appMarkup = appHtml.replace(preloadPattern, '')
  const htmlWithPreloads = preloadLinks.length > 0
    ? html.replace('</head>', `    ${preloadLinks.join('\n    ')}\n  </head>`)
    : html

  return htmlWithPreloads.replace('<div id="root"></div>', `<div id="root">${appMarkup}</div>`)
}

const NOSCRIPT_EN = `    <noscript>
      <h1>Luis Alberto Duarte Cortés — AI Systems &amp; Automation Engineer</h1>
      <p>I build AI-powered systems and automation infrastructure. Bogotá · Remote · C1 English (IELTS 7.0).</p>
      <h2>Projects</h2>
      <ul>
        <li><strong>Boveda</strong> — Personal finance dashboard for Colombian bank accounts (Python, FastAPI, SQLite, React)</li>
        <li><strong>Anti-Phishing Shield</strong> — Open source phishing protection tool for elderly users</li>
        <li><strong>SUPERFARM</strong> — Open agricultural intelligence infrastructure for modular farm agents</li>
      </ul>
      <h2>Experience</h2>
      <ul>
        <li>Freelance Automation Engineer — Apr 2024–Present</li>
        <li>QA Tester, Funktronic Labs (Remote) — 2024</li>
      </ul>
      <h2>Contact</h2>
      <p>Email: lualducor@gmail.com | LinkedIn: linkedin.com/in/luis-alberto-duarte-cortes-97748171 | GitHub: github.com/lualducor</p>
    </noscript>`

const NOSCRIPT_ES = `    <noscript>
      <h1>Luis Alberto Duarte Cortés — Ingeniero de Sistemas IA y Automatización</h1>
      <p>Construyo sistemas con IA e infraestructura de automatización. Bogotá · Remoto · Inglés C1 (IELTS 7.0).</p>
      <h2>Proyectos</h2>
      <ul>
        <li><strong>Boveda</strong> — Panel de finanzas personales para cuentas bancarias colombianas (Python, FastAPI, SQLite, React)</li>
        <li><strong>Anti-Phishing Shield</strong> — Herramienta open source de protección contra phishing para adultos mayores</li>
        <li><strong>SUPERFARM</strong> — Infraestructura abierta de inteligencia agrícola para agentes de finca modulares</li>
      </ul>
      <h2>Experiencia</h2>
      <ul>
        <li>Ingeniero de Automatización Freelance — abr 2024–Presente</li>
        <li>QA Tester, Funktronic Labs (Remoto) — 2024</li>
      </ul>
      <h2>Contacto</h2>
      <p>Correo: lualducor@gmail.com | LinkedIn: linkedin.com/in/luis-alberto-duarte-cortes-97748171 | GitHub: github.com/lualducor</p>
    </noscript>`

function applyLocale(html, url) {
  const isEs = url.startsWith('/es')
  if (!isEs) return html
  let next = html
  next = next.replace('<html lang="en">', '<html lang="es">')
  if (next.includes(NOSCRIPT_EN)) {
    next = next.replace(NOSCRIPT_EN, NOSCRIPT_ES)
  }
  return next
}

function renderRoute(url, outputPath, meta, jsonLd = []) {
  const appHtml = render(url)
  const withAppHtml = injectAppHtml(template, appHtml)
  const withMetadata = injectMetadata(withAppHtml, meta)
  const withJsonLd = injectJsonLd(withMetadata, jsonLd)
  const localized = applyLocale(withJsonLd, url)

  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, localized)
  console.log(`✓ Pre-rendered ${url} → ${outputPath}`)
}

// Keep `/` with a trailing slash. Every other canonical/route stays slashless.
renderRoute('/', resolve(distDir, 'index.html'), homeMeta, [
  personSchema(contentJson.identity),
  profilePageSchema(contentJson.identity, contentJson.meta?.lastUpdated),
  webSiteSchema(),
  faqSchema(contentJson.faq ?? []),
  breadcrumbSchema([{ name: 'Home', url: SITE_URL }]),
])
renderRoute('/blog', resolve(distDir, 'blog', 'index.html'), blogIndexMeta)

renderRoute('/es/', resolve(distDir, 'es', 'index.html'), {
  ...homeMeta,
  canonical: `${SITE_URL}/es/`,
}, [
  personSchema(contentJson.identity),
  profilePageSchema(contentJson.identity, contentJson.meta?.lastUpdated),
  webSiteSchema(),
  faqSchema(contentJson.faq ?? []),
  breadcrumbSchema([{ name: 'Home', url: `${SITE_URL}/es/` }]),
])
renderRoute('/es/blog', resolve(distDir, 'es', 'blog', 'index.html'), {
  ...blogIndexMeta,
  canonical: `${SITE_URL}/es/blog`,
})

for (const post of posts) {
  renderRoute(`/blog/${post.slug}`, resolve(distDir, 'blog', post.slug, 'index.html'), {
    title: `${post.frontmatter.title} — LuchoLabs`,
    description: post.frontmatter.description,
    canonical: `${SITE_URL}/blog/${post.slug}`,
    ogImage: post.frontmatter.ogImage
      ? `${SITE_URL}/blog/og/${post.frontmatter.ogImage}`
      : DEFAULT_OG_IMAGE,
    ogType: 'article',
  }, [
    articleSchema(post),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Blog', url: `${SITE_URL}/blog` },
      { name: post.frontmatter.title, url: `${SITE_URL}/blog/${post.slug}` },
    ]),
  ])
}

for (const tag of tags) {
  const encodedTag = encodeURIComponent(tag)
  renderRoute(`/blog/tag/${encodedTag}`, join(distDir, 'blog', 'tag', encodedTag, 'index.html'), {
    title: `#${tag} — LuchoLabs Blog`,
    description: `Posts tagged ${tag} on LuchoLabs.`,
    canonical: `${SITE_URL}/blog/tag/${encodedTag}`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
  }, [
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Blog', url: `${SITE_URL}/blog` },
      { name: `#${tag}`, url: `${SITE_URL}/blog/tag/${encodedTag}` },
    ]),
  ])
}

for (const talk of talks) {
  const description = talk.abstract?.[0] ?? talk.subtitle ?? ''
  const ogImage = talk.heroPhoto ? toAbsoluteUrl(talk.heroPhoto) : DEFAULT_OG_IMAGE
  const englishUrl = `${SITE_URL}/talks/${talk.slug}`
  const spanishUrl = `${SITE_URL}/es/talks/${talk.slug}`

  renderRoute(`/talks/${talk.slug}`, resolve(distDir, 'talks', talk.slug, 'index.html'), {
    title: `${talk.title} — LuchoLabs`,
    description,
    canonical: englishUrl,
    ogImage,
    ogType: 'article',
  }, [
    eventSchema(talk, englishUrl),
    breadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Talks', url: `${SITE_URL}/talks` },
      { name: talk.title, url: englishUrl },
    ]),
  ])

  renderRoute(`/es/talks/${talk.slug}`, resolve(distDir, 'es', 'talks', talk.slug, 'index.html'), {
    title: `${talk.title} — LuchoLabs`,
    description,
    canonical: spanishUrl,
    ogImage,
    ogType: 'article',
  }, [
    eventSchema(talk, spanishUrl),
    breadcrumbSchema([
      { name: 'Home', url: `${SITE_URL}/es/` },
      { name: 'Talks', url: `${SITE_URL}/es/talks` },
      { name: talk.title, url: spanishUrl },
    ]),
  ])
}

rmSync(ssrDir, { recursive: true, force: true })
console.log('✓ Cleaned dist-ssr/')

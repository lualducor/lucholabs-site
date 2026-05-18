import { readFileSync, writeFileSync } from 'fs'
import contentJson from '../src/data/content.json' with { type: 'json' }

const SITE_URL = 'https://lucholabs.dev'
const INDEX_PATH = 'src/lib/blog/posts.generated.json'

const posts = JSON.parse(readFileSync(INDEX_PATH, 'utf-8'))
  .filter(post => !post.frontmatter.draft)

const tags = [...new Set(posts.flatMap(post => post.frontmatter.tags ?? []))]
const siteLastmod = contentJson.meta?.lastUpdated ?? new Date().toISOString().slice(0, 10)
const formatDateOnly = value => value.slice(0, 10)

const routes = [
  { url: '/', lastmod: siteLastmod },
  { url: '/blog', lastmod: siteLastmod },
  ...posts.map(post => ({
    url: `/blog/${post.slug}`,
    lastmod: post.frontmatter.date,
  })),
  ...tags.map(tag => ({
    url: `/blog/tag/${tag}`,
  })),
  // do NOT add /es/ blog URLs (excluded until CONTENT session ships Spanish content).
  // TODO add /lab once THELAB Vercel deploy ships.
  ...(contentJson.talks ?? []).flatMap(talk => ([
    {
      url: `/talks/${talk.slug}`,
      lastmod: formatDateOnly(talk.absoluteDate),
    },
    {
      url: `/es/talks/${talk.slug}`,
      lastmod: formatDateOnly(talk.absoluteDate),
    },
  ])),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}${route.url}</loc>
${route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>\n` : ''}  </url>`).join('\n')}
</urlset>`

writeFileSync('dist/sitemap.xml', xml, 'utf-8')
console.log(`✓ Sitemap → dist/sitemap.xml (${routes.length} routes)`)

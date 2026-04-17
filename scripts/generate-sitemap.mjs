import { readFileSync, writeFileSync } from 'fs'

const SITE_URL = 'https://lucholabs.dev'
const INDEX_PATH = 'src/lib/blog/posts.generated.json'

const posts = JSON.parse(readFileSync(INDEX_PATH, 'utf-8'))
  .filter(post => !post.frontmatter.draft)

const tags = [...new Set(posts.flatMap(post => post.frontmatter.tags ?? []))]

const routes = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/blog', priority: '0.9', changefreq: 'daily' },
  ...posts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: post.frontmatter.date,
  })),
  ...tags.map(tag => ({
    url: `/blog/tag/${tag}`,
    priority: '0.5',
    changefreq: 'weekly',
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${route.lastmod ? `\n    <lastmod>${route.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`

writeFileSync('dist/sitemap.xml', xml, 'utf-8')
console.log(`✓ Sitemap → dist/sitemap.xml (${routes.length} routes)`)

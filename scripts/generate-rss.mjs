import { readFileSync, writeFileSync, mkdirSync } from 'fs'

const SITE_URL = 'https://lucholabs.dev'
const FEED_PATH = 'dist/blog/rss.xml'
const INDEX_PATH = 'src/lib/blog/posts.generated.json'

const posts = JSON.parse(readFileSync(INDEX_PATH, 'utf-8'))
  .filter(post => !post.frontmatter.draft)

function escape(value) {
  return String(value).replace(/[<>&'"]/g, character => (
    {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    }[character]
  ))
}

const items = posts.map(post => `
    <item>
      <title>${escape(post.frontmatter.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${escape(post.frontmatter.description)}</description>
      ${(post.frontmatter.tags ?? []).map(tag => `<category>${escape(tag)}</category>`).join('\n      ')}
    </item>`).join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LuchoLabs — Luis Alberto Duarte Cortés</title>
    <link>${SITE_URL}/blog</link>
    <description>Build logs, automation deep-dives, and AI experiments.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

mkdirSync('dist/blog', { recursive: true })
writeFileSync(FEED_PATH, rss, 'utf-8')
console.log(`✓ RSS feed → ${FEED_PATH} (${posts.length} posts)`)

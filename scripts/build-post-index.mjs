import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_DIR = 'content/posts'
const OUTPUT_PATH = 'src/lib/blog/posts.generated.json'

function loadPosts() {
  const files = readdirSync(POSTS_DIR).filter(file => file.endsWith('.mdx'))

  return files.map(file => {
    const raw = readFileSync(join(POSTS_DIR, file), 'utf-8')
    const { data, content } = matter(raw)

    const prose = content.replace(/```[\s\S]*?```/g, '')
    const stats = readingTime(prose)

    return {
      frontmatter: data,
      slug: data.slug ?? file.replace(/\.mdx$/, ''),
      readingTime: stats.text,
      sourceFile: file,
    }
  })
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
}

const posts = loadPosts()
mkdirSync('src/lib/blog', { recursive: true })
writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2), 'utf-8')
console.log(`✓ Indexed ${posts.length} posts → ${OUTPUT_PATH}`)

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { createInterface } from 'node:readline'
import { join } from 'node:path'
import matter from 'gray-matter'
import { validatePost } from './_validate-post.mjs'

const POSTS_DIR = 'content/posts'
const SITE_URL = 'https://lucholabs.dev'

function ask(question) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

function isYes(answer) {
  return /^y(es)?$/i.test(answer)
}

async function main() {
  const slug = process.argv[2]

  if (!slug) {
    console.error('Usage: node scripts/publish-post.mjs <slug>')
    process.exit(1)
  }

  const filepath = join(POSTS_DIR, `${slug}.mdx`)
  if (!existsSync(filepath)) {
    console.error(`Post not found: ${filepath}`)
    process.exit(1)
  }

  const initialRaw = readFileSync(filepath, 'utf-8')
  const { data } = matter(initialRaw)
  validatePost(data, `${slug}.mdx`)

  if (data.draft === true) {
    const answer = await ask(`Flip draft → false for ${slug}? [y/N]: `)
    if (isYes(answer)) {
      const updatedRaw = readFileSync(filepath, 'utf-8').replace(/^draft: true$/m, 'draft: false')
      writeFileSync(filepath, updatedRaw, 'utf-8')
    }
  }

  try {
    execSync('npm run build', { stdio: 'inherit' })
  } catch {
    process.exit(1)
  }

  console.log(`\n✓ Build complete. Preview with: npm run preview`)
  console.log(`  Open: http://localhost:4173/blog/${slug}`)
  console.log(`  Live URL after deploy: ${SITE_URL}/blog/${slug}`)

  const shouldCommit = await ask('\nStage and commit? [y/N]: ')
  if (isYes(shouldCommit)) {
    execSync(`git add -- "content/posts/${slug}.mdx" "src/lib/blog/posts.generated.json"`, { stdio: 'inherit' })

    try {
      execSync(`git add -- "public/blog/og/${slug}.png"`, { stdio: 'inherit' })
    } catch {
      // OG image generation is optional at this stage.
    }

    execSync(`git commit -m "blog: publish ${slug}"`, { stdio: 'inherit' })
  }

  console.log('Done. Run: git push')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

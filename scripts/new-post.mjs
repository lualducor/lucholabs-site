import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'node:fs'
import { execSync, spawnSync } from 'node:child_process'
import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const POSTS_DIR = 'content/posts'
const SITE_URL = 'https://lucholabs.dev'

function slugify(title) {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

async function prompt(rl, question) {
  const ans = await rl.question(question)
  return ans.trim()
}

function openEditor(initial) {
  const editor = process.env.EDITOR || 'vim'
  const tmp = join(tmpdir(), `lucholabs-post-${Date.now()}.md`)
  writeFileSync(tmp, initial, 'utf-8')
  const res = spawnSync(editor, [tmp], { stdio: 'inherit' })
  if (res.status !== 0) {
    unlinkSync(tmp)
    throw new Error(`Editor exited with status ${res.status}`)
  }
  const body = readFileSync(tmp, 'utf-8')
  unlinkSync(tmp)
  return body
}

function buildFrontmatter({ title, slug, description, tags }) {
  const tagList = tags.split(',').map(t => t.trim()).filter(Boolean)
  return [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: "${today()}"`,
    `slug: "${slug}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `tags: [${tagList.map(t => `"${t}"`).join(', ')}]`,
    `draft: false`,
    '---',
    '',
  ].join('\n')
}

async function main() {
  const rl = createInterface({ input: stdin, output: stdout })

  const title = await prompt(rl, 'Title: ')
  if (!title) { rl.close(); console.error('Title required.'); process.exit(1) }

  const tags = await prompt(rl, 'Tags (comma-separated): ')
  const description = await prompt(rl, 'Description: ')
  if (!description) { rl.close(); console.error('Description required.'); process.exit(1) }

  rl.close()

  const slug = slugify(title)
  const filepath = join(POSTS_DIR, `${slug}.mdx`)
  if (existsSync(filepath)) {
    console.error(`Post already exists: ${filepath}`)
    process.exit(1)
  }

  const initial = '<!-- Write your post in markdown below. Save and close your editor when done. -->\n\n'
  const rawBody = openEditor(initial)
  const body = rawBody.replace(/<!--[\s\S]*?-->/, '').trim()
  if (!body) {
    console.error('Empty body. Aborting.')
    process.exit(1)
  }

  mkdirSync(POSTS_DIR, { recursive: true })
  const content = buildFrontmatter({ title, slug, description, tags }) + body + '\n'
  writeFileSync(filepath, content, 'utf-8')
  console.log(`✓ Wrote ${filepath}`)

  try {
    execSync(`git add ${filepath}`, { stdio: 'inherit' })
    execSync(`git commit -m "blog: new post — ${title.replace(/"/g, '\\"')}"`, { stdio: 'inherit' })
    execSync('git push', { stdio: 'inherit' })
    console.log(`\n✓ Pushed. Post will be live in ~1-2 min at:\n  ${SITE_URL}/blog/${slug}`)
  } catch (err) {
    console.error('\nFile was written but git commit/push failed:')
    console.error(err.message)
    console.error('\nYou can recover by running git add/commit/push manually.')
    process.exit(1)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

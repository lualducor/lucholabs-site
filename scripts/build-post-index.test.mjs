import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync, existsSync } from 'fs'

describe('build-post-index', () => {
  beforeAll(async () => {
    const moduleUrl = new URL('./build-post-index.mjs', import.meta.url)
    await import(`${moduleUrl.href}?t=${Date.now()}`)
  })

  it('writes the index file', () => {
    expect(existsSync('src/lib/blog/posts.generated.json')).toBe(true)
  })

  it('includes the hello-world post', () => {
    const data = JSON.parse(readFileSync('src/lib/blog/posts.generated.json', 'utf-8'))
    const post = data.find(p => p.slug === 'hello-world')
    expect(post).toBeDefined()
    expect(post.frontmatter.title).toBe('Hello World')
    expect(post.frontmatter.tags).toContain('meta')
  })

  it('computes a reading time', () => {
    const data = JSON.parse(readFileSync('src/lib/blog/posts.generated.json', 'utf-8'))
    const post = data.find(p => p.slug === 'hello-world')
    expect(post.readingTime).toMatch(/min read$/)
  })

  it('sorts posts newest first', () => {
    const data = JSON.parse(readFileSync('src/lib/blog/posts.generated.json', 'utf-8'))
    for (let index = 1; index < data.length; index += 1) {
      const previous = new Date(data[index - 1].frontmatter.date).getTime()
      const current = new Date(data[index].frontmatter.date).getTime()
      expect(previous).toBeGreaterThanOrEqual(current)
    }
  })
})

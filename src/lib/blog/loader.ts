import postsRaw from './posts.generated.json'
import type { Post, PostFrontmatter, SeriesGroup } from './types'

const allPosts: Post[] = (postsRaw as Array<{
  frontmatter: PostFrontmatter
  slug: string
  readingTime: string
}>)
  .filter(post => {
    if (import.meta.env.PROD && post.frontmatter.draft) return false
    return true
  })

export function getAllPosts(): Post[] {
  return allPosts
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find(post => post.slug === slug)
}

export function getAllTags(): string[] {
  const tags = allPosts.flatMap(post => post.frontmatter.tags ?? [])
  return [...new Set(tags)].sort()
}

export function getPostsByTag(tag: string): Post[] {
  return allPosts.filter(post => post.frontmatter.tags?.includes(tag))
}

export function getSeriesGroups(): SeriesGroup[] {
  const map = new Map<string, Post[]>()

  for (const post of allPosts) {
    if (!post.frontmatter.series) continue
    const key = post.frontmatter.series
    if (!map.has(key)) map.set(key, [])
    map.get(key)?.push(post)
  }

  return Array.from(map.entries()).map(([name, posts]) => ({
    name,
    posts: posts.sort(
      (a, b) => (a.frontmatter.seriesPart ?? 0) - (b.frontmatter.seriesPart ?? 0),
    ),
  }))
}

export function getSeriesByName(name: string): SeriesGroup | undefined {
  return getSeriesGroups().find(series => series.name === name)
}

import type { Post } from './types'

export function getRelatedPosts(currentSlug: string, allPosts: Post[], count = 3): Post[] {
  const current = allPosts.find(p => p.slug === currentSlug)
  if (!current) return []
  const currentTags = new Set(current.frontmatter.tags ?? [])
  return allPosts
    .filter(p => p.slug !== currentSlug)
    .map(p => ({
      post: p,
      score: (p.frontmatter.tags ?? []).filter(t => currentTags.has(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.frontmatter.date).getTime() - new Date(a.post.frontmatter.date).getTime(),
    )
    .slice(0, count)
    .map(({ post }) => post)
}

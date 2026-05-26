import { Link } from 'react-router-dom'
import type { Post } from '../../lib/blog/types'
import { PostDate } from './PostDate'
import { ReadingTime } from './ReadingTime'
import { TagBadge } from './TagBadge'
import { track } from '../../lib/analytics'
import { useLocale } from '../../lib/locale'

export function RelatedPosts({ posts }: { posts: Post[] }) {
  const locale = useLocale()
  if (posts.length === 0) return null
  const label = locale === 'es' ? 'Lee a continuación' : 'Read next'

  return (
    <div className="related-posts">
      <p className="related-posts-label">{label}</p>
      <div className="related-posts-grid">
        {posts.map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="related-post-card"
            onClick={() => track('Related post click', { slug: post.slug })}
          >
            <div className="related-post-title">{post.frontmatter.title}</div>
            <div className="related-post-meta">
              <PostDate date={post.frontmatter.date} />
              <ReadingTime time={post.readingTime} />
            </div>
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="related-post-tags">
                {post.frontmatter.tags.map(tag => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

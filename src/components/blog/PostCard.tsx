import { Link } from 'react-router-dom'
import type { Post } from '../../lib/blog/types'
import { PostDate } from './PostDate'
import { ReadingTime } from './ReadingTime'
import { TagBadge } from './TagBadge'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: '20px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {post.frontmatter.series && (
          <span
            style={{
              alignSelf: 'flex-start',
              padding: '4px 10px',
              borderRadius: '999px',
              border: '1px solid rgba(99,102,241,0.22)',
              backgroundColor: 'rgba(99,102,241,0.08)',
              color: 'rgba(196,181,253,0.9)',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '11px',
            }}
          >
            Series: {post.frontmatter.series}
          </span>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            to={`/blog/${post.slug}`}
            style={{
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              textDecoration: 'none',
            }}
          >
            {post.frontmatter.title}
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              fontSize: '13px',
            }}
          >
            <PostDate date={post.frontmatter.date} />
            <ReadingTime time={post.readingTime} />
          </div>
        </div>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.68)', lineHeight: 1.7, margin: 0 }}>
        {post.frontmatter.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {post.frontmatter.tags.map(tag => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </article>
  )
}

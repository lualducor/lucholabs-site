import { Link } from 'react-router-dom'
import type { SeriesGroup } from '../../lib/blog/types'

interface SeriesBannerProps {
  series: SeriesGroup
  currentSlug: string
}

export function SeriesBanner({ series, currentSlug }: SeriesBannerProps) {
  const currentIndex = series.posts.findIndex(post => post.slug === currentSlug)
  const currentPart = currentIndex >= 0 ? currentIndex + 1 : 0

  return (
    <section
      style={{
        border: '1px solid rgba(99,102,241,0.18)',
        backgroundColor: 'rgba(99,102,241,0.05)',
        borderRadius: '18px',
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <p
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          margin: 0,
        }}
      >
        Part {currentPart} of {series.posts.length} — {series.name}
      </p>

      <ol style={{ display: 'grid', gap: '8px', paddingLeft: '20px', margin: 0 }}>
        {series.posts.map(post => {
          const isCurrent = post.slug === currentSlug

          return (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  border: isCurrent ? '1px solid rgba(99,102,241,0.35)' : '1px solid transparent',
                  backgroundColor: isCurrent ? 'rgba(99,102,241,0.12)' : 'transparent',
                  color: isCurrent ? '#ffffff' : 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                }}
              >
                {post.frontmatter.title}
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

import { useEffect, useState, type ComponentType } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BlogNav } from '../components/blog/BlogNav'
import { PostDate } from '../components/blog/PostDate'
import { ReadingTime } from '../components/blog/ReadingTime'
import { SeriesBanner } from '../components/blog/SeriesBanner'
import { TagBadge } from '../components/blog/TagBadge'
import { getPostBySlug, getSeriesByName } from '../lib/blog/loader'
import '../styles/blog.css'

const mdxModules = import.meta.glob<{ default: ComponentType }>('../../content/posts/*.mdx')
const mdxModulesForSsr = import.meta.glob<{ default: ComponentType }>(
  '../../content/posts/*.mdx',
  { eager: true },
)

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined
  const seriesGroup = post?.frontmatter.series
    ? getSeriesByName(post.frontmatter.series)
    : undefined
  const initialContent = post
    ? mdxModulesForSsr[`../../content/posts/${post.slug}.mdx`]?.default ?? null
    : null
  const [lazyContent, setLazyContent] = useState<ComponentType | null>(null)
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null)

  useEffect(() => {
    if (!post || initialContent) return

    let cancelled = false
    const loader = mdxModules[`../../content/posts/${post.slug}.mdx`]

    if (!loader) {
      return
    }

    void loader().then(module => {
      if (!cancelled) {
        setLoadedSlug(post.slug)
        setLazyContent(() => module.default)
      }
    })

    return () => {
      cancelled = true
    }
  }, [initialContent, post])

  useEffect(() => {
    if (post) document.title = `${post.frontmatter.title} — LuchoLabs`
  }, [post])

  const MDXContent = initialContent ?? (loadedSlug === post?.slug ? lazyContent : null)

  if (!post) {
    return (
      <>
        <BlogNav />
        <main style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 80px' }}>
          <p style={{ color: 'rgba(255,255,255,0.72)' }}>
            Post not found.{' '}
            <Link to="/blog" style={{ color: 'rgba(134,239,172,0.92)' }}>
              ← Back to blog
            </Link>
          </p>
        </main>
      </>
    )
  }

  return (
    <>
      <BlogNav />
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <article data-pagefind-body style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {seriesGroup && (
            <SeriesBanner series={seriesGroup} currentSlug={post.slug} />
          )}

          <header style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h1 style={{ fontSize: '52px', lineHeight: 0.95, letterSpacing: '-0.05em', margin: 0 }}>
                {post.frontmatter.title}
              </h1>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'wrap',
                  fontSize: '14px',
                }}
              >
                <PostDate date={post.frontmatter.date} />
                <ReadingTime time={post.readingTime} />
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {post.frontmatter.tags.map(tag => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </header>

          <div className="prose">
            {MDXContent ? <MDXContent /> : <p>Loading…</p>}
          </div>
        </article>
      </main>
    </>
  )
}

import { useEffect, useRef, type ComponentType } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BlogNav } from '../components/blog/BlogNav'
import { PostDate } from '../components/blog/PostDate'
import { ReadingTime } from '../components/blog/ReadingTime'
import { SeriesBanner } from '../components/blog/SeriesBanner'
import { TagBadge } from '../components/blog/TagBadge'
import { MDXProvider } from '../components/blog/MDXProvider'
import { ReadingProgressBar } from '../components/blog/ReadingProgressBar'
import { TableOfContents } from '../components/blog/TableOfContents'
import { ShareBlock } from '../components/blog/ShareBlock'
import { AuthorCard } from '../components/blog/AuthorCard'
import { RelatedPosts } from '../components/blog/RelatedPosts'
import { getPostBySlug, getSeriesByName, getAllPosts } from '../lib/blog/loader'
import { getRelatedPosts } from '../lib/blog/related'
import { initCopyButtons } from '../lib/blog/copyButtons'
import { Comments } from '../components/blog/Comments'
import { localePrefix, useLocale } from '../lib/locale'
import '../styles/blog.css'

const mdxModulesForSsr = import.meta.glob<{ default: ComponentType }>(
  '../../content/posts/*.mdx',
  { eager: true },
)

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const locale = useLocale()
  const post = slug ? getPostBySlug(slug) : undefined
  const seriesGroup = post?.frontmatter.series
    ? getSeriesByName(post.frontmatter.series)
    : undefined
  const MDXContent = post
    ? (mdxModulesForSsr[`../../content/posts/${post.slug}.mdx`]?.default ?? null)
    : null

  const proseRef = useRef<HTMLDivElement>(null)
  const relatedPosts = post ? getRelatedPosts(post.slug, getAllPosts()) : []

  useEffect(() => {
    if (post) document.title = `${post.frontmatter.title} — LuchoLabs`
  }, [post])

  useEffect(() => {
    if (!proseRef.current) return
    const cleanup = initCopyButtons(proseRef.current)
    return cleanup
  }, [post])

  if (!post) {
    return (
      <>
        <BlogNav />
        <main style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 80px' }}>
          <p style={{ color: 'rgba(255,255,255,0.72)' }}>
            {locale === 'es' ? 'Artículo no encontrado.' : 'Post not found.'}{' '}
            <Link to={`${localePrefix(locale)}/blog`} style={{ color: 'rgba(134,239,172,0.92)' }}>
              {locale === 'es' ? '← Volver al blog' : '← Back to blog'}
            </Link>
          </p>
        </main>
      </>
    )
  }

  return (
    <>
      <ReadingProgressBar />
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

          <TableOfContents proseRef={proseRef} />

          <div className="prose" ref={proseRef}>
            <MDXProvider>
              {MDXContent ? <MDXContent /> : <p>Loading…</p>}
            </MDXProvider>
          </div>

          <ShareBlock title={post.frontmatter.title} slug={post.slug} />
          <AuthorCard />
          <RelatedPosts posts={relatedPosts} />
          <Comments />
        </article>
      </main>
    </>
  )
}

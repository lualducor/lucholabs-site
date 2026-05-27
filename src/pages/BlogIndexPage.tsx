import { useEffect } from 'react'
import { BlogNav } from '../components/blog/BlogNav'
import { PostCard } from '../components/blog/PostCard'
import { TagBadge } from '../components/blog/TagBadge'
import { getAllPosts, getAllTags } from '../lib/blog/loader'
import { useLocale } from '../lib/locale'

const posts = getAllPosts()
const tags = getAllTags()

export function BlogIndexPage() {
  const locale = useLocale()

  useEffect(() => {
    document.title = 'Blog — LuchoLabs'
  }, [])

  return (
    <>
      <BlogNav />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
          <p
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
              margin: 0,
            }}
          >
            {locale === 'es' ? 'Diario' : 'Journal'}
          </p>
          <h1 style={{ fontSize: '48px', lineHeight: 1, letterSpacing: '-0.05em', margin: 0 }}>
            Blog
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.68)', lineHeight: 1.75, maxWidth: '60ch', margin: 0 }}>
            {locale === 'es'
              ? 'Build logs, análisis profundos de automatización y experimentos con IA.'
              : 'Build logs, automation deep-dives, and AI experiments.'}
          </p>
        </header>

        <nav
          aria-label="Tags"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}
        >
          {tags.map(tag => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </nav>

        <section style={{ display: 'grid', gap: '20px' }}>
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>
      </main>
    </>
  )
}

import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BlogNav } from '../components/blog/BlogNav'
import { PostCard } from '../components/blog/PostCard'
import { TagBadge } from '../components/blog/TagBadge'
import { getAllTags, getPostsByTag } from '../lib/blog/loader'

export function BlogTagPage() {
  const { tag: tagParam } = useParams<{ tag: string }>()
  const tag = tagParam ? decodeURIComponent(tagParam) : ''
  const posts = tag ? getPostsByTag(tag) : []
  const allTags = getAllTags()

  useEffect(() => {
    if (tag) document.title = `#${tag} — LuchoLabs Blog`
  }, [tag])

  return (
    <>
      <BlogNav />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '42px', lineHeight: 1, letterSpacing: '-0.05em', margin: 0 }}>
            Posts tagged: #{tag}
          </h1>
          <Link
            to="/blog"
            style={{
              color: 'rgba(134,239,172,0.92)',
              textDecoration: 'none',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '12px',
            }}
          >
            ← All posts
          </Link>
        </div>

        {posts.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.68)', marginBottom: '32px' }}>
            No posts found for this tag.
          </p>
        ) : (
          <section style={{ display: 'grid', gap: '20px', marginBottom: '32px' }}>
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </section>
        )}

        <nav aria-label="All tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {allTags.map(currentTag => (
            <TagBadge key={currentTag} tag={currentTag} active={currentTag === tag} />
          ))}
        </nav>
      </main>
    </>
  )
}

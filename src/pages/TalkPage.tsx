import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { TalkNav } from '../components/TalkNav'
import { talks } from '../data/resume'
import { getLocaleFromPath, t } from '../lib/locale'

const containerStyle = {
  maxWidth: '860px',
  margin: '0 auto',
  padding: '48px 24px 80px',
}

const labelStyle = {
  fontFamily: 'ui-monospace, monospace',
  fontSize: '11px',
  color: 'rgba(255,255,255,0.45)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  margin: '0 0 12px 0',
}

const sectionTitleStyle = {
  fontFamily: 'ui-monospace, monospace',
  fontSize: '11px',
  color: 'rgba(255,255,255,0.45)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  margin: '0 0 16px 0',
  fontWeight: 'normal' as const,
}

const paragraphStyle = {
  fontSize: '16px',
  color: 'rgba(255,255,255,0.72)',
  lineHeight: 1.7,
  margin: '0 0 18px 0',
}

const cardChromeStyle = {
  padding: '24px',
  borderRadius: '14px',
  backgroundColor: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.05)',
}

export function TalkPage() {
  const { slug } = useParams<{ slug: string }>()
  const talk = slug ? talks.find(entry => entry.slug === slug) : undefined
  const locale = getLocaleFromPath(useLocation().pathname)

  useEffect(() => {
    if (talk) document.title = `${t(talk.title, locale)} — Talk @ ${talk.event} — LuchoLabs`
  }, [talk, locale])

  if (!talk) {
    return (
      <>
        <TalkNav />
        <main style={containerStyle}>
          <p style={{ color: 'rgba(255,255,255,0.72)' }}>
            Talk not found.{' '}
            <Link to="/" style={{ color: 'rgba(134,239,172,0.92)' }}>← Back to home</Link>
          </p>
        </main>
      </>
    )
  }

  return (
    <>
      <TalkNav />
      <main style={containerStyle}>
        <article style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Hero block */}
          <header style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={labelStyle}>
              {talk.role ? t(talk.role, locale) : 'Speaker'} · {talk.event} · {talk.date}
            </p>
            <h1 style={{
              fontSize: '52px', lineHeight: 0.98, letterSpacing: '-0.04em',
              margin: 0, fontWeight: 600, color: '#ffffff',
            }}>
              {t(talk.title, locale)}
            </h1>
            {talk.subtitle && (
              <p style={{
                fontSize: '18px', color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.45, margin: 0,
              }}>
                {t(talk.subtitle, locale)}
              </p>
            )}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
              fontFamily: 'ui-monospace, monospace', fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
            }}>
              {talk.format && <span>{t(talk.format, locale)}</span>}
              {talk.format && <span style={{ opacity: 0.3 }}>·</span>}
              <span>{talk.location}</span>
              <span style={{ opacity: 0.3 }}>·</span>
              <span>{talk.date}</span>
            </div>
          </header>

          {/* Hero photo */}
          {talk.heroPhoto && (
            <figure style={{ margin: 0 }}>
              <img
                src={talk.heroPhoto}
                alt={talk.heroPhotoAlt ? t(talk.heroPhotoAlt, locale) : `${talk.event} ${talk.date}`}
                style={{
                  width: '100%', height: 'auto', display: 'block',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              />
            </figure>
          )}

          {/* Abstract */}
          {talk.abstract.length > 0 && (
            <section aria-label="Abstract">
              <h2 style={sectionTitleStyle}>Abstract</h2>
              {talk.abstract.map((para, i) => (
                <p key={i} style={paragraphStyle}>{t(para, locale)}</p>
              ))}
            </section>
          )}

          {/* Video embed slot */}
          {talk.videoUrl ? (
            <section aria-label="Recording">
              <h2 style={sectionTitleStyle}>Recording</h2>
              <div style={{
                position: 'relative', width: '100%', aspectRatio: '16 / 9',
                borderRadius: '12px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.05)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}>
                <iframe
                  src={talk.videoUrl}
                  title={`${t(talk.title, locale)} — recording`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                />
              </div>
            </section>
          ) : (
            <section aria-label="Recording">
              <h2 style={sectionTitleStyle}>Recording</h2>
              <div style={cardChromeStyle}>
                <p style={{ ...paragraphStyle, fontSize: '14px', margin: 0 }}>
                  Recording upload in progress. Check back shortly, or{' '}
                  <Link to="/blog" style={{ color: 'rgba(134,239,172,0.92)' }}>read the recap</Link>{' '}
                  when it lands on the blog.
                </p>
              </div>
            </section>
          )}

          {/* Key takeaways */}
          {talk.keyTakeaways && talk.keyTakeaways.length > 0 && (
            <section aria-label="Key takeaways">
              <h2 style={sectionTitleStyle}>Key Takeaways</h2>
              <ul style={{ paddingLeft: '20px', margin: 0, color: 'rgba(255,255,255,0.72)' }}>
                {talk.keyTakeaways.map((point, i) => (
                  <li key={i} style={{ fontSize: '16px', lineHeight: 1.7, margin: '0 0 10px 0' }}>
                    {t(point, locale)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Resources */}
          {talk.resources && talk.resources.length > 0 && (
            <section aria-label="Resources">
              <h2 style={sectionTitleStyle}>Resources</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {talk.resources.map((r, i) => (
                  <li key={i}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'ui-monospace, monospace', fontSize: '14px',
                        color: 'rgba(134,239,172,0.92)', textDecoration: 'none',
                      }}
                    >
                      {t(r.title, locale)} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Slides */}
          {talk.slidesUrl && (
            <section aria-label="Slides">
              <h2 style={sectionTitleStyle}>Slides</h2>
              <a
                href={talk.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  fontSize: '13px', fontFamily: 'ui-monospace, monospace',
                  color: '#22c55e', textDecoration: 'none',
                  padding: '10px 20px',
                  border: '1px solid rgba(34,197,94,0.4)', borderRadius: '8px',
                }}
              >
                Download Slides (PDF) →
              </a>
            </section>
          )}

          {/* Gallery */}
          {talk.gallery && talk.gallery.length > 0 && (
            <section aria-label="Photo gallery">
              <h2 style={sectionTitleStyle}>Photos</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
              }}>
                {talk.gallery.map((img, i) => (
                  <figure key={i} style={{ margin: 0 }}>
                    <img
                      src={img.src}
                      alt={t(img.alt, locale)}
                      loading="lazy"
                      style={{
                        width: '100%', height: 'auto', display: 'block',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    />
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Related */}
          {(talk.relatedBlogSlug || talk.labAnchorUrl) && (
            <section aria-label="Related" style={{ marginTop: '8px' }}>
              <h2 style={sectionTitleStyle}>Related</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {talk.relatedBlogSlug && (
                  <li>
                    <Link
                      to={`/blog/${talk.relatedBlogSlug}`}
                      style={{ fontFamily: 'ui-monospace, monospace', fontSize: '14px', color: 'rgba(134,239,172,0.92)', textDecoration: 'none' }}
                    >
                      Read the recap on the blog →
                    </Link>
                  </li>
                )}
                {talk.labAnchorUrl && (
                  <li>
                    <a
                      href={talk.labAnchorUrl}
                      style={{ fontFamily: 'ui-monospace, monospace', fontSize: '14px', color: 'rgba(134,239,172,0.92)', textDecoration: 'none' }}
                    >
                      Explore the Lab context →
                    </a>
                  </li>
                )}
              </ul>
            </section>
          )}
        </article>
      </main>
    </>
  )
}

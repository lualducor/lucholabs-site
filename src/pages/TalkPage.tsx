import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TalkNav } from '../components/TalkNav'
import { talks } from '../data/resume'
import { localePrefix, t, useLocale } from '../lib/locale'

const containerStyle = {
  maxWidth: '860px',
  margin: '0 auto',
  padding: '48px 24px 80px',
}

const labelStyle = {
  fontFamily: 'ui-monospace, monospace',
  fontSize: '11px',
  color: 'rgba(255,255,255,0.5)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  margin: '0 0 12px 0',
}

const sectionTitleStyle = {
  fontFamily: 'ui-monospace, monospace',
  fontSize: '11px',
  color: 'rgba(255,255,255,0.5)',
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

const videoFrameStyle = {
  position: 'relative' as const,
  width: '100%',
  aspectRatio: '16 / 9',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.05)',
  backgroundColor: 'rgba(255,255,255,0.02)',
}

// Click-to-load YouTube facade. Renders only a thumbnail + play button up front
// (~20KB) instead of YouTube's ~500KB player JS + ad/tracking scripts. The real
// iframe loads on click. With JS disabled the anchor still opens the video on
// YouTube, so it never fully breaks.
function YouTubeFacade({ videoUrl, title, locale }: { videoUrl: string; title: string; locale: string }) {
  const [playing, setPlaying] = useState(false)
  const id = videoUrl.split('/embed/')[1]?.split(/[?&]/)[0] ?? ''

  if (playing) {
    return (
      <div style={videoFrameStyle}>
        <iframe
          src={`${videoUrl}?autoplay=1`}
          title={`${title} — recording`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
    )
  }

  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      onClick={(e) => { e.preventDefault(); setPlaying(true) }}
      aria-label={locale === 'es' ? `Reproducir grabación: ${title}` : `Play recording: ${title}`}
      style={{ ...videoFrameStyle, display: 'block', cursor: 'pointer', textDecoration: 'none' }}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt=""
        loading="lazy"
        onError={(e) => { e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <span style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'rgba(0,0,0,0.28)',
      }}>
        <span style={{
          width: '68px', height: '48px', borderRadius: '14px',
          background: 'rgba(0,0,0,0.7)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </a>
  )
}

export function TalkPage() {
  const { slug } = useParams<{ slug: string }>()
  const talk = slug ? talks.find(entry => entry.slug === slug) : undefined
  const locale = useLocale()

  useEffect(() => {
    if (talk) document.title = `${t(talk.title, locale)} — Talk @ ${talk.event} — LuchoLabs`
  }, [talk, locale])

  if (!talk) {
    return (
      <>
        <TalkNav />
        <main style={containerStyle}>
          <p style={{ color: 'rgba(255,255,255,0.72)' }}>
            {locale === 'es' ? 'Charla no encontrada.' : 'Talk not found.'}{' '}
            <Link to={localePrefix(locale) || '/'} style={{ color: 'rgba(134,239,172,0.92)' }}>
              {locale === 'es' ? '← Volver al inicio' : '← Back to home'}
            </Link>
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
              {talk.role ? t(talk.role, locale) : locale === 'es' ? 'Ponente' : 'Speaker'} · {talk.event} · {talk.date}
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
            <section aria-label={locale === 'es' ? 'Resumen' : 'Abstract'}>
              <h2 data-reveal style={sectionTitleStyle}>{locale === 'es' ? 'Resumen' : 'Abstract'}</h2>
              {talk.abstract.map((para, i) => (
                <p key={i} style={paragraphStyle}>{t(para, locale)}</p>
              ))}
            </section>
          )}

          {/* Video embed slot */}
          {talk.videoUrl ? (
            <section aria-label={locale === 'es' ? 'Grabación' : 'Recording'}>
              <h2 data-reveal style={sectionTitleStyle}>{locale === 'es' ? 'Grabación' : 'Recording'}</h2>
              <YouTubeFacade videoUrl={talk.videoUrl} title={t(talk.title, locale)} locale={locale} />
            </section>
          ) : (
            <section aria-label={locale === 'es' ? 'Grabación' : 'Recording'}>
              <h2 data-reveal style={sectionTitleStyle}>{locale === 'es' ? 'Grabación' : 'Recording'}</h2>
              <div style={cardChromeStyle}>
                <p style={{ ...paragraphStyle, fontSize: '14px', margin: 0 }}>
                  {locale === 'es' ? 'Subida de la grabación en curso. Vuelve más tarde, o ' : 'Recording upload in progress. Check back shortly, or '}
                  <Link to={`${localePrefix(locale)}/blog`} style={{ color: 'rgba(134,239,172,0.92)' }}>
                    {locale === 'es' ? 'lee el resumen' : 'read the recap'}
                  </Link>{' '}
                  {locale === 'es' ? 'cuando aparezca en el blog.' : 'when it lands on the blog.'}
                </p>
              </div>
            </section>
          )}

          {/* Key takeaways */}
          {talk.keyTakeaways && talk.keyTakeaways.length > 0 && (
            <section aria-label={locale === 'es' ? 'Puntos clave' : 'Key takeaways'}>
              <h2 data-reveal style={sectionTitleStyle}>{locale === 'es' ? 'Puntos clave' : 'Key Takeaways'}</h2>
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
            <section aria-label={locale === 'es' ? 'Recursos' : 'Resources'}>
              <h2 data-reveal style={sectionTitleStyle}>{locale === 'es' ? 'Recursos' : 'Resources'}</h2>
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
            <section aria-label={locale === 'es' ? 'Diapositivas' : 'Slides'}>
              <h2 data-reveal style={sectionTitleStyle}>{locale === 'es' ? 'Diapositivas' : 'Slides'}</h2>
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
                {locale === 'es' ? 'Descargar diapositivas (PDF) →' : 'Download Slides (PDF) →'}
              </a>
            </section>
          )}

          {/* Gallery */}
          {talk.gallery && talk.gallery.length > 0 && (
            <section aria-label={locale === 'es' ? 'Fotos' : 'Photo gallery'}>
              <h2 data-reveal style={sectionTitleStyle}>{locale === 'es' ? 'Fotos' : 'Photos'}</h2>
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
            <section aria-label={locale === 'es' ? 'Relacionado' : 'Related'} style={{ marginTop: '8px' }}>
              <h2 data-reveal style={sectionTitleStyle}>{locale === 'es' ? 'Relacionado' : 'Related'}</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {talk.relatedBlogSlug && (
                  <li>
                    <Link
                      to={`${localePrefix(locale)}/blog/${talk.relatedBlogSlug}`}
                      style={{ fontFamily: 'ui-monospace, monospace', fontSize: '14px', color: 'rgba(134,239,172,0.92)', textDecoration: 'none' }}
                    >
                      {locale === 'es' ? 'Lee el resumen en el blog →' : 'Read the recap on the blog →'}
                    </Link>
                  </li>
                )}
                {talk.labAnchorUrl && (
                  <li>
                    <a
                      href={talk.labAnchorUrl}
                      style={{ fontFamily: 'ui-monospace, monospace', fontSize: '14px', color: 'rgba(134,239,172,0.92)', textDecoration: 'none' }}
                    >
                      {locale === 'es' ? 'Explorar el contexto del Lab →' : 'Explore the Lab context →'}
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

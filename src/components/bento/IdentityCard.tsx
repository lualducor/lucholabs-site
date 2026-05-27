import { card, mono } from './styles'
import { identity } from '../../data/resume'
import { getLocaleFromPath, t } from '../../lib/locale'
import { useLocation } from 'react-router-dom'

export default function IdentityCard() {
  const { pathname } = useLocation()
  const locale = pathname === '/es' ? 'es' : getLocaleFromPath(pathname)
  const labHref = locale === 'es' ? '/es/lab' : '/lab';
  const labLabel = locale === 'es' ? 'IR A LOS LABS →' : 'GO TO THE LABS →';
  const subMark = t(identity.subMark, locale)
  const latamLine = t(identity.latamLine, locale)
  const imageSrc = identity.image.url || identity.photo
  const webpSrc = imageSrc.replace(/\.jpe?g$/, '.webp')
  const heroTitle = t(identity.title, locale)
  const heroSubtitle = t(identity.subtitle, locale).trim()
  const roleLine = identity.roleLine ? t(identity.roleLine, locale) : ''

  return (
    <div style={{ ...card, alignItems: 'center', textAlign: 'center', gap: '16px', justifyContent: 'center' }}>
      {/* Avatar */}
      <div style={{
        width: '96px', height: '96px', borderRadius: '50%',
        border: '2px solid rgba(34,197,94,0.4)',
        boxShadow: '0 0 20px rgba(34,197,94,0.15)',
        overflow: 'hidden', flexShrink: 0,
      }}>
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={imageSrc}
            alt={identity.image.caption || identity.name}
            width={96}
            height={96}
            fetchPriority="high"
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </picture>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h1
          className="text-2xl sm:text-3xl"
          style={{ fontWeight: 600, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}
        >
          {identity.name}
        </h1>
        {subMark && (
          <p style={{ ...mono, color: 'rgba(255,255,255,0.28)', marginTop: '-2px' }}>
            {subMark}
          </p>
        )}
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, margin: 0 }}>
          {heroTitle}
        </p>
        {heroSubtitle && (
          <p style={{ ...mono, marginTop: '2px' }}>{heroSubtitle}</p>
        )}
        {latamLine && (
          <p style={{ ...mono, color: 'rgba(255,255,255,0.32)', marginTop: '2px' }}>
            {latamLine}
          </p>
        )}
        {roleLine && (
          <p style={{ ...mono, marginTop: '2px' }}>{roleLine}</p>
        )}
      </div>

      <a
        href={labHref}
        style={{
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: 'ui-monospace, monospace',
          color: '#0a0a0a',
          backgroundColor: '#22c55e',
          textDecoration: 'none',
          padding: '10px 24px',
          border: '1px solid #22c55e',
          borderRadius: '8px',
          marginTop: '4px',
          boxShadow: '0 0 24px rgba(34,197,94,0.25)',
          transition: 'background-color 0.15s, border-color 0.15s, transform 0.15s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#16a34a';
          (e.currentTarget as HTMLAnchorElement).style.borderColor = '#16a34a';
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#22c55e';
          (e.currentTarget as HTMLAnchorElement).style.borderColor = '#22c55e';
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
        }}
      >
        {labLabel}
      </a>

      <a
        href={identity.cvUrl}
        style={{
          fontSize: '13px', fontFamily: 'ui-monospace, monospace',
          color: '#22c55e', textDecoration: 'none',
          padding: '8px 20px',
          border: '1px solid rgba(34,197,94,0.4)', borderRadius: '8px',
          marginTop: '4px', transition: 'background-color 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.backgroundColor = 'rgba(34,197,94,0.08)'
          el.style.borderColor = 'rgba(34,197,94,0.6)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.backgroundColor = 'transparent'
          el.style.borderColor = 'rgba(34,197,94,0.4)'
        }}
      >
        {locale === 'es' ? 'Ver experiencia →' : 'View Experience →'}
      </a>
    </div>
  )
}

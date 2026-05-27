import { track } from '../lib/analytics'
import { useLocale } from '../lib/locale'

type EmailCaptureVariant = 'cv' | 'lab' | 'blog' | 'talk'

type EmailCaptureBlockProps = {
  variant?: EmailCaptureVariant
  headline?: string
  subheadline?: string
}

export default function EmailCaptureBlock({
  variant = 'cv',
  headline,
  subheadline,
}: EmailCaptureBlockProps) {
  const locale = useLocale()
  const resolvedHeadline = headline ?? (locale === 'es' ? 'Avísame cuando publiques.' : 'Notified when I publish.')
  const resolvedSubheadline = subheadline ?? (locale === 'es' ? 'Build logs, postmortems, rants ocasionales. Sin spam.' : 'Build logs, postmortems, occasional rants. No spam.')

  return (
    <section
      aria-label="Email updates"
      style={{
        marginBottom: '80px',
        padding: '32px',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(255,255,255,0.03)',
      }}
    >
      <div style={{ maxWidth: '640px' }}>
        <p style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.45)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          margin: '0 0 12px 0',
        }}>
          {locale === 'es' ? 'Actualizaciones' : 'Updates'}
        </p>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          margin: 0,
        }}>
          {resolvedHeadline}
        </h2>
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.6,
          margin: '12px 0 0 0',
        }}>
          {resolvedSubheadline}
        </p>
      </div>

      <form
        action="mailto:lualducor@gmail.com?subject=Subscribe&body=Subscribe%20me%20to%20updates%20at%20lucholabs.dev"
        method="post"
        encType="text/plain"
        style={{
          marginTop: '24px',
          display: 'flex',
          flexDirection: 'row',
          gap: '12px',
          flexWrap: 'wrap',
        }}
        onSubmit={() => {
          track('email_capture', { variant, location: window.location.pathname })
        }}
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@company.com"
          style={{
            flex: '1 1 240px',
            minHeight: '44px',
            padding: '12px 16px',
            fontSize: '14px',
            color: '#ffffff',
            backgroundColor: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            minHeight: '44px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#0a0a0a',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.9)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ffffff'
          }}
        >
          {locale === 'es' ? 'Suscribirse' : 'Subscribe'}
        </button>
      </form>
    </section>
  )
}

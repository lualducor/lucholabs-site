import { useState, type FormEvent } from 'react'
import { track } from '../lib/analytics'
import { useLocale } from '../lib/locale'

type EmailCaptureVariant = 'cv' | 'lab' | 'blog' | 'talk'
type EmailCaptureStatus = 'idle' | 'pending' | 'success' | 'error'

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
  const [status, setStatus] = useState<EmailCaptureStatus>('idle')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const resolvedHeadline = headline ?? (locale === 'es' ? 'Avísame cuando publiques.' : 'Notified when I publish.')
  const resolvedSubheadline = subheadline ?? (locale === 'es' ? 'Build logs, postmortems, rants ocasionales. Sin spam.' : 'Build logs, postmortems, occasional rants. No spam.')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    track('email_capture', { variant, location: window.location.pathname })
    setStatus('pending')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, website }),
      })

      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

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
          color: 'rgba(255,255,255,0.5)',
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

      {status === 'success' ? (
        <div aria-live="polite">
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.6,
            margin: '24px 0 0 0',
          }}>
            {locale === 'es' ? 'Listo. Te aviso cuando publique.' : 'Done. You will hear from me when I publish.'}
          </p>
        </div>
      ) : (
        <>
          <form
            style={{
              marginTop: '24px',
              display: 'flex',
              flexDirection: 'row',
              gap: '12px',
              flexWrap: 'wrap',
            }}
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              required
              aria-label={locale === 'es' ? 'Correo electrónico' : 'Email address'}
              placeholder="you@company.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
              onFocus={event => {
                event.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
              }}
              onBlur={event => {
                event.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              }}
              style={{
                flex: '1 1 240px',
                minHeight: '44px',
                padding: '12px 16px',
                fontSize: '14px',
                color: '#ffffff',
                backgroundColor: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
              }}
            />
            <input
              type="text"
              name="website"
              value={website}
              onChange={event => setWebsite(event.target.value)}
              aria-hidden="true"
              tabIndex={-1}
              autoComplete="off"
              style={{
                position: 'absolute',
                left: '-10000px',
                width: '1px',
                height: '1px',
                overflow: 'hidden',
              }}
            />
            <button
              type="submit"
              disabled={status === 'pending'}
              style={{
                minHeight: '44px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#0a0a0a',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                cursor: status === 'pending' ? 'default' : 'pointer',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={event => {
                if (status !== 'pending') {
                  event.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'
                }
              }}
              onMouseLeave={event => {
                event.currentTarget.style.backgroundColor = '#ffffff'
              }}
            >
              {status === 'pending'
                ? locale === 'es' ? 'Enviando…' : 'Subscribing…'
                : locale === 'es' ? 'Suscribirse' : 'Subscribe'}
            </button>
          </form>
          {status === 'error' && (
            <p
              role="alert"
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.6,
                margin: '12px 0 0 0',
              }}
            >
              {locale === 'es' ? 'No pude suscribirte. Intenta de nuevo o ' : 'I could not subscribe you. Try again or '}
              <a
                href="mailto:lualducor@gmail.com"
                style={{
                  color: '#ffffff',
                  textDecoration: 'underline',
                }}
              >
                {locale === 'es' ? 'escríbeme' : 'email me'}
              </a>
              .
            </p>
          )}
        </>
      )}
    </section>
  )
}

import { contact, contactMeta } from '../data/resume'
import { track } from '../lib/analytics'
import { getLocaleFromPath, t } from '../lib/locale'
import { useLocation } from 'react-router-dom'

const cardBase = {
  display: 'flex',
  flexDirection: 'column' as const,
  padding: '28px',
  borderRadius: '16px',
  backgroundColor: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.04)',
}

const labelStyle = {
  fontFamily: 'ui-monospace, monospace',
  fontSize: '11px',
  color: 'rgba(255,255,255,0.25)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  marginBottom: '12px',
  margin: '0 0 12px 0',
}

const headlineStyle = {
  fontSize: '15px',
  color: 'rgba(255,255,255,0.7)',
  fontWeight: 500,
  marginBottom: '8px',
  margin: '0 0 8px 0',
  lineHeight: 1.4,
}

const bodyStyle = {
  fontSize: '13px',
  color: 'rgba(255,255,255,0.35)',
  lineHeight: 1.6,
  margin: 0,
}

export default function ContactSection() {
  const { pathname } = useLocation()
  const locale = pathname === '/es' ? 'es' : getLocaleFromPath(pathname)
  const emailHref = contact.find(item => item.href.startsWith('mailto:'))?.href ?? 'mailto:lualducor@gmail.com'
  const hireHref = `${emailHref}${emailHref.includes('?') ? '&' : '?'}subject=${encodeURIComponent('Hiring inquiry from lucholabs.dev')}`
  const speakHref = `${emailHref}${emailHref.includes('?') ? '&' : '?'}subject=${encodeURIComponent('Speaking inquiry from lucholabs.dev')}`
  const notForLine = t(contactMeta.notForLine, locale)

  return (
    <section id="contact" aria-label="Contact" style={{ marginBottom: '80px', scrollMarginTop: '160px' }}>
      <h2 style={{
        fontFamily: 'ui-monospace, monospace', fontSize: '11px',
        color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
        letterSpacing: '0.1em', fontWeight: 'normal', margin: '0 0 24px 0',
      }}>
        Contact
      </h2>

      <div className="contact-grid">
        {/* LEFT: links */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {contact.map(item => (
              <a
                key={item.label}
                href={item.href}
                {...(!item.href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '14px 20px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px', textDecoration: 'none',
                  color: 'rgba(255,255,255,0.6)', fontSize: '13px',
                  fontFamily: 'ui-monospace, monospace',
                  transition: 'border-color 0.15s, color 0.15s, background-color 0.15s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                  el.style.color = 'rgba(255,255,255,0.85)'
                  el.style.backgroundColor = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.05)'
                  el.style.color = 'rgba(255,255,255,0.6)'
                  el.style.backgroundColor = 'rgba(255,255,255,0.03)'
                }}
              >
                <span style={{ flexGrow: 1 }}>{item.label}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT: dual CTA — HIRE ME + BOOK ME TO SPEAK + freelance line */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={cardBase}>
            <p style={labelStyle}>{contactMeta.hireHeadline ?? 'HIRE ME'}</p>
            <p style={headlineStyle}>{contactMeta.availability}</p>
            <p style={bodyStyle}>Based in Bogotá, Colombia. Available for US & European time zones.</p>
            <a
              href={hireHref}
              onClick={() => track('cta_click_hire')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                marginTop: '14px',
                fontSize: '12px',
                fontFamily: 'ui-monospace, monospace',
                color: 'rgba(255,255,255,0.72)',
                textDecoration: 'none',
                padding: '8px 14px',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '999px',
              }}
            >
              Hire →
            </a>
          </div>

          <div style={cardBase}>
            <p style={labelStyle}>{contactMeta.speakingHeadline ?? 'BOOK ME TO SPEAK'}</p>
            <p style={headlineStyle}>{contactMeta.speakingCta ?? contactMeta.cta}</p>
            <a
              href={speakHref}
              onClick={() => track('cta_click_speak')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                marginTop: '14px',
                fontSize: '12px',
                fontFamily: 'ui-monospace, monospace',
                color: 'rgba(255,255,255,0.72)',
                textDecoration: 'none',
                padding: '8px 14px',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '999px',
              }}
            >
              Speak →
            </a>
          </div>

          {notForLine && (
            <p style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.26)',
              lineHeight: 1.6,
              padding: '0 4px',
              margin: 0,
              fontStyle: 'italic',
            }}>
              {notForLine}
            </p>
          )}

          {contactMeta.freelanceLine && (
            <p style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.3)',
              lineHeight: 1.6,
              padding: '0 4px',
              margin: 0,
              fontFamily: 'ui-monospace, monospace',
            }}>
              {contactMeta.freelanceLine}
            </p>
          )}

          {contactMeta.calUrl !== undefined && (
            <a
              href={contactMeta.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontSize: '13px', fontFamily: 'ui-monospace, monospace',
                color: '#22c55e', textDecoration: 'none',
                padding: '8px 16px',
                border: '1px solid rgba(34,197,94,0.4)',
                borderRadius: '8px',
                alignSelf: 'flex-start',
              }}
            >
              Schedule a Call →
            </a>
          )}
        </div>
      </div>

      <div style={{
        marginTop: '64px', paddingTop: '24px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
          lucholabs.dev
        </span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}>
          Bogotá, Colombia
        </span>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 420px) 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 767px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

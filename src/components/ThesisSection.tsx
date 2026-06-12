import { useLocation } from 'react-router-dom'
import { thesis } from '../data/resume'
import { getLocaleFromPath, t } from '../lib/locale'

export default function ThesisSection() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)

  return (
    <section
      aria-label="Meritorious Thesis"
      style={{
        marginBottom: '48px',
        borderRadius: '20px',
        border: '1px solid rgba(34,197,94,0.15)',
        backgroundColor: 'rgba(34,197,94,0.03)',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '16px', marginBottom: '8px' }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <p style={{
            fontFamily: 'ui-monospace, monospace', fontSize: '11px',
            color: 'rgba(34,197,94,0.7)', textTransform: 'uppercase',
            letterSpacing: '0.1em', margin: '0 0 10px 0', fontWeight: 'normal',
          }}>
            ★ {t(thesis.title, locale)}
          </p>
          <h2 style={{
            fontSize: '20px', fontWeight: 600, color: '#ffffff',
            letterSpacing: '-0.02em', lineHeight: 1.3, margin: 0,
          }}>
            {t(thesis.subtitle, locale)}
          </h2>
        </div>
        <span style={{
          fontFamily: 'ui-monospace, monospace', fontSize: '11px',
          color: 'rgba(34,197,94,0.9)',
          backgroundColor: 'rgba(34,197,94,0.1)',
          border: '1px solid rgba(34,197,94,0.3)',
          borderRadius: '999px', padding: '4px 12px',
          whiteSpace: 'nowrap', flexShrink: 0, alignSelf: 'flex-start',
        }}>
          {t(thesis.status, locale)}
        </span>
      </div>

      {/* Institution */}
      <p style={{
        fontFamily: 'ui-monospace, monospace', fontSize: '11px',
        color: 'rgba(255,255,255,0.35)', marginBottom: '24px',
      }}>
        {t(thesis.institution, locale)}
      </p>

      {/* Impact body */}
      <p style={{
        fontSize: '14px', color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.8, margin: '0 0 28px 0', maxWidth: '800px',
      }}>
        {t(thesis.impact, locale)}
      </p>

      {/* Adopted by */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <span style={{
          fontFamily: 'ui-monospace, monospace', fontSize: '11px',
          color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {locale === 'es' ? 'Adoptado por' : 'Adopted by'}
        </span>
        {thesis.adoptedBy.map(institution => (
          <span key={institution} style={{
            fontFamily: 'ui-monospace, monospace', fontSize: '11px',
            color: 'rgba(34,197,94,0.7)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: '999px', padding: '3px 10px',
          }}>
            {institution}
          </span>
        ))}
      </div>

      {/* Stack tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {thesis.stack.map(tag => (
          <span key={tag} translate="no" style={{
            fontFamily: 'ui-monospace, monospace', fontSize: '11px',
            color: 'rgba(255,255,255,0.35)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '999px', padding: '3px 10px',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {(thesis.publicationUrl !== undefined || thesis.repoUrl !== undefined) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '20px' }}>
          {thesis.publicationUrl !== undefined && (
            <a
              href={thesis.publicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontSize: '13px',
                fontFamily: 'ui-monospace, monospace',
                color: '#22c55e',
                textDecoration: 'none',
              }}
            >
              {locale === 'es' ? 'Leer publicación ECCI →' : 'Read ECCI Publication →'}
            </a>
          )}
          {thesis.repoUrl !== undefined && (
            <a
              href={thesis.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontSize: '13px',
                fontFamily: 'ui-monospace, monospace',
                color: '#22c55e',
                textDecoration: 'none',
              }}
            >
              {locale === 'es' ? 'Ver repositorio →' : 'View Repo →'}
            </a>
          )}
        </div>
      )}
    </section>
  )
}

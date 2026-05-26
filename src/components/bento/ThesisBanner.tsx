import { useLocation } from 'react-router-dom'
import { thesis } from '../../data/resume'
import { getLocaleFromPath, t } from '../../lib/locale'

export default function ThesisBanner() {
  const locale = getLocaleFromPath(useLocation().pathname)
  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      padding: '32px 40px',
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
          {t(thesis.title, locale)} — {t(thesis.subtitle, locale)}
        </h2>
        <span style={{
          fontFamily: 'ui-monospace, monospace', fontSize: '11px',
          color: 'rgba(34,197,94,0.9)',
          backgroundColor: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: '999px', padding: '3px 10px',
          whiteSpace: 'nowrap',
        }}>
          {t(thesis.status, locale)}
        </span>
      </div>

      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 24px 0', maxWidth: '860px' }}>
        {t(thesis.impact, locale)}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {thesis.stack.map(tag => (
          <span key={tag} translate="no" style={{
            fontFamily: 'ui-monospace, monospace', fontSize: '11px',
            color: 'rgba(255,255,255,0.35)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '999px', padding: '3px 10px',
            whiteSpace: 'nowrap',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {thesis.publicationUrl !== undefined && (
        <a
          href={thesis.publicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            fontSize: '13px',
            fontFamily: 'ui-monospace, monospace',
            color: '#22c55e',
            textDecoration: 'none',
          }}
        >
          Read ECCI Publication →
        </a>
      )}
    </div>
  )
}

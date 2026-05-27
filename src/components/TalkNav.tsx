import { Link } from 'react-router-dom'
import { useLocale } from '../lib/locale'

// Mirrors BlogNav layout/styling. Same chrome, different label.
export function TalkNav() {
  const locale = useLocale()

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 24px',
        backgroundColor: 'rgba(10,10,10,0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Link
        to="/"
        style={{
          justifySelf: 'start',
          color: '#ffffff',
          textDecoration: 'none',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '-0.02em',
        }}
      >
        lucholabs.dev
      </Link>

      <span
        style={{
          color: 'rgba(255,255,255,0.55)',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {locale === 'es' ? 'Charla' : 'Talk'}
      </span>

      <Link
        to="/"
        aria-label="Back to home"
        style={{
          justifySelf: 'end',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.65)',
          textDecoration: 'none',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '12px',
        }}
      >
        ← Home
      </Link>
    </nav>
  )
}

import { Rss } from 'lucide-react'
import { Link } from 'react-router-dom'

export function BlogNav() {
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
        Blog
      </span>

      <a
        href="/blog/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="RSS feed"
        style={{
          justifySelf: 'end',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.08)',
          color: 'rgba(255,255,255,0.65)',
        }}
      >
        <Rss size={16} strokeWidth={1.75} />
      </a>
    </nav>
  )
}

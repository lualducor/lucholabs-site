import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'all 0.2s ease',
      }}
    >
      <span
        title="Coming soon"
        aria-label="Blog — coming soon"
        style={{
          fontSize: '12px',
          fontFamily: 'ui-monospace, monospace',
          color: 'rgba(255,255,255,0.2)',
          padding: '4px 12px',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '999px',
          cursor: 'default',
          userSelect: 'none',
        }}
      >
        Blog ↗
      </span>

      <span
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: '14px',
          fontWeight: 500,
          color: '#ffffff',
          letterSpacing: '-0.02em',
        }}
      >
        lucholabs.dev
      </span>

      <span
        title="Coming soon"
        aria-label="The Lab — coming soon"
        style={{
          fontSize: '12px',
          fontFamily: 'ui-monospace, monospace',
          color: 'rgba(255,255,255,0.2)',
          padding: '4px 12px',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '999px',
          cursor: 'default',
          userSelect: 'none',
        }}
      >
        The Lab ↗
      </span>
    </nav>
  )
}

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const anchorLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'Speaking', href: '#speaking' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function getEsRoute(pathname: string): string {
  if (pathname === '/es' || pathname === '/es/') return '/es/'
  if (pathname.startsWith('/es/')) return pathname
  return pathname === '/' ? '/es/' : `/es${pathname}`
}

function getEnRoute(pathname: string): string {
  if (pathname === '/es' || pathname === '/es/') return '/'
  if (!pathname.startsWith('/es/')) return pathname

  const englishPath = pathname.replace(/^\/es/, '')
  return englishPath === '' ? '/' : englishPath
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isSpanishRoute = pathname === '/es' || pathname.startsWith('/es/')
  const blogRoute = isSpanishRoute ? '/es/blog' : '/blog'
  const homeRoute = isSpanishRoute ? '/es/' : '/'
  const localeToggleLabel = isSpanishRoute ? 'EN' : 'ES'
  const localeToggleRoute = isSpanishRoute ? getEnRoute(pathname) : getEsRoute(pathname)
  const showAnchorSubnav = pathname === '/' || pathname === '/es/'
  const navChromeColor = scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent'
  const navBorderColor = scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
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
        flexDirection: 'column',
        gap: showAnchorSubnav ? '12px' : 0,
        padding: '12px 24px',
        backgroundColor: navChromeColor,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: navBorderColor,
        transition: 'all 0.2s ease',
      }}
    >
      <div
        style={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: '1fr auto 1fr',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifySelf: 'start' }}>
          <Link
            to={blogRoute}
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontFamily: 'ui-monospace, monospace',
              color: 'rgba(255,255,255,0.2)',
              padding: '10px 16px',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '999px',
              textDecoration: 'none',
            }}
          >
            Blog ↗
          </Link>

          <a
            href="/lab"
            style={{
              fontSize: '16px',
              lineHeight: '24px',
              fontFamily: 'ui-monospace, monospace',
              color: 'rgba(255,255,255,0.2)',
              padding: '10px 16px',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '999px',
              textDecoration: 'none',
            }}
          >
            LAB ↗
          </a>
        </div>

        <Link
          to={homeRoute}
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '14px',
            fontWeight: 500,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            textDecoration: 'none',
            justifySelf: 'center',
          }}
        >
          lucholabs.dev
        </Link>

        <Link
          to={localeToggleRoute}
          style={{
            justifySelf: 'end',
            fontSize: '12px',
            lineHeight: '18px',
            fontFamily: 'ui-monospace, monospace',
            color: 'rgba(255,255,255,0.68)',
            padding: '8px 12px',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '999px',
            textDecoration: 'none',
          }}
        >
          {localeToggleLabel}
        </Link>
      </div>

      {showAnchorSubnav && (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {anchorLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '44px',
                  padding: '10px 16px',
                  fontSize: '12px',
                  lineHeight: '18px',
                  fontFamily: 'ui-monospace, monospace',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

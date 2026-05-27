import { Link } from 'react-router-dom'
import { localePrefix, useLocale } from '../lib/locale'

export function NotFoundPage() {
  const locale = useLocale()

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <h1 style={{ fontSize: '36px', letterSpacing: '-0.04em', margin: 0 }}>
          {locale === 'es' ? 'No encontrado' : 'Not found'}
        </h1>
        <Link
          to={localePrefix(locale) || '/'}
          style={{
            color: 'rgba(134,239,172,0.92)',
            textDecoration: 'none',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '12px',
          }}
        >
          {locale === 'es' ? '← Volver al inicio' : '← Back home'}
        </Link>
      </div>
    </main>
  )
}

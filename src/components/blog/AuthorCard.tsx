import { Link } from 'react-router-dom'
import { useLocale } from '../../lib/locale'

export function AuthorCard() {
  const locale = useLocale()
  const labels = locale === 'es'
    ? {
        role: 'Ingeniero de sistemas · conferencista en seguridad de IA · autor de código abierto',
        location: 'Bogotá · Remoto',
        cta: 'Contactar →',
        contactHref: '/es/#contact',
      }
    : {
        role: 'Systems engineer · AI security speaker · Open-source author',
        location: 'Bogotá · Remote',
        cta: 'Get in touch →',
        contactHref: '/#contact',
      }
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '32px', marginTop: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img
          src="/photo.jpg"
          alt="Luis Alberto Duarte Cortés"
          width={40}
          height={40}
          style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 600, fontSize: '0.9rem' }}>
            Luis Alberto Duarte Cortés
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: '2px' }}>
            {labels.role}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '2px' }}>
            {labels.location}
          </div>
        </div>
        <Link
          to={labels.contactHref}
          style={{
            color: 'rgba(99,102,241,0.85)',
            fontSize: '0.8rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {labels.cta}
        </Link>
      </div>
    </div>
  )
}

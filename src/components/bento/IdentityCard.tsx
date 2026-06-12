import { identity } from '../../data/resume'
import type { Locale } from '../../lib/locale'

interface IdentityCardProps {
  locale: Locale
}

export default function IdentityCard({ locale }: IdentityCardProps) {
  const isSpanish = locale === 'es'
  const imageSrc = identity.image.url || identity.photo
  const webpSrc = imageSrc.replace(/\.jpe?g$/, '.webp')

  return (
    <aside className="card bento-card bento-identity" data-reveal>
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={imageSrc}
          alt={identity.image.caption || identity.name}
          width={72}
          height={72}
          fetchPriority="high"
          loading="eager"
        />
      </picture>
      <div>
        <div className="bento-name">{identity.name}</div>
        <div className="bento-meta">
          {isSpanish ? 'INGENIERO DE SISTEMAS' : 'SYSTEMS ENGINEER'}
          <br />
          {isSpanish ? 'BOGOTÁ · REMOTO · HORARIO EE. UU.' : 'BOGOTÁ · REMOTE · US OVERLAP'}
        </div>
      </div>
      <div className="bento-status-line">
        <span className="pulse-dot bento-dot" />
        {isSpanish ? 'LISTO PARA REMOTO' : 'REMOTE READY'}
      </div>
    </aside>
  )
}

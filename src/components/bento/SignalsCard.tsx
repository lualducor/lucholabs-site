import { Link } from 'react-router-dom'
import { speaking } from '../../data/resume'
import type { Locale } from '../../lib/locale'

interface SignalsCardProps {
  locale: Locale
}

export default function SignalsCard({ locale }: SignalsCardProps) {
  const isSpanish = locale === 'es'
  const talk = speaking[0]
  const recapUrl = talk?.recapUrl
    ? isSpanish
      ? `/es${talk.recapUrl}`
      : talk.recapUrl
    : undefined

  return (
    <section className="card bento-card bento-signals" data-reveal>
      <span className="bento-label">{isSpanish ? 'Charlas y señales' : 'Speaking & signals'}</span>
      {talk && (
        <div>
          {talk.photo && (
            <Link
              to={recapUrl ?? '#'}
              tabIndex={recapUrl ? undefined : -1}
              aria-hidden={recapUrl ? undefined : true}
              className="bento-signals-photo"
            >
              <img
                src={talk.photo}
                alt={`${talk.event} · ${talk.location}`}
                loading="lazy"
              />
            </Link>
          )}
          {recapUrl ? (
            <Link to={recapUrl} className="bento-event">
              {talk.event} — {talk.location}
            </Link>
          ) : (
            <span className="bento-event">
              {talk.event} — {talk.location}
            </span>
          )}
          <div className="bento-event-meta">
            {isSpanish ? 'PANELISTA · MAYO 2026' : 'PANELIST · MAY 2026'}
          </div>
        </div>
      )}
      <div className="bento-chips">
        <span className="bento-chip">
          {isSpanish ? 'Inglés ' : 'English '}
          <strong>C1</strong>
        </span>
        <span className="bento-chip">{isSpanish ? 'Constructor local-first' : 'Local-first builder'}</span>
        <span className="bento-chip">
          {isSpanish ? 'Conferencista en seguridad de IA' : 'AI security speaker'}
        </span>
      </div>
    </section>
  )
}

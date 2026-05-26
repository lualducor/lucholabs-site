import { useLocation } from 'react-router-dom'
import { card, mono } from './styles'
import { speaking } from '../../data/resume'
import { getLocaleFromPath, t } from '../../lib/locale'

export default function SpeakingPhotoCard() {
  const locale = getLocaleFromPath(useLocation().pathname)
  const talk = speaking.find(entry => entry.status === 'past' && entry.photo)
  if (!talk) return null

  return (
    <div style={{ ...card, padding: 0, overflow: 'hidden', gap: 0 }}>
      <div
        className="aspect-[4/3]"
        style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
      >
        <img
          src={talk.photo}
          alt={`${talk.event} · ${talk.location} · ${talk.date}`}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{ padding: '16px 20px' }}>
        <p style={{ ...mono, marginBottom: '6px' }}>Conference · {talk.date}</p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
          {talk.event} · {talk.location} · {talk.date} — {t(talk.topic, locale)}
        </p>
      </div>
    </div>
  )
}

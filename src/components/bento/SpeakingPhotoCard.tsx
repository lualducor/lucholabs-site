import { card, mono } from './styles'
import { speaking } from '../../data/resume'

export default function SpeakingPhotoCard() {
  const talk = speaking.find(t => t.status === 'past' && t.photo)
  if (!talk) return null

  return (
    <div style={{ ...card, padding: 0, overflow: 'hidden', gap: 0 }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        <img
          src={talk.photo}
          alt={`${talk.event} · ${talk.location} · ${talk.date}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{ padding: '16px 20px' }}>
        <p style={{ ...mono, marginBottom: '6px' }}>Conference · {talk.date}</p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
          {talk.event} · {talk.location} · {talk.date} — {talk.topic}
        </p>
      </div>
    </div>
  )
}

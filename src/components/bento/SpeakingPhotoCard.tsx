import { card, mono } from './styles'

export default function SpeakingPhotoCard() {
  return (
    <div style={{ ...card, padding: 0, overflow: 'hidden', gap: 0 }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        <img
          src="/speaking.jpg"
          alt="Luis Alberto Duarte Cortés speaking at Cybersecurity Forum, Bogotá 2025"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{ padding: '16px 20px' }}>
        <p style={{ ...mono, marginBottom: '6px' }}>Conference · 2025</p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
          Cybersecurity Forum · Bogotá · 2025 — Egresado panelist on network security and infrastructure.
        </p>
      </div>
    </div>
  )
}

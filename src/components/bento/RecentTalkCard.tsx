import { useLocation } from 'react-router-dom'
import { card, mono } from './styles'
import { speaking } from '../../data/resume'
import { getLocaleFromPath, t } from '../../lib/locale'

export default function RecentTalkCard() {
  const locale = getLocaleFromPath(useLocation().pathname)
  // Surface the most recent past talk (speaking array is ordered newest first).
  const talk = speaking.find(entry => entry.status === 'past')
  if (!talk) return null

  const inner = (
    <div style={{
      ...card,
      border: '1px solid rgba(251,191,36,0.2)',
      backgroundColor: 'rgba(251,191,36,0.04)',
      gap: '12px',
      justifyContent: 'center',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <p style={{ ...mono, color: 'rgba(251,191,36,0.8)', margin: 0 }}>{locale === 'es' ? 'Panelista ·' : 'Panelist ·'} {talk.date}</p>
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          backgroundColor: 'rgba(251,191,36,0.8)',
          boxShadow: '0 0 6px rgba(251,191,36,0.5)',
          flexShrink: 0,
        }} />
      </div>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: 500, margin: 0, lineHeight: 1.4 }}>
        {talk.event} · {talk.location}
      </p>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>
        {t(talk.topic, locale)}
      </p>
    </div>
  )

  if (!talk.recapUrl) return inner
  return (
    <a
      href={talk.recapUrl}
      style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}
    >
      {inner}
    </a>
  )
}

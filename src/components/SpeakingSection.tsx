import { speaking } from '../data/resume'
import { talkBadgeLabel, talkBadgeIsPulsing } from '../utils/format'

export default function SpeakingSection() {
  const featuredPastTalk = speaking.find(talk => talk.status === 'past' && talk.photo)
  const featuredUpcomingTalk = speaking.find(talk => talk.status === 'upcoming')
  const talks = speaking.filter(
    talk => talk !== featuredPastTalk && talk !== featuredUpcomingTalk,
  )

  if (talks.length === 0) return null

  return (
    <section aria-label="Speaking" style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: 'ui-monospace, monospace', fontSize: '11px',
        color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
        letterSpacing: '0.1em', fontWeight: 'normal', margin: '0 0 24px 0',
      }}>
        Speaking
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {talks.map(talk => {
          const label = talkBadgeLabel(talk.status)
          const pulsing = talkBadgeIsPulsing(talk.status)

          return (
            <div
              key={`${talk.event}-${talk.date}`}
              style={{
                display: 'grid',
                gridTemplateColumns: talk.photo ? '280px 1fr' : '1fr',
                gap: '0',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
              className="speaking-card"
            >
              {talk.photo && (
                <div style={{ overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={talk.photo}
                    alt={`${talk.event} · ${talk.location} · ${talk.date}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}

              <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {pulsing && (
                    <span className="animate-pulse" style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      backgroundColor: '#22c55e',
                      boxShadow: '0 0 6px rgba(34,197,94,0.7)',
                      display: 'inline-block', flexShrink: 0,
                    }} />
                  )}
                  <span style={{
                    fontFamily: 'ui-monospace, monospace', fontSize: '11px',
                    color: pulsing ? 'rgba(34,197,94,0.9)' : 'rgba(255,255,255,0.4)',
                    backgroundColor: pulsing ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${pulsing ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '999px', padding: '3px 10px',
                    whiteSpace: 'nowrap',
                  }}>
                    {label}
                  </span>
                </div>

                {/* Event + meta */}
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0', letterSpacing: '-0.01em' }}>
                    {talk.event}
                  </p>
                  <p style={{
                    fontFamily: 'ui-monospace, monospace', fontSize: '11px',
                    color: 'rgba(255,255,255,0.35)', margin: 0,
                  }}>
                    {talk.location} · {talk.date}
                  </p>
                </div>

                {/* Topic */}
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                  {talk.topic}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 639px) {
          .speaking-card { grid-template-columns: 1fr !important; }
          .speaking-card img { max-height: 180px; }
        }
      `}</style>
    </section>
  )
}

import { card, mono } from './styles'
import { identity } from '../../data/resume'

export default function IdentityCard() {
  return (
    <div style={{ ...card, alignItems: 'center', textAlign: 'center', gap: '16px', justifyContent: 'center' }}>
      {/* Avatar */}
      <div style={{
        width: '96px', height: '96px', borderRadius: '50%',
        border: '2px solid rgba(34,197,94,0.4)',
        boxShadow: '0 0 20px rgba(34,197,94,0.15)',
        overflow: 'hidden', flexShrink: 0,
      }}>
        <img
          src={identity.photo}
          alt="Luis Alberto Duarte Cortés"
          width={96}
          height={96}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
          {identity.name}
        </h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, margin: 0 }}>
          {identity.title}
        </p>
        <p style={{ ...mono, marginTop: '2px' }}>{identity.location}</p>
      </div>

      <a
        href={identity.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '13px', fontFamily: 'ui-monospace, monospace',
          color: '#22c55e', textDecoration: 'none',
          padding: '8px 20px',
          border: '1px solid rgba(34,197,94,0.4)', borderRadius: '8px',
          marginTop: '4px', transition: 'background-color 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.backgroundColor = 'rgba(34,197,94,0.08)'
          el.style.borderColor = 'rgba(34,197,94,0.6)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.backgroundColor = 'transparent'
          el.style.borderColor = 'rgba(34,197,94,0.4)'
        }}
      >
        Download CV →
      </a>
    </div>
  )
}

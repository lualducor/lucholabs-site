import { thesis } from '../../data/resume'

export default function ThesisBanner() {
  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      padding: '32px 40px',
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
          {thesis.title} — {thesis.subtitle}
        </h2>
        <span style={{
          fontFamily: 'ui-monospace, monospace', fontSize: '11px',
          color: 'rgba(34,197,94,0.9)',
          backgroundColor: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: '999px', padding: '3px 10px',
          whiteSpace: 'nowrap',
        }}>
          {thesis.status}
        </span>
      </div>

      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 24px 0', maxWidth: '860px' }}>
        {thesis.impact}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {thesis.stack.map(tag => (
          <span key={tag} translate="no" style={{
            fontFamily: 'ui-monospace, monospace', fontSize: '11px',
            color: 'rgba(255,255,255,0.35)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '999px', padding: '3px 10px',
            whiteSpace: 'nowrap',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

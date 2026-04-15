import { projects } from '../data/resume'

export default function ProjectsSection() {
  return (
    <section aria-label="Projects" style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: 'ui-monospace, monospace', fontSize: '11px',
        color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
        letterSpacing: '0.1em', marginBottom: '24px',
        fontWeight: 'normal', margin: '0 0 24px 0',
      }}>
        Projects
      </h2>

      <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {projects.map((p) => (
          <div
            key={p.name}
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '16px', padding: '24px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.01em', margin: 0 }}>
                {p.name}
              </h3>
              <span style={{
                fontSize: '10px', fontFamily: 'ui-monospace, monospace',
                padding: '2px 8px', borderRadius: '999px',
                border: `1px solid ${p.statusColor}`, color: p.statusColor,
                whiteSpace: 'nowrap', marginLeft: '8px', flexShrink: 0,
              }}>
                {p.status}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: 0 }}>
              {p.tagline}
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, flexGrow: 1, margin: 0 }}>
              {p.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {p.stack.map(t => (
                <span key={t} style={{
                  fontSize: '10px', fontFamily: 'ui-monospace, monospace',
                  padding: '2px 8px', borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.35)',
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .projects-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 639px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

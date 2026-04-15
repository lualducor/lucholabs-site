import { experience } from '../data/resume'

export default function ExperienceSection() {
  return (
    <section aria-label="Work experience" style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: 'ui-monospace, monospace', fontSize: '11px',
        color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
        letterSpacing: '0.1em', marginBottom: '24px',
        fontWeight: 'normal', margin: '0 0 24px 0',
      }}>
        Experience
      </h2>

      <div>
        {experience.map((exp) => (
          <div key={exp.company} className="exp-row" style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '24px',
            padding: '24px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                {exp.company}
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'ui-monospace, monospace', margin: 0 }}>
                {exp.period}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                {exp.role}
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>
                {exp.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {exp.tags.map(t => (
                  <span key={t} style={{
                    fontSize: '11px', fontFamily: 'ui-monospace, monospace',
                    padding: '2px 8px', borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.35)',
                  }} translate="no">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .exp-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  )
}

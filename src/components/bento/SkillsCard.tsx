import { card, mono, pill } from './styles'
import { skills } from '../../data/resume'

export default function SkillsCard() {
  return (
    <div style={{ ...card, gap: '14px' }}>
      <h2 style={{ ...mono, fontWeight: 'normal', margin: 0 }}>Skills</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <p style={{ ...mono, fontSize: '10px', marginBottom: '6px', color: 'rgba(255,255,255,0.3)' }}>Core</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.core.map(s => (
              <span key={s} translate="no" style={pill('rgba(34,197,94,0.5)')}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
          <p style={{ ...mono, fontSize: '10px', marginBottom: '6px', color: 'rgba(255,255,255,0.3)' }}>Tooling</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.tooling.map(s => (
              <span key={s} translate="no" style={pill('rgba(255,255,255,0.35)')}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

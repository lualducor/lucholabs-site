import { card, mono, pill } from './styles'
import { skills } from '../../data/resume'

export default function SkillsCard() {
  return (
    <div style={{ ...card, gap: '10px' }}>
      <h2 style={{ ...mono, fontWeight: 'normal', margin: 0 }}>Skills</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {skills.map(s => (
          <span key={s} translate="no" style={pill('rgba(255,255,255,0.35)')}>{s}</span>
        ))}
      </div>
    </div>
  )
}

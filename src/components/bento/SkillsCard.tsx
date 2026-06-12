import { useLocation } from 'react-router-dom'
import { card, mono, pill } from './styles'
import { skills } from '../../data/resume'
import { getLocaleFromPath, t } from '../../lib/locale'

export default function SkillsCard() {
  const locale = getLocaleFromPath(useLocation().pathname)
  return (
    <div id="skills" data-reveal style={{ ...card, gap: '14px', scrollMarginTop: '160px' }}>
      <h2 style={{ ...mono, fontWeight: 'normal', margin: 0 }}>{locale === 'es' ? 'Habilidades' : 'Skills'}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <p style={{ ...mono, fontSize: '10px', marginBottom: '6px', color: 'rgba(255,255,255,0.3)' }}>{locale === 'es' ? 'Núcleo' : 'Core'}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.core.map(skill => {
              const text = t(skill, locale)
              return <span key={text} translate="no" style={pill('rgba(34,197,94,0.9)')}>{text}</span>
            })}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
          <p style={{ ...mono, fontSize: '10px', marginBottom: '6px', color: 'rgba(255,255,255,0.3)' }}>{locale === 'es' ? 'Herramientas' : 'Tooling'}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.tooling.map(skill => {
              const text = t(skill, locale)
              return <span key={text} translate="no" style={pill('rgba(255,255,255,0.55)')}>{text}</span>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

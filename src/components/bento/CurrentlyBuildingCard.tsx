import { useLocation } from 'react-router-dom'
import { card, mono, pill } from './styles'
import { currentlyBuilding } from '../../data/resume'
import { getLocaleFromPath } from '../../lib/locale'

export default function CurrentlyBuildingCard() {
  const locale = getLocaleFromPath(useLocation().pathname)
  return (
    <div style={{ ...card, gap: '16px', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ ...mono, fontWeight: 'normal', margin: 0 }}>{locale === 'es' ? 'Construyendo ahora' : 'Currently Building'}</h2>
        <span style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: '10px',
          color: 'rgba(34,197,94,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            backgroundColor: 'rgba(34,197,94,0.7)',
            display: 'inline-block',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          {locale === 'es' ? 'Activo' : 'Active'}
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {currentlyBuilding.map(t => (
          <span key={t} translate="no" style={pill('rgba(34,197,94,0.8)')}>{t}</span>
        ))}
      </div>
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', margin: 0, lineHeight: 1.5 }}>
        {locale === 'es' ? 'Proyectos paralelos explorando fintech, pipelines de automatización, herramientas de accesibilidad y herramientas de desarrollo asistidas por IA.' : 'Side projects exploring fintech, automation pipelines, accessibility tooling, and AI-assisted developer tools.'}
      </p>
    </div>
  )
}

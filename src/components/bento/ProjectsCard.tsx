import { card, mono, pill } from './styles'
import { activeProjects, killedProjects } from '../../data/resume'
import { getLocaleFromPath } from '../../lib/locale'
import { useLocation } from 'react-router-dom'

export default function ProjectsCard() {
  const { pathname } = useLocation()
  const locale = pathname === '/es' ? 'es' : getLocaleFromPath(pathname)
  const labPrefix = locale === 'es' ? '/es/lab' : '/lab'

  const heading = locale === 'es' ? 'Proyectos' : 'Projects'
  const activeLabel = locale === 'es' ? 'Activos' : 'Active'
  const deadLabel = locale === 'es' ? 'Muertos' : 'Dead'

  return (
    <div style={{ ...card, gap: '14px', scrollMarginTop: '160px' }}>
      <h2 style={{ ...mono, fontWeight: 'normal', margin: 0 }}>{heading}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <p style={{ ...mono, fontSize: '10px', marginBottom: '6px', color: 'rgba(255,255,255,0.3)' }}>{activeLabel}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {activeProjects.map(p => (
              <a
                key={p.slug}
                href={`${labPrefix}/${p.slug}`}
                translate="no"
                style={{ ...pill('rgba(34,197,94,0.5)'), textDecoration: 'none', cursor: 'pointer' }}
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
          <p style={{ ...mono, fontSize: '10px', marginBottom: '6px', color: 'rgba(255,255,255,0.3)' }}>{deadLabel}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {killedProjects.map(p => (
              <a
                key={p.slug}
                href={`${labPrefix}/archive#${p.slug}`}
                translate="no"
                style={{ ...pill('rgba(255,255,255,0.35)'), textDecoration: 'none', cursor: 'pointer' }}
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useLocation } from 'react-router-dom'
import type { ManifestoEntry } from '../data/loader'
import { getLocaleFromPath } from '../lib/locale'
import { projects } from '../data/resume'
import { card, mono, pill } from './bento/styles'

interface ManifestoTeaserSectionProps {
  manifesto?: ManifestoEntry[]
}

export default function ManifestoTeaserSection({ manifesto }: ManifestoTeaserSectionProps) {
  const { pathname } = useLocation()
  const locale = pathname === '/es' ? 'es' : getLocaleFromPath(pathname)

  const labLink = locale === 'es' ? '/es/lab' : '/lab'
  const labelText = locale === 'es' ? 'Filosofía del Lab' : 'Lab Philosophy'
  const headingText = locale === 'es' ? 'Cómo construyo.' : 'How I build.'
  const teaserText =
    locale === 'es'
      ? 'Infraestructura sobre interfaces. Local-first por defecto. La misma mirada de sistemas en fintech, seguridad y agricultura.'
      : 'Infrastructure over interfaces. Local-first by default. The same systems lens across fintech, security, and agriculture.'
  const ctaText =
    locale === 'es'
      ? 'Abrir el manifiesto completo →'
      : 'Open the full manifesto →'
  const principlesText = locale === 'es' ? `${manifesto?.length ?? 0} principios` : `${manifesto?.length ?? 0} principles`

  // Hide entirely if manifesto data is missing (defensive — should always have data now that /lab is live)
  if (!manifesto?.length) return null

  const citedProjects = manifesto
    // haycorte stays in the lab archive / Graveyard, just not surfaced as a pill here
    .filter(entry => entry.citationProjectSlug !== 'haycorte')
    .map(entry => {
      const citedProject = projects.find(project => project.slug === entry.citationProjectSlug)
      return citedProject?.name ?? entry.citationProjectSlug
    })

  return (
    <section
      aria-labelledby="manifesto-teaser-heading"
      style={{ ...card, marginBottom: '48px', gap: '18px' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: '220px' }}>
          <p style={{ ...mono, margin: 0 }}>
            {labelText}
          </p>
          <h2
            id="manifesto-teaser-heading"
            style={{
              fontSize: '24px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: '#ffffff',
              margin: 0,
            }}
          >
            {headingText}
          </h2>
        </div>

        <span style={pill('rgba(34,197,94,0.5)')}>
          {principlesText}
        </span>
      </div>

      <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: '72ch' }}>
        {teaserText}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {citedProjects.map(projectName => (
          <span key={projectName} translate="no" style={pill('rgba(255,255,255,0.35)')}>
            {projectName}
          </span>
        ))}
      </div>

      <a
        href={labLink}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          alignSelf: 'flex-start',
          padding: '8px 14px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.62)',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '12px',
          textDecoration: 'none',
          transition: 'background-color 0.15s, border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={event => {
          const element = event.currentTarget as HTMLAnchorElement
          element.style.backgroundColor = 'rgba(255,255,255,0.04)'
          element.style.borderColor = 'rgba(255,255,255,0.18)'
          element.style.color = 'rgba(255,255,255,0.82)'
        }}
        onMouseLeave={event => {
          const element = event.currentTarget as HTMLAnchorElement
          element.style.backgroundColor = 'transparent'
          element.style.borderColor = 'rgba(255,255,255,0.1)'
          element.style.color = 'rgba(255,255,255,0.62)'
        }}
      >
        {ctaText}
      </a>
    </section>
  )
}

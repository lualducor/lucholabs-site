import { useLocation } from 'react-router-dom'
import { headlineProject, otherProjects } from '../data/resume'
import { getLocaleFromPath, t } from '../lib/locale'

export default function ProjectsSection() {
  const heroProject = headlineProject && !headlineProject.isKilled ? headlineProject : undefined
  const { pathname } = useLocation()
  const locale = pathname === '/es' ? 'es' : getLocaleFromPath(pathname)
  const labPrefix = locale === 'es' ? '/es/lab' : '/lab'

  return (
    <section id="projects" aria-label={locale === 'es' ? 'Proyectos' : 'Projects'} style={{ marginBottom: '48px', scrollMarginTop: '160px' }}>
      <h2 style={{
        fontFamily: 'ui-monospace, monospace', fontSize: '11px',
        color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase',
        letterSpacing: '0.1em', fontWeight: 'normal', margin: '0 0 24px 0',
      }}>
        {locale === 'es' ? 'Proyectos' : 'Projects'}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {heroProject && (
          <a
            href={`${labPrefix}/${heroProject.slug}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <article
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                transition: 'border-color 0.15s, background-color 0.15s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.32)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    margin: 0,
                  }}>
                    {locale === 'es' ? 'Proyecto Principal' : 'Headline Project'}
                  </p>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
                    {heroProject.name}
                  </h3>
                </div>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'ui-monospace, monospace',
                  padding: '3px 8px',
                  borderRadius: '999px',
                  border: `1px solid ${heroProject.statusColor}`,
                  color: heroProject.statusColor,
                  whiteSpace: 'nowrap',
                }}>
                  {t(heroProject.status, locale)}
                </span>
              </div>

              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, margin: 0 }}>
                {t(heroProject.cvTagline, locale)}
              </p>

              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, margin: 0, maxWidth: '72ch' }}>
                {t(heroProject.cvDescription, locale)}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {heroProject.stack.map(tag => (
                  <span key={tag} translate="no" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '10px',
                    fontFamily: 'ui-monospace, monospace',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.35)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </a>
        )}

        {otherProjects.length > 0 && (
          <>
            <h3 style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.32)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 'normal',
              margin: heroProject ? '8px 0 0 0' : '0',
            }}>
              {locale === 'es' ? 'Otros experimentos' : 'Other experiments'}
            </h3>

            <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {otherProjects.map(project => (
                <a
                  key={project.slug}
                  href={`${labPrefix}/${project.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <article
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      transition: 'border-color 0.15s, background-color 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.01em', margin: 0 }}>
                        {project.name}
                      </h4>
                      <span style={{
                        fontSize: '10px',
                        fontFamily: 'ui-monospace, monospace',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        border: `1px solid ${project.statusColor}`,
                        color: project.statusColor,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}>
                        {t(project.status, locale)}
                      </span>
                    </div>

                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.48)', lineHeight: 1.6, margin: 0 }}>
                      {t(project.cvTagline, locale)}
                    </p>
                  </article>
                </a>
              ))}
            </div>
          </>
        )}
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

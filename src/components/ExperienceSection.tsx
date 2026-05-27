import { useLocation } from 'react-router-dom'
import { experience } from '../data/resume'
import { getLocaleFromPath, t } from '../lib/locale'

export default function ExperienceSection() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)

  return (
    <section id="experience" aria-label={locale === 'es' ? 'Experiencia laboral' : 'Work experience'} style={{ marginBottom: '48px', scrollMarginTop: '160px' }}>
      <h2 style={{
        fontFamily: 'ui-monospace, monospace', fontSize: '11px',
        color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
        letterSpacing: '0.1em', marginBottom: '24px',
        fontWeight: 'normal', margin: '0 0 24px 0',
      }}>
        {locale === 'es' ? 'Experiencia' : 'Experience'}
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
                {t(exp.period, locale)}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                {t(exp.role, locale)}
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>
                {t(exp.description, locale)}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {exp.tags.map(tag => {
                  const tagText = t(tag, locale)
                  return (
                    <span key={tagText} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: '11px', fontFamily: 'ui-monospace, monospace',
                      padding: '2px 8px', borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.35)',
                    }} translate="no">{tagText}</span>
                  )
                })}
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

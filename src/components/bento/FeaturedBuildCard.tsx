import { activeProjects, t } from '../../data/resume'
import type { Locale } from '../../lib/locale'

interface FeaturedBuildCardProps {
  locale: Locale
}

export default function FeaturedBuildCard({ locale }: FeaturedBuildCardProps) {
  const isSpanish = locale === 'es'
  const boveda = activeProjects.find(project => project.slug === 'boveda')

  if (!boveda) return null

  return (
    <section className="card bento-card bento-featured" data-reveal>
      <span className="bento-label">{isSpanish ? 'Proyecto destacado' : 'Featured build'}</span>
      <h2>{boveda.name}</h2>
      <p>{t(boveda.description, locale)}</p>
      <a href={isSpanish ? '/es/lab/boveda' : '/lab/boveda'} className="bento-link">
        {isSpanish ? 'Ver el build log' : 'Read the build log'}
      </a>
    </section>
  )
}

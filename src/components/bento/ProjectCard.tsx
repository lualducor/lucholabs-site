import type { Project } from '../../data/resume'
import { t } from '../../data/resume'
import type { Locale } from '../../lib/locale'

interface ProjectCardProps {
  project: Project
  index: number
  locale: Locale
}

export default function ProjectCard({ project, index, locale }: ProjectCardProps) {
  const isSpanish = locale === 'es'

  return (
    <section className="card bento-card bento-project" data-reveal>
      <span className="bento-label">
        {isSpanish ? 'Proyecto' : 'Project'} · {String(index).padStart(2, '0')}
      </span>
      <h3>{project.name}</h3>
      <p>{t(project.tagline, locale)}</p>
      <div className="bento-project-status">
        <span className="pulse-dot bento-dot" />
        {t(project.status, locale).toUpperCase()}
      </div>
    </section>
  )
}

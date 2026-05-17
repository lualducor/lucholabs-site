import { useLocation } from 'react-router-dom'
import { projects } from '../data/resume'
import type { ManifestoEntry } from '../data/loader'
import { getLocaleFromPath, t } from '../lib/locale'

interface ManifestoTeaserSectionProps {
  manifesto?: ManifestoEntry[]
}

export default function ManifestoTeaserSection({ manifesto }: ManifestoTeaserSectionProps) {
  const { pathname } = useLocation()
  const locale = pathname === '/es' ? 'es' : getLocaleFromPath(pathname)

  if (!manifesto?.length) {
    return (
      <section aria-labelledby="manifesto-teaser-heading" className="mb-20 rounded-[20px] border border-white/8 bg-white/[0.03] p-6 sm:p-8">
        <div className="mb-4">
          <p className="mb-3 font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-white/45">
            Lab Philosophy
          </p>
          <h2 id="manifesto-teaser-heading" className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[28px]">
            How I Build.
          </h2>
        </div>
        <p className="text-sm leading-7 text-white/60">
          Manifesto coming soon.
        </p>
      </section>
    )
  }

  return (
    <section aria-labelledby="manifesto-teaser-heading" className="mb-20 rounded-[20px] border border-white/8 bg-white/[0.03] p-6 sm:p-8">
      <div className="mb-8">
        <p className="mb-3 font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-white/45">
          Lab Philosophy
        </p>
        <h2 id="manifesto-teaser-heading" className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[28px]">
          How I Build.
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {manifesto.map((pillar) => {
          const project = projects.find(p => p.slug === pillar.citationProjectSlug)

          return (
            <article key={`${pillar.title}-${pillar.citationProjectSlug}`} className="rounded-2xl border border-white/8 bg-black/20 p-5">
              <h3 className="mb-3 text-base font-semibold tracking-[-0.01em] text-white">
                {pillar.title}
              </h3>
              <p className="text-sm leading-7 text-white/60">
                {t(pillar.body, locale)}
              </p>
              {project && (
                <a
                  href={`/lab#${project.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-white/75 transition hover:text-white"
                >
                  {`→ see ${project.name}`}
                </a>
              )}
            </article>
          )
        })}
      </div>

      <a
        href="/lab#manifesto"
        className="mt-6 inline-flex text-sm font-medium text-white/75 transition hover:text-white"
      >
        Read the full manifesto →
      </a>
    </section>
  )
}

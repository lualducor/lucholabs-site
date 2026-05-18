import { useLocation } from 'react-router-dom'
import type { ManifestoEntry } from '../data/loader'
import { getLocaleFromPath } from '../lib/locale'

interface ManifestoTeaserSectionProps {
  manifesto?: ManifestoEntry[]
}

export default function ManifestoTeaserSection({ manifesto }: ManifestoTeaserSectionProps) {
  const { pathname } = useLocation()
  const locale = pathname === '/es' ? 'es' : getLocaleFromPath(pathname)

  const labLink = locale === 'es' ? '/es/lab' : '/lab'
  const labelText = locale === 'es' ? 'Filosofía del Lab' : 'Lab Philosophy'
  const headingText = locale === 'es' ? 'Cómo construyo.' : 'How I Build.'
  const teaserText =
    locale === 'es'
      ? 'Infraestructura, no interfaces. Local-first por defecto. Sistemas que cruzan dominios.'
      : 'Infrastructure, not interfaces. Local-first by default. Systems thinking across domains.'
  const ctaText =
    locale === 'es'
      ? 'Leer el manifiesto completo en /lab →'
      : 'Read the full manifesto at /lab →'

  // Hide entirely if manifesto data is missing (defensive — should always have data now that /lab is live)
  if (!manifesto?.length) return null

  return (
    <section aria-labelledby="manifesto-teaser-heading" className="mb-20 rounded-[20px] border border-white/8 bg-white/[0.03] p-6 sm:p-8">
      <p className="mb-3 font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-white/45">
        {labelText}
      </p>
      <h2 id="manifesto-teaser-heading" className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[28px]">
        {headingText}
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/60">
        {teaserText}
      </p>
      <a
        href={labLink}
        className="mt-5 inline-flex text-sm font-medium text-white/75 transition hover:text-white"
      >
        {ctaText}
      </a>
    </section>
  )
}

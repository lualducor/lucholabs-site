import { identity, t } from '../../data/resume'
import type { Locale } from '../../lib/locale'

interface HeroCardProps {
  locale: Locale
}

function TitleWithAccent({ locale }: HeroCardProps) {
  const title = t(identity.title, locale)
  const accentText = locale === 'es' ? 'usuarios hispanohablantes' : 'Spanish-speaking users'
  const [before, after] = title.split(accentText)

  if (after === undefined) return <>{title}</>

  return (
    <>
      {before}
      <em className="bento-accent">{accentText}</em>
      {after}
    </>
  )
}

export default function HeroCard({ locale }: HeroCardProps) {
  const isSpanish = locale === 'es'

  return (
    <section className="card bento-card bento-hero" data-reveal>
      <span className="bento-kicker">FORWARD-DEPLOYED ENGINEERING</span>
      <h1>
        <TitleWithAccent locale={locale} />
      </h1>
      <p className="bento-sub">
        {isSpanish
          ? 'Sistemas de IA, automatización y defensa contra prompt injection, diseñados en Bogotá y desplegados donde estén los usuarios.'
          : 'AI systems, automation, and prompt-injection defense, designed in Bogotá and deployed wherever the users are.'}
      </p>
      <div className="bento-ctas">
        <a href={isSpanish ? '/es/lab' : '/lab'} className="bento-btn bento-btn-solid">
          {isSpanish ? 'IR AL LAB →' : 'GO TO THE LAB →'}
        </a>
        <a href="#experience" className="bento-btn bento-btn-ghost">
          {isSpanish ? 'Ver experiencia' : 'View experience'}
        </a>
      </div>
    </section>
  )
}

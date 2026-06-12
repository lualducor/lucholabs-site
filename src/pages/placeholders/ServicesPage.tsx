import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import contentJson from '../../data/content.json'
import { localePrefix, t, useLocale, type LocaleString } from '../../lib/locale'

interface ServiceOffer {
  title: LocaleString
  description?: LocaleString
  items?: LocaleString[]
}

interface ContentSection {
  heading: LocaleString
  body?: LocaleString | LocaleString[]
}

interface FaqItem {
  question: LocaleString
  answer: LocaleString
}

interface ServicesPageContent {
  published: boolean
  slots: {
    heading: LocaleString
    intro?: LocaleString
    offers: ServiceOffer[]
    sections?: ContentSection[]
    faq?: FaqItem[]
  }
}

const source = contentJson as typeof contentJson & {
  servicesPage?: ServicesPageContent
}

const servicesPage: ServicesPageContent = source.servicesPage ?? {
  published: false,
  slots: {
    heading: source.urlNamespaces.services.title,
    intro: source.urlNamespaces.services.tagline,
    offers: [],
  },
}

const scaffoldSpacing = `
  .scaffold-page { padding: 9rem 1.5rem 6rem; }
  .scaffold-page .mx-auto { margin-inline: auto; }
  .scaffold-page .mt-3 { margin-top: .75rem; }
  .scaffold-page .mt-4 { margin-top: 1rem; }
  .scaffold-page .mt-5 { margin-top: 1.25rem; }
  .scaffold-page .mt-6 { margin-top: 1.5rem; }
  .scaffold-page .mt-7 { margin-top: 1.75rem; }
  .scaffold-page .mt-8 { margin-top: 2rem; }
  .scaffold-page .mt-9 { margin-top: 2.25rem; }
  .scaffold-page .mt-12 { margin-top: 3rem; }
  .scaffold-page .mb-5 { margin-bottom: 1.25rem; }
  .scaffold-page .mb-6 { margin-bottom: 1.5rem; }
  .scaffold-page .p-4 { padding: 1rem; }
  .scaffold-page .p-6 { padding: 1.5rem; }
  .scaffold-page .p-7 { padding: 1.75rem; }
  .scaffold-page .px-5 { padding-inline: 1.25rem; }
  .scaffold-page .py-5 { padding-block: 1.25rem; }
  .scaffold-page .py-12 { padding-block: 3rem; }
  .scaffold-page .pb-12 { padding-bottom: 3rem; }
  .scaffold-page .space-y-3 > :not(:last-child) { margin-bottom: .75rem; }
  .scaffold-page .space-y-4 > :not(:last-child) { margin-bottom: 1rem; }
`

function PageHead({
  title,
  description,
  noIndex,
}: {
  title: string
  description: string
  noIndex: boolean
}) {
  useEffect(() => {
    const previousTitle = document.title
    const descriptions = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="description"]'))
    const robots = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'))
    const previousDescriptions = descriptions.map(meta => meta.content)
    const previousRobots = robots.map(meta => meta.content)

    document.title = title
    descriptions.forEach(meta => { meta.content = description })
    robots.forEach(meta => { meta.content = noIndex ? 'noindex, nofollow' : 'index, follow' })

    return () => {
      document.title = previousTitle
      descriptions.forEach((meta, index) => { meta.content = previousDescriptions[index] })
      robots.forEach((meta, index) => { meta.content = previousRobots[index] })
    }
  }, [description, noIndex, title])

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </>
  )
}

function InProgressState() {
  const locale = useLocale()
  const homeHref = `${localePrefix(locale)}/#projects`

  const copy = locale === 'es'
    ? {
        label: 'Servicios · en preparación',
        title: 'La oferta todavía está en el taller.',
        body: 'Estoy convirtiendo mi trabajo en sistemas de IA y automatización en una oferta pequeña, clara y responsable. Publicaré esta página cuando el alcance, la forma de entrega y los límites estén listos para sostener una conversación honesta.',
        status: ['Alcance en definición', 'Entrega en prueba', 'Casos en documentación'],
        cta: 'Ver lo que construyo',
      }
    : {
        label: 'Services · in progress',
        title: 'The offer is still in the workshop.',
        body: 'I am turning my AI systems and automation work into a small, clear, responsible service offer. This page will go live when the scope, delivery model, and boundaries are ready for an honest conversation.',
        status: ['Scope being defined', 'Delivery being tested', 'Proof being documented'],
        cta: 'See what I build',
      }

  return (
    <section className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
      <div>
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
          {copy.label}
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-white sm:text-7xl">
          {copy.title}
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
          {copy.body}
        </p>
        <Link
          className="mt-9 inline-flex min-h-11 items-center rounded-full border border-[#22c55e]/25 bg-[#22c55e]/[0.06] px-5 font-mono text-xs text-[#22c55e] transition hover:border-[#22c55e]/50 hover:bg-[#22c55e]/[0.1]"
          to={homeHref}
        >
          {copy.cta} →
        </Link>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#22c55e]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
            build status
          </span>
        </div>
        <ul className="space-y-4">
          {copy.status.map((item, index) => (
            <li className="flex items-center gap-3 text-sm text-white/60" key={item}>
              <span className="font-mono text-[10px] text-white/20">0{index + 1}</span>
              <span className="h-px flex-1 bg-white/10" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ServicesPage() {
  const locale = useLocale()
  const { published, slots } = servicesPage
  const heading = t(slots.heading, locale) || (locale === 'es' ? 'Servicios' : 'Services')
  const description = published
    ? t(slots.intro, locale)
    : locale === 'es'
      ? 'La oferta de servicios de LuchoLabs está en preparación.'
      : 'The LuchoLabs service offer is currently in progress.'

  return (
    <>
      <PageHead
        title={`${heading} — LuchoLabs`}
        description={description}
        noIndex={!published}
      />
      <Nav />
      <main className="scaffold-page min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
        {!published ? (
          <InProgressState />
        ) : (
          <div className="mx-auto max-w-5xl">
            <header className="max-w-3xl border-b border-white/10 pb-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                LuchoLabs · {locale === 'es' ? 'Servicios' : 'Services'}
              </p>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
                {heading}
              </h1>
              {slots.intro && (
                <p className="mt-7 text-lg leading-8 text-white/55">
                  {t(slots.intro, locale)}
                </p>
              )}
            </header>

            <section className="grid gap-5 py-12 md:grid-cols-2" aria-label={locale === 'es' ? 'Ofertas' : 'Offers'}>
              {slots.offers.map(offer => (
                <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-7" key={t(offer.title, locale)}>
                  <h2 className="text-2xl font-medium tracking-[-0.03em]">{t(offer.title, locale)}</h2>
                  {offer.description && (
                    <p className="mt-4 leading-7 text-white/55">{t(offer.description, locale)}</p>
                  )}
                  {offer.items && (
                    <ul className="mt-6 space-y-3 text-sm text-white/60">
                      {offer.items.map(item => <li key={t(item, locale)}>→ {t(item, locale)}</li>)}
                    </ul>
                  )}
                </article>
              ))}
            </section>

            {slots.sections?.map(section => (
              <section className="border-t border-white/10 py-12" key={t(section.heading, locale)}>
                <h2 className="text-3xl font-medium tracking-[-0.04em]">{t(section.heading, locale)}</h2>
                {section.body && (
                  <div className="mt-5 max-w-3xl space-y-4 leading-8 text-white/55">
                    {(Array.isArray(section.body) ? section.body : [section.body]).map(paragraph => (
                      <p key={t(paragraph, locale)}>{t(paragraph, locale)}</p>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {slots.faq && slots.faq.length > 0 && (
              <section className="border-t border-white/10 py-12" aria-labelledby="services-faq">
                <h2 className="text-3xl font-medium tracking-[-0.04em]" id="services-faq">
                  {locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
                </h2>
                <div className="mt-7 divide-y divide-white/10">
                  {slots.faq.map(item => (
                    <details className="group py-5" key={t(item.question, locale)}>
                      <summary className="cursor-pointer list-none text-lg text-white/80">
                        {t(item.question, locale)}
                      </summary>
                      <p className="mt-3 max-w-3xl leading-7 text-white/50">{t(item.answer, locale)}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
      <style>{scaffoldSpacing}</style>
    </>
  )
}

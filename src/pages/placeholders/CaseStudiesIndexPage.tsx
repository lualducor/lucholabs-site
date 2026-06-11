import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import contentJson from '../../data/content.json'
import { localePrefix, t, useLocale, type LocaleString } from '../../lib/locale'

interface CaseStudySection {
  heading?: LocaleString
  title?: LocaleString
  body?: LocaleString | LocaleString[]
  items?: LocaleString[]
}

interface CaseStudyFaqItem {
  question: LocaleString
  answer: LocaleString
}

interface CaseStudyEntry {
  slug: string
  published: boolean
  title: LocaleString
  summary?: LocaleString
  sections: CaseStudySection[]
  faq?: CaseStudyFaqItem[]
}

interface CaseStudiesPageContent {
  published: boolean
  heading?: LocaleString
  intro?: LocaleString
  entries: CaseStudyEntry[]
  faq?: CaseStudyFaqItem[]
}

const source = contentJson as typeof contentJson & {
  caseStudiesPage?: CaseStudiesPageContent
}

const caseStudiesPage: CaseStudiesPageContent = source.caseStudiesPage ?? {
  published: false,
  heading: source.urlNamespaces['case-studies'].title,
  intro: source.urlNamespaces['case-studies'].tagline,
  entries: [],
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
  const projectsHref = `${localePrefix(locale)}/#projects`
  const copy = locale === 'es'
    ? {
        label: 'Casos de estudio · en preparación',
        title: 'Sin teatro de portafolio.',
        body: 'Estoy documentando el trabajo con el detalle que merece: restricciones reales, decisiones difíciles, lo que falló y lo que cambió. Hasta que esa historia esté completa, no voy a disfrazar un resumen como caso de estudio.',
        aside: 'Primero la evidencia. Después la publicación.',
        cta: 'Explorar proyectos',
      }
    : {
        label: 'Case studies · in progress',
        title: 'No portfolio theater.',
        body: 'I am documenting the work at the level it deserves: real constraints, hard decisions, what failed, and what changed. Until that story is complete, I will not dress up a summary and call it a case study.',
        aside: 'Evidence first. Publication second.',
        cta: 'Explore projects',
      }

  return (
    <section className="mx-auto max-w-5xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-300/70">
        {copy.label}
      </p>
      <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_280px] lg:items-end">
        <div>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            {copy.body}
          </p>
          <Link
            className="mt-9 inline-flex min-h-11 items-center rounded-full border border-sky-300/25 bg-sky-300/[0.06] px-5 font-mono text-xs text-sky-200 transition hover:border-sky-300/50 hover:bg-sky-300/[0.1]"
            to={projectsHref}
          >
            {copy.cta} →
          </Link>
        </div>
        <blockquote className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 text-xl leading-8 tracking-[-0.025em] text-white/65">
          “{copy.aside}”
        </blockquote>
      </div>
    </section>
  )
}

export function CaseStudiesIndexPage() {
  const locale = useLocale()
  const { published, entries, faq } = caseStudiesPage
  const heading = t(caseStudiesPage.heading, locale) || (locale === 'es' ? 'Casos de estudio' : 'Case studies')
  const description = published
    ? t(caseStudiesPage.intro, locale)
    : locale === 'es'
      ? 'Los casos de estudio de LuchoLabs están en preparación.'
      : 'LuchoLabs case studies are currently in progress.'
  const publishedEntries = entries.filter(entry => entry.published)
  const basePath = `${localePrefix(locale)}/case-studies`

  return (
    <>
      <PageHead
        title={`${heading} — LuchoLabs`}
        description={description}
        noIndex={!published}
      />
      <Nav />
      <main className="scaffold-page min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 h-[460px] bg-[radial-gradient(circle_at_50%_-10%,rgba(125,211,252,0.11),transparent_58%)]"
        />

        {!published ? (
          <InProgressState />
        ) : (
          <div className="mx-auto max-w-5xl">
            <header className="max-w-3xl border-b border-white/10 pb-12">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-300/70">
                LuchoLabs · {locale === 'es' ? 'Trabajo documentado' : 'Documented work'}
              </p>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
                {heading}
              </h1>
              {caseStudiesPage.intro && (
                <p className="mt-7 text-lg leading-8 text-white/55">
                  {t(caseStudiesPage.intro, locale)}
                </p>
              )}
            </header>

            <section className="grid gap-5 py-12 md:grid-cols-2" aria-label={heading}>
              {publishedEntries.map(entry => (
                <Link
                  className="group rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition hover:border-sky-300/30 hover:bg-sky-300/[0.04]"
                  key={entry.slug}
                  to={`${basePath}/${entry.slug}`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
                    {entry.slug}
                  </p>
                  <h2 className="mt-5 text-2xl font-medium tracking-[-0.035em]">
                    {t(entry.title, locale)}
                  </h2>
                  {entry.summary && (
                    <p className="mt-4 leading-7 text-white/50">{t(entry.summary, locale)}</p>
                  )}
                  <span className="mt-8 inline-block font-mono text-xs text-sky-200/70 transition group-hover:text-sky-200">
                    {locale === 'es' ? 'Leer el caso' : 'Read the case'} →
                  </span>
                </Link>
              ))}
            </section>

            {faq && faq.length > 0 && (
              <section className="border-t border-white/10 py-12" aria-labelledby="case-studies-faq">
                <h2 className="text-3xl font-medium tracking-[-0.04em]" id="case-studies-faq">
                  {locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
                </h2>
                <div className="mt-7 divide-y divide-white/10">
                  {faq.map(item => (
                    <details className="py-5" key={t(item.question, locale)}>
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

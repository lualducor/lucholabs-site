import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Nav from '../../components/Nav'
import contentJson from '../../data/content.json'
import { NotFoundPage } from '../NotFoundPage'
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
  entries: CaseStudyEntry[]
}

const source = contentJson as typeof contentJson & {
  caseStudiesPage?: CaseStudiesPageContent
}

const caseStudiesPage: CaseStudiesPageContent = source.caseStudiesPage ?? {
  published: false,
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
  noIndex = false,
}: {
  title: string
  description: string
  noIndex?: boolean
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

function paragraphs(value: LocaleString | LocaleString[] | undefined): LocaleString[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function StudySection({ section, index }: { section: CaseStudySection; index: number }) {
  const locale = useLocale()
  const heading = section.heading ?? section.title

  return (
    <section className="grid gap-6 border-t border-white/10 py-12 md:grid-cols-[140px_1fr]">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
        {String(index + 1).padStart(2, '0')}
      </p>
      <div>
        {heading && (
          <h2 className="text-3xl font-medium tracking-[-0.04em]">{t(heading, locale)}</h2>
        )}
        {section.body && (
          <div className="mt-5 max-w-3xl space-y-4 text-base leading-8 text-white/55">
            {paragraphs(section.body).map(paragraph => (
              <p key={t(paragraph, locale)}>{t(paragraph, locale)}</p>
            ))}
          </div>
        )}
        {section.items && (
          <ul className="mt-6 grid gap-3 text-sm text-white/60 sm:grid-cols-2">
            {section.items.map(item => (
              <li className="rounded-2xl border border-white/10 bg-white/[0.02] p-4" key={t(item, locale)}>
                {t(item, locale)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export function CaseStudyPage() {
  const locale = useLocale()
  const { slug } = useParams<{ slug: string }>()
  const entry = caseStudiesPage.entries.find(candidate => candidate.slug === slug)

  if (!caseStudiesPage.published || !entry?.published) {
    return (
      <>
        <PageHead
          title={locale === 'es' ? 'No encontrado — LuchoLabs' : 'Not found — LuchoLabs'}
          description=""
          noIndex
        />
        <NotFoundPage />
      </>
    )
  }

  const title = t(entry.title, locale)
  const description = t(entry.summary, locale)
  const indexHref = `${localePrefix(locale)}/case-studies`

  return (
    <>
      <PageHead title={`${title} — LuchoLabs`} description={description} />
      <Nav />
      <main className="scaffold-page min-h-screen bg-[#0a0a0a] text-white">
        <article className="mx-auto max-w-5xl">
          <header className="max-w-4xl pb-12">
            <Link className="font-mono text-xs text-sky-200/65 hover:text-sky-200" to={indexHref}>
              ← {locale === 'es' ? 'Casos de estudio' : 'Case studies'}
            </Link>
            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-sky-300/70">
              {entry.slug}
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
              {title}
            </h1>
            {entry.summary && (
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/55">
                {description}
              </p>
            )}
          </header>

          {entry.sections.map((section, index) => (
            <StudySection index={index} key={`${entry.slug}-${index}`} section={section} />
          ))}

          {entry.faq && entry.faq.length > 0 && (
            <section className="border-t border-white/10 py-12" aria-labelledby="case-study-faq">
              <h2 className="text-3xl font-medium tracking-[-0.04em]" id="case-study-faq">
                {locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
              </h2>
              <div className="mt-7 divide-y divide-white/10">
                {entry.faq.map(item => (
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
        </article>
      </main>
      <style>{scaffoldSpacing}</style>
    </>
  )
}

import { useEffect } from 'react'
import Nav from '../components/Nav'
import contentJson from '../data/content.json'
import { t, useLocale, type LocaleString } from '../lib/locale'

interface UsesItem {
  name: string
  note: LocaleString
  url?: string
}

interface UsesCategory {
  title: LocaleString
  items: UsesItem[]
}

interface UsesContent {
  intro: LocaleString
  categories: UsesCategory[]
}

const usesContent: UsesContent = contentJson.uses

function PageHead({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    const previousTitle = document.title
    const descriptions = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="description"]'))
    const previousDescriptions = descriptions.map(meta => meta.content)

    document.title = title
    descriptions.forEach(meta => { meta.content = description })

    return () => {
      document.title = previousTitle
      descriptions.forEach((meta, index) => { meta.content = previousDescriptions[index] })
    }
  }, [description, title])

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  )
}

export function UsesPage() {
  const locale = useLocale()
  const copy = locale === 'es'
    ? {
        label: 'LuchoLabs · Herramientas',
        title: 'Herramientas',
        categoryLabel: 'Categoría',
        externalLink: 'Abrir sitio de',
      }
    : {
        label: 'LuchoLabs · Uses',
        title: 'Uses',
        categoryLabel: 'Category',
        externalLink: 'Open website for',
      }
  const description = t(usesContent.intro, locale)

  return (
    <>
      <PageHead title={`${copy.title} — LuchoLabs`} description={description} />
      <Nav />
      <main className="min-h-screen overflow-hidden bg-[#0a0a0a] px-6 pb-24 pt-36 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 h-[460px] bg-[radial-gradient(circle_at_50%_-10%,rgba(52,211,153,0.12),transparent_58%)]"
        />

        <div className="relative mx-auto max-w-5xl">
          <header className="max-w-3xl border-b border-white/10 pb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300/70">
              {copy.label}
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-7 text-lg leading-8 text-white/55">
              {description}
            </p>
          </header>

          <div className="divide-y divide-white/10">
            {usesContent.categories.map((category, categoryIndex) => (
              <section
                aria-labelledby={`uses-category-${categoryIndex}`}
                className="grid gap-7 py-12 md:grid-cols-[0.7fr_1.3fr]"
                key={t(category.title, locale)}
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
                    {copy.categoryLabel} · {String(categoryIndex + 1).padStart(2, '0')}
                  </p>
                  <h2
                    className="mt-3 text-3xl font-medium tracking-[-0.04em]"
                    id={`uses-category-${categoryIndex}`}
                  >
                    {t(category.title, locale)}
                  </h2>
                </div>

                <div className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.025] px-6">
                  {category.items.map(item => {
                    const externalUrl = item.url?.trim()

                    return (
                      <article className="grid gap-2 py-6 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)_auto] sm:items-baseline sm:gap-5" key={item.name}>
                        <h3 className="font-medium tracking-[-0.02em] text-white/85">
                          {item.name}
                        </h3>
                        <p className="text-sm leading-7 text-white/45">
                          {t(item.note, locale)}
                        </p>
                        {externalUrl && (
                          <a
                            aria-label={`${copy.externalLink} ${item.name}`}
                            className="font-mono text-sm text-emerald-300/70 transition hover:text-emerald-200"
                            href={externalUrl}
                            rel="noreferrer"
                            target="_blank"
                          >
                            ↗
                          </a>
                        )}
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

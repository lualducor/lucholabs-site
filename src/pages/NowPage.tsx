import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import contentJson from '../data/content.json'
import { localePrefix, t, useLocale, type LocaleString } from '../lib/locale'

interface NowContent {
  updated: string
  intro: LocaleString
  focus: LocaleString[]
  next: LocaleString[]
}

const nowContent: NowContent = contentJson.now

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

export function NowPage() {
  const locale = useLocale()
  const prefix = localePrefix(locale)
  const copy = locale === 'es'
    ? {
        label: 'LuchoLabs · Ahora',
        title: 'Ahora',
        updated: 'Actualizado',
        focus: 'En foco',
        next: 'Siguiente',
        lab: 'Explorar el lab',
        blog: 'Leer el blog',
      }
    : {
        label: 'LuchoLabs · Now',
        title: 'Now',
        updated: 'Updated',
        focus: 'Focus',
        next: 'Next',
        lab: 'Explore the lab',
        blog: 'Read the blog',
      }
  const description = t(nowContent.intro, locale)

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
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
              {copy.updated} · {nowContent.updated}
            </p>
          </header>

          <div className="grid gap-5 py-12 md:grid-cols-2">
            <section
              aria-labelledby="now-focus"
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-7"
            >
              <h2
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300/70"
                id="now-focus"
              >
                {copy.focus}
              </h2>
              <ul className="mt-7 divide-y divide-white/10">
                {nowContent.focus.map((item, index) => (
                  <li className="flex gap-4 py-5 first:pt-0 last:pb-0" key={t(item, locale)}>
                    <span className="font-mono text-[10px] text-white/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-7 text-white/65">{t(item, locale)}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="now-next"
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-7"
            >
              <h2
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35"
                id="now-next"
              >
                {copy.next}
              </h2>
              <ul className="mt-7 divide-y divide-white/10">
                {nowContent.next.map((item, index) => (
                  <li className="flex gap-4 py-5 first:pt-0 last:pb-0" key={t(item, locale)}>
                    <span className="font-mono text-[10px] text-white/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-7 text-white/55">{t(item, locale)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <nav aria-label={locale === 'es' ? 'Más de LuchoLabs' : 'More from LuchoLabs'} className="flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-11 items-center rounded-full border border-emerald-300/25 bg-emerald-300/[0.06] px-5 font-mono text-xs text-emerald-200 transition hover:border-emerald-300/50 hover:bg-emerald-300/[0.1]"
              href={`${prefix}/lab`}
            >
              {copy.lab} →
            </a>
            <Link
              className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/[0.025] px-5 font-mono text-xs text-white/60 transition hover:border-white/20 hover:text-white/80"
              to={`${prefix}/blog`}
            >
              {copy.blog} →
            </Link>
          </nav>
        </div>
      </main>
    </>
  )
}

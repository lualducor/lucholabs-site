import { Link } from 'react-router-dom'
import {
  certificates,
  contact,
  experience,
  identity,
  skills,
  speaking,
  thesis,
} from '../../data/resume'
import { loadContent } from '../../data/loader'
import { localePrefix, t, useLocale, type LocaleString } from '../../lib/locale'
import '../../styles/print.css'

type PrintContent = {
  printCv?: {
    summary: LocaleString
  }
}

const printContent = loadContent() as ReturnType<typeof loadContent> & PrintContent

function contactText(href: string) {
  return href
    .replace(/^mailto:/, '')
    .replace(/^https?:\/\/(www\.)?/, '')
    .replace(/\/$/, '')
}

export function PrintPage() {
  const locale = useLocale()
  const isSpanish = locale === 'es'
  const summary = t(printContent.printCv?.summary ?? identity.title, locale)

  const labels = isSpanish
    ? {
        back: 'Volver al sitio',
        print: 'Imprimir / Guardar como PDF',
        summary: 'Perfil',
        experience: 'Experiencia',
        thesis: 'Proyecto destacado',
        skills: 'Habilidades',
        core: 'Principales',
        tooling: 'Herramientas',
        certificates: 'Certificaciones',
        speaking: 'Charlas',
        adoptedBy: 'Adoptado por',
      }
    : {
        back: 'Back to site',
        print: 'Print / Save as PDF',
        summary: 'Profile',
        experience: 'Experience',
        thesis: 'Featured project',
        skills: 'Skills',
        core: 'Core',
        tooling: 'Tooling',
        certificates: 'Certificates',
        speaking: 'Speaking',
        adoptedBy: 'Adopted by',
      }

  return (
    <div className="print-cv-shell">
      <div className="print-cv-toolbar" data-print-hidden>
        <Link to={`${localePrefix(locale)}/`}>{labels.back}</Link>
        <button type="button" onClick={() => window.print()}>
          {labels.print}
        </button>
      </div>

      <main className="print-cv-page">
        <header className="print-cv-header">
          <div className="print-cv-identity">
            <p className="print-cv-kicker">LuchoLabs / CV</p>
            <h1>{identity.name}</h1>
            {identity.roleLine && <p className="print-cv-role">{t(identity.roleLine, locale)}</p>}
            <p className="print-cv-location">{t(identity.subtitle, locale)}</p>
          </div>

          <address className="print-cv-contact" aria-label={isSpanish ? 'Contacto' : 'Contact'}>
            {contact.map(item => (
              <a href={item.href} key={item.label}>
                <span>{item.label}</span>
                {contactText(item.href)}
              </a>
            ))}
          </address>
        </header>

        <section className="print-cv-summary" aria-labelledby="print-summary-title">
          <h2 id="print-summary-title">{labels.summary}</h2>
          <p>{summary}</p>
        </section>

        <div className="print-cv-columns">
          <div className="print-cv-primary">
            <section className="print-cv-section" aria-labelledby="print-experience-title">
              <h2 id="print-experience-title">{labels.experience}</h2>
              <div className="print-cv-stack">
                {experience.map(entry => (
                  <article className="print-cv-entry" key={`${entry.company}-${t(entry.role, locale)}`}>
                    <div className="print-cv-entry-heading">
                      <div>
                        <h3>{t(entry.role, locale)}</h3>
                        <p className="print-cv-organization">{entry.company}</p>
                      </div>
                      <p className="print-cv-date">{t(entry.period, locale)}</p>
                    </div>
                    <p>{t(entry.description, locale)}</p>
                    <ul className="print-cv-tags" aria-label={isSpanish ? 'Tecnologías' : 'Technologies'}>
                      {entry.tags.map(tag => (
                        <li key={t(tag, locale)}>{t(tag, locale)}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="print-cv-section print-cv-thesis" aria-labelledby="print-thesis-title">
              <h2 id="print-thesis-title">{labels.thesis}</h2>
              <article className="print-cv-entry">
                <div className="print-cv-entry-heading">
                  <div>
                    <h3>{t(thesis.subtitle, locale)}</h3>
                    <p className="print-cv-organization">{t(thesis.title, locale)}</p>
                  </div>
                  <p className="print-cv-date">{t(thesis.status, locale)}</p>
                </div>
                <p className="print-cv-meta">{t(thesis.institution, locale)}</p>
                <p>{t(thesis.impact, locale)}</p>
                <p className="print-cv-adoption">
                  <strong>{labels.adoptedBy}:</strong> {thesis.adoptedBy.join(' · ')}
                </p>
                <ul className="print-cv-tags" aria-label={isSpanish ? 'Tecnologías' : 'Technologies'}>
                  {thesis.stack.map(item => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </section>
          </div>

          <aside className="print-cv-secondary">
            <section className="print-cv-section print-cv-compact" aria-labelledby="print-skills-title">
              <h2 id="print-skills-title">{labels.skills}</h2>
              <h3 className="print-cv-list-label">{labels.core}</h3>
              <ul className="print-cv-skill-list">
                {skills.core.map(skill => <li key={t(skill, locale)}>{t(skill, locale)}</li>)}
              </ul>
              <h3 className="print-cv-list-label">{labels.tooling}</h3>
              <ul className="print-cv-skill-list">
                {skills.tooling.map(skill => <li key={t(skill, locale)}>{t(skill, locale)}</li>)}
              </ul>
            </section>

            <section className="print-cv-section print-cv-compact" aria-labelledby="print-certificates-title">
              <h2 id="print-certificates-title">{labels.certificates}</h2>
              <div className="print-cv-stack">
                {certificates.map(certificate => (
                  <article className="print-cv-entry" key={`${certificate.issuer}-${certificate.date}`}>
                    <h3>{t(certificate.title, locale)}</h3>
                    <p className="print-cv-meta">
                      {certificate.issuer} · {certificate.date}
                    </p>
                    <p>{certificate.topics.map(topic => t(topic, locale)).join(' · ')}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="print-cv-section print-cv-compact" aria-labelledby="print-speaking-title">
              <h2 id="print-speaking-title">{labels.speaking}</h2>
              <div className="print-cv-stack">
                {speaking.map(talk => (
                  <article className="print-cv-entry" key={`${talk.event}-${talk.date}`}>
                    <h3>{talk.event}</h3>
                    <p className="print-cv-meta">{talk.location} · {talk.date}</p>
                    <p>{t(talk.topic, locale)}</p>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}

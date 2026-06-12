import { activeProjects } from '../data/resume'
import { useLocale } from '../lib/locale'
import FeaturedBuildCard from './bento/FeaturedBuildCard'
import HeroCard from './bento/HeroCard'
import IdentityCard from './bento/IdentityCard'
import ProjectCard from './bento/ProjectCard'
import SignalsCard from './bento/SignalsCard'

const projectSlugs = ['boveda', 'anti-phishing-shield', 'superfarm']

export default function BentoGrid() {
  const locale = useLocale()
  const projectCards = projectSlugs
    .map(slug => activeProjects.find(project => project.slug === slug))
    .filter(project => project !== undefined)

  return (
    <section
      className="bento"
      aria-label={locale === 'es' ? 'Tablero de trabajo' : 'Work grid'}
    >
      <HeroCard locale={locale} />
      <IdentityCard locale={locale} />
      <FeaturedBuildCard locale={locale} />
      <SignalsCard locale={locale} />

      {projectCards.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={index + 1}
          locale={locale}
        />
      ))}

      <style>{`
        .bento {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 48px;
        }

        .bento-card {
          border: 1px solid rgba(255,255,255,0.05);
          padding: 28px;
          transition: border-color 160ms ease;
        }
        .bento-card:hover,
        .bento-card:focus-within {
          border-color: rgba(255,255,255,0.1);
        }

        .bento-label {
          display: block;
          margin-bottom: 16px;
          color: rgba(255,255,255,0.45);
          font-family: ui-monospace, 'SF Mono', 'Fira Code', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .bento-accent {
          color: #22c55e;
          font-style: normal;
        }
        .bento-dot {
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #22c55e;
        }
        .bento-link {
          display: inline-block;
          margin-top: 18px;
          color: #22c55e;
          font-family: ui-monospace, 'SF Mono', 'Fira Code', monospace;
          font-size: 13px;
          text-decoration: none;
        }
        .bento-link::after {
          content: " ↗";
        }
        .bento-link:focus-visible,
        .bento-btn:focus-visible,
        .bento-event:focus-visible {
          outline: 1px solid #22c55e;
          outline-offset: 4px;
        }

        .bento-hero {
          grid-column: 1 / span 8;
          display: flex;
          flex-direction: column;
          padding: 40px;
        }
        .bento-kicker {
          color: rgba(255,255,255,0.45);
          font-family: ui-monospace, 'SF Mono', 'Fira Code', monospace;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .bento-hero h1 {
          max-width: 20ch;
          margin-top: 18px;
          font-size: clamp(28px, 3.6vw, 42px);
          font-weight: 600;
          letter-spacing: -0.015em;
          line-height: 1.15;
        }
        .bento-sub {
          max-width: 48ch;
          margin-top: 16px;
          color: rgba(255,255,255,0.45);
          font-size: 16px;
          line-height: 1.6;
        }
        .bento-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: auto;
          padding-top: 32px;
        }
        .bento-btn {
          border: 1px solid #22c55e;
          padding: 12px 22px;
          color: #22c55e;
          font-family: ui-monospace, 'SF Mono', 'Fira Code', monospace;
          font-size: 13px;
          text-decoration: none;
          transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
        }
        .bento-btn-solid {
          background: #22c55e;
          color: #052e16;
          font-weight: 600;
        }
        .bento-btn-solid:hover {
          background: transparent;
          color: #22c55e;
        }
        .bento-btn-ghost {
          border-color: rgba(255,255,255,0.1);
          color: #ffffff;
        }
        .bento-btn-ghost:hover {
          border-color: #22c55e;
        }

        .bento-identity {
          grid-column: 9 / span 4;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }
        .bento-identity img {
          display: block;
          width: 72px;
          height: 72px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
        }
        .bento-name {
          font-size: 17px;
          font-weight: 600;
        }
        .bento-meta {
          color: rgba(255,255,255,0.45);
          font-family: ui-monospace, 'SF Mono', 'Fira Code', monospace;
          font-size: 12px;
          line-height: 1.9;
        }
        .bento-status-line {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: auto;
          color: #22c55e;
          font-family: ui-monospace, 'SF Mono', 'Fira Code', monospace;
          font-size: 12px;
        }

        .bento-featured {
          grid-column: 1 / span 7;
        }
        .bento-featured h2 {
          max-width: 26ch;
          font-size: 22px;
          font-weight: 600;
          line-height: 1.3;
        }
        .bento-featured p {
          max-width: 54ch;
          margin-top: 12px;
          color: rgba(255,255,255,0.45);
          font-size: 15px;
          line-height: 1.6;
        }

        .bento-signals {
          grid-column: 8 / span 5;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .bento-event {
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          line-height: 1.45;
          text-decoration: none;
        }
        a.bento-event:hover {
          color: #22c55e;
        }
        .bento-event-meta {
          margin-top: 6px;
          color: rgba(255,255,255,0.45);
          font-family: ui-monospace, 'SF Mono', 'Fira Code', monospace;
          font-size: 11px;
        }
        .bento-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .bento-chip {
          border: 1px solid rgba(255,255,255,0.1);
          padding: 5px 11px;
          color: #ffffff;
          font-family: ui-monospace, 'SF Mono', 'Fira Code', monospace;
          font-size: 12px;
        }
        .bento-chip strong {
          color: #22c55e;
          font-weight: 600;
        }

        .bento-project {
          grid-column: span 4;
        }
        .bento-project h3 {
          font-size: 16px;
          font-weight: 600;
        }
        .bento-project p {
          margin-top: 8px;
          color: rgba(255,255,255,0.45);
          font-size: 14px;
          line-height: 1.55;
        }
        .bento-project-status {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          color: #22c55e;
          font-family: ui-monospace, 'SF Mono', 'Fira Code', monospace;
          font-size: 11px;
        }

        @media (max-width: 760px) {
          .bento {
            grid-template-columns: minmax(0, 1fr);
          }
          .bento-hero,
          .bento-identity,
          .bento-featured,
          .bento-signals,
          .bento-project {
            grid-column: 1;
          }
          .bento-hero {
            padding: 28px;
          }
          .bento-identity {
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
          }
          .bento-identity .bento-status-line {
            width: 100%;
            margin-top: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bento,
          .bento *,
          .bento *::before,
          .bento *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}

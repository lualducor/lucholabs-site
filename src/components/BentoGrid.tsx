import IdentityCard from './bento/IdentityCard'
import StatCard from './bento/StatCard'
import CurrentlyBuildingCard from './bento/CurrentlyBuildingCard'
import MiniExperienceCard from './bento/MiniExperienceCard'
import SkillsCard from './bento/SkillsCard'
import ThesisBanner from './bento/ThesisBanner'
import SpeakingPhotoCard from './bento/SpeakingPhotoCard'
import UpcomingTalkCard from './bento/UpcomingTalkCard'
import { stats, bentExperience } from '../data/resume'

export default function BentoGrid() {
  return (
    <section style={{ marginBottom: '80px' }}>
      {/*
        Breakpoints:
          < 640px  → 1 column (mobile)
          640–1023px → 2 columns (tablet)
          ≥ 1024px → 3 columns (desktop)
      */}
      <div className="bento-grid">
        {/* Identity — tall card, spans 2 rows on desktop */}
        <div className="bento-identity">
          <IdentityCard />
        </div>

        {/* Stat cards */}
        {stats.map(s => (
          <StatCard key={s.label} {...s} />
        ))}

        {/* Currently Building — spans 2 cols on desktop */}
        <div className="bento-building">
          <CurrentlyBuildingCard />
        </div>

        {/* Mini experience cards */}
        {bentExperience.map(e => (
          <MiniExperienceCard key={e.company} {...e} />
        ))}

        {/* Skills */}
        <SkillsCard />

        {/* Speaking photo — spans 2 cols on desktop */}
        <div className="bento-speaking">
          <SpeakingPhotoCard />
        </div>

        {/* Upcoming talk */}
        <UpcomingTalkCard />
      </div>

      {/* Thesis banner — always full width */}
      <div style={{ marginTop: '12px' }}>
        <ThesisBanner />
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto auto;
        }

        /* Identity card: col 1, rows 1–2 */
        .bento-identity {
          grid-column: 1;
          grid-row: 1 / 3;
          display: flex;
          flex-direction: column;
        }
        .bento-identity > * {
          flex: 1;
        }

        /* Currently Building: cols 2–3 on desktop */
        .bento-building {
          grid-column: 2 / 4;
          grid-row: 2;
        }

        /* Speaking photo: cols 1–2 on desktop */
        .bento-speaking {
          grid-column: 1 / 3;
        }

        /* Tablet: 2 columns, stack differently */
        @media (min-width: 640px) and (max-width: 1023px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .bento-identity {
            grid-column: 1 / 3;
            grid-row: auto;
          }
          .bento-building {
            grid-column: 1 / 3;
            grid-row: auto;
          }
          .bento-speaking {
            grid-column: 1 / 3;
            grid-row: auto;
          }
        }

        /* Mobile: single column */
        @media (max-width: 639px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-identity {
            grid-column: 1;
            grid-row: auto;
          }
          .bento-building {
            grid-column: 1;
            grid-row: auto;
          }
          .bento-speaking {
            grid-column: 1;
            grid-row: auto;
          }
        }
      `}</style>
    </section>
  )
}

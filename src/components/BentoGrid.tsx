import IdentityCard from './bento/IdentityCard'
import StatCard from './bento/StatCard'
import CurrentlyBuildingCard from './bento/CurrentlyBuildingCard'
import MiniExperienceCard from './bento/MiniExperienceCard'
import SkillsCard from './bento/SkillsCard'
import SpeakingPhotoCard from './bento/SpeakingPhotoCard'
import RecentTalkCard from './bento/RecentTalkCard'
import ProjectsCard from './bento/ProjectsCard'
import { stats, bentExperience } from '../data/resume'

export default function BentoGrid() {
  const [stat1, stat2] = stats
  const [exp1, exp2] = bentExperience

  return (
    <section
      style={{
        marginBottom: '48px',
        padding: '20px',
        borderRadius: '24px',
        background: 'linear-gradient(160deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.012) 45%, rgba(255,255,255,0) 100%)',
      }}
    >
      {/*
        Masonry-style 3 column flex layout, height-balanced.
        Column composition picks cards whose natural heights add up close to each
        other, so the three column bottoms align without forcing big internal voids.
        Last card in each column flex-grows to absorb the small residual gap and
        produce a flat bottom edge before the next section.
      */}
      <div className="bento-grid">
        <div className="bento-col bento-col-1">
          <IdentityCard />
          {exp1 && <MiniExperienceCard {...exp1} />}
          {exp2 && <MiniExperienceCard {...exp2} />}
        </div>

        <div className="bento-col bento-col-2">
          {stat1 && <StatCard {...stat1} />}
          <SpeakingPhotoCard />
          {stat2 && <StatCard {...stat2} />}
        </div>

        <div className="bento-col bento-col-3">
          <CurrentlyBuildingCard />
          <SkillsCard />
          <RecentTalkCard />
          <ProjectsCard />
        </div>
      </div>

      <style>{`
        .bento-grid {
          display: flex;
          flex-direction: row;
          gap: 12px;
          align-items: stretch;
        }
        .bento-col {
          flex: 1 1 0;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        /* Make the last card in each column absorb residual space so column
           bottoms align flush. NOW and Projects already handle stretching via
           internal marginTop/divider distribution. The mini-exp at the bottom
           of col 1 stretches a tiny amount and stays visually fine. */
        .bento-col > :last-child {
          flex: 1 1 auto;
        }

        /* Tablet: 2 columns. */
        @media (min-width: 640px) and (max-width: 1023px) {
          .bento-grid {
            flex-wrap: wrap;
          }
          .bento-col-1 { flex-basis: calc(50% - 6px); }
          .bento-col-2 { flex-basis: calc(50% - 6px); }
          .bento-col-3 { flex-basis: 100%; flex-direction: row; flex-wrap: wrap; }
          .bento-col-3 > * { flex: 1 1 calc(50% - 6px); }
        }

        /* Mobile: 1 column. */
        @media (max-width: 639px) {
          .bento-grid {
            flex-direction: column;
          }
          .bento-col {
            flex: 1 1 auto;
          }
        }
      `}</style>
    </section>
  )
}

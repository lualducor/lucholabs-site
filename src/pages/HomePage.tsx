import Nav from '../components/Nav'
import BentoGrid from '../components/BentoGrid'
import ManifestoTeaserSection from '../components/ManifestoTeaserSection'
import ThesisSection from '../components/ThesisSection'
import SpeakingSection from '../components/SpeakingSection'
import CertificatesSection from '../components/CertificatesSection'
import ExperienceSection from '../components/ExperienceSection'
import ProjectsSection from '../components/ProjectsSection'
import ContactSection from '../components/ContactSection'
import EmailCaptureBlock from '../components/EmailCaptureBlock'
import { loadContent } from '../data/loader'

const { manifesto } = loadContent()

export function HomePage() {
  return (
    <div
      className="home-shell"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        minHeight: '100vh',
      }}
    >
      <Nav />
      <main style={{ maxWidth: '1120px', margin: '0 auto', padding: '144px 24px 64px' }}>
        <BentoGrid />
        <ThesisSection />
        <ExperienceSection />
        <ProjectsSection />
        <SpeakingSection />
        <CertificatesSection />
        <ManifestoTeaserSection manifesto={manifesto} />
        <EmailCaptureBlock variant="cv" />
        <ContactSection />
      </main>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .home-shell,
          .home-shell *,
          .home-shell *::before,
          .home-shell *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}

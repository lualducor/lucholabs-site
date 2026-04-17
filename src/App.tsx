import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import BentoGrid from './components/BentoGrid'
import ThesisSection from './components/ThesisSection'
import SpeakingSection from './components/SpeakingSection'
import CertificatesSection from './components/CertificatesSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import './index.css'

export default function App() {
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 80) setShowHint(false) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh' }}>
      <Nav />
      <main style={{ maxWidth: '1152px', margin: '0 auto', padding: '96px 24px 64px' }}>
        <BentoGrid />
        <ThesisSection />
        <SpeakingSection />
        <CertificatesSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {showHint && (
        <div style={{
          position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
          opacity: showHint ? 1 : 0,
          transition: 'opacity 0.4s',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          <span style={{
            fontFamily: 'ui-monospace, monospace', fontSize: '10px',
            color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>scroll</span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '14px', animation: 'scroll-bounce 1.8s ease-in-out infinite' }}>↓</span>
        </div>
      )}

      <style>{`
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(4px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

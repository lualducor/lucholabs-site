import React, { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { trackPageview } from './lib/analytics'
import { HomePage } from './pages/HomePage'
import { BlogIndexPage } from './pages/BlogIndexPage'
import { BlogTagPage } from './pages/BlogTagPage'
import { TalkPage } from './pages/TalkPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ServicesPage } from './pages/placeholders/ServicesPage'
import { CaseStudiesIndexPage } from './pages/placeholders/CaseStudiesIndexPage'
import { CaseStudyPage } from './pages/placeholders/CaseStudyPage'
import { LocaleDocAttr } from './lib/locale'
import { PrintPage } from './pages/placeholders/PrintPage'
import { NowPage } from './pages/NowPage'
import { UsesPage } from './pages/UsesPage'
import { useRevealObserver } from './hooks/useRevealObserver'
import './styles/motion.css'

const BlogPostPage = React.lazy(() =>
  import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })),
)

function BlogPostRoute() {
  return (
    <Suspense fallback={null}>
      <BlogPostPage />
    </Suspense>
  )
}

function PageviewTracker() {
  const location = useLocation()

  useEffect(() => {
    trackPageview(location.pathname)
  }, [location.pathname])

  return null
}

export default function App() {
  useRevealObserver()

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh' }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <PageviewTracker />
      <LocaleDocAttr />
      <div id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/es" element={<HomePage />} />
          <Route path="/es/" element={<HomePage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/es/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostRoute />} />
          <Route path="/es/blog/:slug" element={<BlogPostRoute />} />
          <Route path="/blog/tag/:tag" element={<BlogTagPage />} />
          <Route path="/es/blog/tag/:tag" element={<BlogTagPage />} />
          <Route path="/talks/:slug" element={<TalkPage />} />
          <Route path="/es/talks/:slug" element={<TalkPage />} />
          <Route path="/now" element={<NowPage />} />
          <Route path="/es/now" element={<NowPage />} />
          <Route path="/uses" element={<UsesPage />} />
          <Route path="/es/uses" element={<UsesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/es/services" element={<ServicesPage />} />
          <Route path="/case-studies" element={<CaseStudiesIndexPage />} />
          <Route path="/es/case-studies" element={<CaseStudiesIndexPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/es/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/print" element={<PrintPage />} />
          <Route path="/es/print" element={<PrintPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}

import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { BlogIndexPage } from './pages/BlogIndexPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { BlogTagPage } from './pages/BlogTagPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/blog/tag/:tag" element={<BlogTagPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

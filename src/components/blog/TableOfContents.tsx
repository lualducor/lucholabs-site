import { useEffect, useRef, useState } from 'react'
import { useLocale } from '../../lib/locale'

interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

export function TableOfContents({ proseRef }: { proseRef: React.RefObject<HTMLDivElement | null> }) {
  const locale = useLocale()
  const [headings, setHeadings] = useState<TocEntry[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)
  const contentsLabel = locale === 'es' ? 'Contenido' : 'Contents'

  useEffect(() => {
    const container = proseRef.current
    if (!container) return

    const nodes = Array.from(container.querySelectorAll('h2, h3'))
    const entries: TocEntry[] = nodes
      .filter(el => el.id)
      .map(el => ({
        id: el.id,
        text: el.textContent ?? '',
        level: el.tagName === 'H2' ? 2 : 3,
      }))

    setHeadings(entries)

    if (entries.length < 4) return

    observerRef.current = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 },
    )

    nodes.forEach(el => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [proseRef])

  if (headings.length < 4) return null

  const nav = (
    <ul className="toc-list">
      {headings.map(h => (
        <li key={h.id} className={h.level === 3 ? 'toc-h3' : ''}>
          <a href={`#${h.id}`} className={activeId === h.id ? 'active' : ''}>
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {/* mobile — inline collapsible */}
      <details className="toc-details" style={{ display: 'block' }}>
        <style>{`@media (min-width: 1024px) { .toc-details { display: none !important; } }`}</style>
        <summary>{contentsLabel}</summary>
        <nav>{nav}</nav>
      </details>

      {/* desktop — fixed right rail */}
      <nav
        aria-label="Table of contents"
        style={{
          position: 'fixed',
          right: 'calc((100vw - 860px) / 2 - 220px)',
          top: '120px',
          width: '200px',
          maxHeight: '80vh',
          overflowY: 'auto',
          display: 'none',
        }}
        ref={(el) => {
          if (el) {
            el.style.display = window.innerWidth >= 1024 ? 'block' : 'none'
          }
        }}
      >
        {nav}
      </nav>
    </>
  )
}

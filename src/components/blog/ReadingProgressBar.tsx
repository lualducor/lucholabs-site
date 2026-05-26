import { useEffect, useRef, useState } from 'react'
import { track } from '../../lib/analytics'

export function ReadingProgressBar() {
  const [pct, setPct] = useState(0)
  const firedRef = useRef(new Set<number>())
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const thresholds = [25, 50, 75, 100]

    function update() {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      const progress = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0
      setPct(progress)

      for (const t of thresholds) {
        if (progress >= t && !firedRef.current.has(t)) {
          firedRef.current.add(t)
          track('Scroll depth', { percent: t })
        }
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${pct}%`,
        background: 'rgba(99,102,241,0.8)',
        zIndex: 1000,
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }}
    />
  )
}

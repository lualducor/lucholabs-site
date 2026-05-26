import { useEffect, useRef } from 'react'

// Giscus repo and category IDs must be filled in after running the setup
// documented in docs/giscus-setup.md.
const GISCUS_REPO = 'lualducor/lucholabs-site'
const GISCUS_REPO_ID = '' // fill after setup
const GISCUS_CATEGORY = 'Blog Comments'
const GISCUS_CATEGORY_ID = '' // fill after setup

export function Comments() {
  const containerRef = useRef<HTMLDivElement>(null)
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current || !containerRef.current) return
    if (!GISCUS_REPO_ID || !GISCUS_CATEGORY_ID) return

    loaded.current = true
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.dataset.repo = GISCUS_REPO
    script.dataset.repoId = GISCUS_REPO_ID
    script.dataset.category = GISCUS_CATEGORY
    script.dataset.categoryId = GISCUS_CATEGORY_ID
    script.dataset.mapping = 'pathname'
    script.dataset.strict = '1'
    script.dataset.reactionsEnabled = '1'
    script.dataset.emitMetadata = '0'
    script.dataset.inputPosition = 'top'
    script.dataset.theme = 'dark_dimmed'
    script.dataset.lang = 'en'
    script.dataset.loading = 'lazy'
    containerRef.current.appendChild(script)
  }, [])

  if (!GISCUS_REPO_ID || !GISCUS_CATEGORY_ID) return null

  return (
    <div
      ref={containerRef}
      style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.07)' }}
    />
  )
}

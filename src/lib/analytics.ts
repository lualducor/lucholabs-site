type EventProps = Record<string, string | number>
type PlausibleOptions = {
  props?: EventProps
  u?: string
}

declare global {
  interface Window {
    plausible?: (eventName: string, options?: PlausibleOptions) => void
  }
}

const PLAUSIBLE_SRC = 'https://plausible.io/js/script.js'
const PLAUSIBLE_DOMAIN = 'lucholabs.dev'

if (typeof document !== 'undefined') {
  const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${PLAUSIBLE_SRC}"]`)

  if (!existingScript) {
    const script = document.createElement('script')
    script.defer = true
    script.dataset.domain = PLAUSIBLE_DOMAIN
    script.src = PLAUSIBLE_SRC
    document.head.appendChild(script)
  }
}

export function track(eventName: string, props?: EventProps): void {
  if (typeof window === 'undefined') {
    return
  }

  window.plausible?.(eventName, { props })
}

export function trackPageview(path: string): void {
  if (typeof window === 'undefined') {
    return
  }

  window.plausible?.('pageview', { u: path })
}

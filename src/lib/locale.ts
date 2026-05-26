import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export type Locale = 'en' | 'es'

export type LocaleString = string | { en: string; es: string }

export function t(value: LocaleString | undefined, locale: Locale = 'en'): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (locale === 'es') return value.es ?? value.en
  return value.en
}

export function getLocaleFromPath(pathname: string): Locale {
  return /^\/es(?:\/|$)/.test(pathname) ? 'es' : 'en'
}

export function useLocale(): Locale {
  const { pathname } = useLocation()
  return getLocaleFromPath(pathname)
}

export function localePrefix(locale: Locale): string {
  return locale === 'es' ? '/es' : ''
}

export function LocaleDocAttr() {
  const locale = useLocale()
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])
  return null
}

export type LocaleString = string | { en: string; es?: string }

export function t(value: LocaleString | undefined, locale: 'en' | 'es' = 'en'): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (locale === 'es') return value.es ?? value.en
  return value.en
}

export function getLocaleFromPath(pathname: string): 'en' | 'es' {
  return pathname.startsWith('/es/') ? 'es' : 'en'
}

import { describe, expect, it } from 'vitest'
import { getLocaleFromPath, t } from './locale'

describe('t', () => {
  it("returns plain strings unchanged for en", () => {
    expect(t('hello', 'en')).toBe('hello')
  })

  it('returns the es translation when available', () => {
    expect(t({ en: 'hi', es: 'hola' }, 'es')).toBe('hola')
  })

  it('falls back to en when es is missing', () => {
    // Defensive: runtime accepts partial shapes even though the type now requires both branches.
    expect(t({ en: 'hi' } as unknown as { en: string; es: string }, 'es')).toBe('hi')
  })

  it('returns an empty string for undefined', () => {
    expect(t(undefined)).toBe('')
  })
})

describe('getLocaleFromPath', () => {
  it("returns en for the root path", () => {
    expect(getLocaleFromPath('/')).toBe('en')
  })

  it('returns es for Spanish-prefixed paths', () => {
    expect(getLocaleFromPath('/es/blog')).toBe('es')
  })
})

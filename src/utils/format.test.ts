import { describe, it, expect } from 'vitest'
import { talkBadgeLabel, talkBadgeIsPulsing } from './format'

describe('talkBadgeLabel', () => {
  it('returns "Upcoming" for upcoming status', () => {
    expect(talkBadgeLabel('upcoming')).toBe('Upcoming')
  })

  it('returns "Speaker" for past status', () => {
    expect(talkBadgeLabel('past')).toBe('Speaker')
  })
})

describe('talkBadgeIsPulsing', () => {
  it('returns true for upcoming status', () => {
    expect(talkBadgeIsPulsing('upcoming')).toBe(true)
  })

  it('returns false for past status', () => {
    expect(talkBadgeIsPulsing('past')).toBe(false)
  })
})

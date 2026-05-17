import { describe, expect, it } from 'vitest'
import { loadContent } from './loader'

describe('loadContent', () => {
  it('returns content with identity and projects', () => {
    const content = loadContent()

    expect(content).toHaveProperty('identity')
    expect(content).toHaveProperty('projects')
  })
})

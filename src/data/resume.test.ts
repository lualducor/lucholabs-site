import { describe, it, expect } from 'vitest'
import {
  projects,
  experience,
  identity,
  skills,
  thesis,
  contact,
  speaking,
  certificates,
} from './resume'

// 1. Every project has required fields and at least one stack item
describe('projects — required fields', () => {
  it('every project has non-empty name, tagline, description, and at least one stack item', () => {
    for (const p of projects) {
      expect(p.name, `${p.name}: name`).toBeTruthy()
      expect(p.tagline, `${p.name}: tagline`).toBeTruthy()
      expect(p.description, `${p.name}: description`).toBeTruthy()
      expect(p.stack.length, `${p.name}: stack`).toBeGreaterThan(0)
    }
  })
})

// 2. Every experience entry has required fields
describe('experience — required fields', () => {
  it('every entry has company, role, period, description, and at least one tag', () => {
    for (const e of experience) {
      expect(e.company, `${e.company}: company`).toBeTruthy()
      expect(e.role, `${e.company}: role`).toBeTruthy()
      expect(e.period, `${e.company}: period`).toBeTruthy()
      expect(e.description, `${e.company}: description`).toBeTruthy()
      expect(e.tags.length, `${e.company}: tags`).toBeGreaterThan(0)
    }
  })
})

// 3. identity.title is non-empty and under 100 characters
describe('identity', () => {
  it('title is non-empty and under 100 characters', () => {
    expect(identity.title).toBeTruthy()
    expect(identity.title.length).toBeLessThan(100)
  })

  // 4. identity.cvUrl starts with /
  it('cvUrl starts with / (self-hosted)', () => {
    expect(identity.cvUrl.startsWith('/')).toBe(true)
  })
})

// 5. skills.core and skills.tooling each have between 3 and 8 items
describe('skills', () => {
  it('core has between 3 and 8 items', () => {
    expect(skills.core.length).toBeGreaterThanOrEqual(3)
    expect(skills.core.length).toBeLessThanOrEqual(8)
  })

  it('tooling has between 3 and 8 items', () => {
    expect(skills.tooling.length).toBeGreaterThanOrEqual(3)
    expect(skills.tooling.length).toBeLessThanOrEqual(8)
  })
})

// 6. thesis.adoptedBy has at least one institution
// 7. thesis.impact does not contain '2025'
describe('thesis', () => {
  it('adoptedBy has at least one institution', () => {
    expect(thesis.adoptedBy.length).toBeGreaterThan(0)
  })

  it('impact does not contain stale "2025" date', () => {
    expect(thesis.impact).not.toContain('2025')
  })
})

// 8. contact has LinkedIn, GitHub, and Email entries with non-empty hrefs
describe('contact', () => {
  it('has LinkedIn, GitHub, and Email with non-empty hrefs', () => {
    for (const label of ['LinkedIn', 'GitHub', 'Email']) {
      const entry = contact.find(c => c.label === label)
      expect(entry, `missing ${label}`).toBeDefined()
      expect(entry!.href, `${label}: empty href`).toBeTruthy()
    }
  })
})

// 9. No project repoUrl or demoUrl is an empty string
describe('projects — link fields', () => {
  it('repoUrl and demoUrl are either undefined or a non-empty string', () => {
    for (const p of projects) {
      expect(p.repoUrl, `${p.name}: repoUrl`).not.toBe('')
      expect(p.demoUrl, `${p.name}: demoUrl`).not.toBe('')
    }
  })
})

// 10. Every speaking entry has required fields
// 11. Every speaking entry has status 'past' or 'upcoming'
describe('speaking', () => {
  it('every talk has non-empty event, location, date, and topic', () => {
    for (const t of speaking) {
      expect(t.event, `${t.event}: event`).toBeTruthy()
      expect(t.location, `${t.event}: location`).toBeTruthy()
      expect(t.date, `${t.event}: date`).toBeTruthy()
      expect(t.topic, `${t.event}: topic`).toBeTruthy()
    }
  })

  it('every talk has status of "past" or "upcoming"', () => {
    for (const t of speaking) {
      expect(['past', 'upcoming']).toContain(t.status)
    }
  })
})

// 12. certificates has at least one entry with non-empty title, issuer, and date
describe('certificates', () => {
  it('has at least one entry with non-empty title, issuer, and date', () => {
    expect(certificates.length).toBeGreaterThan(0)
    for (const c of certificates) {
      expect(c.title, `${c.title}: title`).toBeTruthy()
      expect(c.issuer, `${c.title}: issuer`).toBeTruthy()
      expect(c.date, `${c.title}: date`).toBeTruthy()
    }
  })
})

// 13. First project has status 'Shipped'
describe('projects — ordering', () => {
  it('first project has status "Shipped"', () => {
    expect(projects[0].status).toBe('Shipped')
  })
})

import { describe, it, expect } from 'vitest'
import {
  activeProjects,
  certificates,
  contact,
  experience,
  faq,
  headlineProject,
  identity,
  killedProjects,
  manifesto,
  projects,
  skills,
  speaking,
  thesis,
} from './resume'

describe('projects — required fields', () => {
  it('every project has non-empty name, tagline, description, and at least one stack item', () => {
    for (const project of projects) {
      expect(project.name, `${project.name}: name`).toBeTruthy()
      expect(project.tagline, `${project.name}: tagline`).toBeTruthy()
      expect(project.description, `${project.name}: description`).toBeTruthy()
      expect(project.stack.length, `${project.name}: stack`).toBeGreaterThan(0)
    }
  })
})

describe('experience — required fields', () => {
  it('every entry has company, role, period, description, and at least one tag', () => {
    for (const entry of experience) {
      expect(entry.company, `${entry.company}: company`).toBeTruthy()
      expect(entry.role, `${entry.company}: role`).toBeTruthy()
      expect(entry.period, `${entry.company}: period`).toBeTruthy()
      expect(entry.description, `${entry.company}: description`).toBeTruthy()
      expect(entry.tags.length, `${entry.company}: tags`).toBeGreaterThan(0)
    }
  })
})

describe('identity', () => {
  it('title is non-empty and under 100 characters', () => {
    expect(identity.title).toBeTruthy()
    expect(identity.title.length).toBeLessThan(100)
  })

  it('cvUrl starts with / (self-hosted)', () => {
    expect(identity.cvUrl.startsWith('/')).toBe(true)
  })

  it('image includes url, width, height, and caption', () => {
    expect(identity.image).toMatchObject({
      url: '/photo.jpg',
      width: 192,
      height: 192,
      caption: 'Luis Alberto Duarte Cortés',
    })
  })
})

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

describe('thesis', () => {
  it('adoptedBy has at least one institution', () => {
    expect(thesis.adoptedBy.length).toBeGreaterThan(0)
  })

  it('impact does not contain stale "2025" date', () => {
    expect(thesis.impact).not.toContain('2025')
  })

  it('publicationUrl is present and non-empty', () => {
    expect(thesis.publicationUrl).toBeTruthy()
    expect(thesis.publicationUrl).toContain('repositorio.ecci.edu.co')
  })
})

describe('contact', () => {
  it('has LinkedIn, GitHub, and Email with non-empty hrefs', () => {
    for (const label of ['LinkedIn', 'GitHub', 'Email']) {
      const entry = contact.find(contactEntry => contactEntry.label === label)
      expect(entry, `missing ${label}`).toBeDefined()
      expect(entry!.href, `${label}: empty href`).toBeTruthy()
    }
  })
})

describe('projects — link fields', () => {
  it('repoUrl and demoUrl are either undefined or a non-empty string', () => {
    for (const project of projects) {
      expect(project.repoUrl, `${project.name}: repoUrl`).not.toBe('')
      expect(project.demoUrl, `${project.name}: demoUrl`).not.toBe('')
    }
  })
})

describe('speaking', () => {
  it('every talk has non-empty event, location, date, and topic', () => {
    for (const talk of speaking) {
      expect(talk.event, `${talk.event}: event`).toBeTruthy()
      expect(talk.location, `${talk.event}: location`).toBeTruthy()
      expect(talk.date, `${talk.event}: date`).toBeTruthy()
      expect(talk.topic, `${talk.event}: topic`).toBeTruthy()
    }
  })

  it('every talk has status of "past" or "upcoming"', () => {
    for (const talk of speaking) {
      expect(['past', 'upcoming']).toContain(talk.status)
    }
  })
})

describe('certificates', () => {
  it('has at least one entry with non-empty title, issuer, and date', () => {
    expect(certificates.length).toBeGreaterThan(0)
    for (const certificate of certificates) {
      expect(certificate.title, `${certificate.title}: title`).toBeTruthy()
      expect(certificate.issuer, `${certificate.title}: issuer`).toBeTruthy()
      expect(certificate.date, `${certificate.title}: date`).toBeTruthy()
    }
  })
})

describe('projects — derived collections', () => {
  it('activeProjects returns non-killed, non-archived projects', () => {
    expect(activeProjects).toHaveLength(3)
    expect(activeProjects.every(project => !project.isKilled && !project.isArchived)).toBe(true)
    expect(activeProjects.map(project => project.name)).toEqual([
      'Boveda',
      'Anti-Phishing Shield',
      'SUPERFARM',
    ])
  })

  it('killedProjects returns haycorte and klipper-copilot', () => {
    expect(killedProjects).toHaveLength(2)
    expect(killedProjects.map(project => project.slug)).toEqual([
      'haycorte',
      'klipper-copilot',
    ])
  })

  it('headlineProject is boveda', () => {
    expect(headlineProject?.slug).toBe('boveda')
  })
})

describe('manifesto and faq', () => {
  it('manifesto has four entries', () => {
    expect(manifesto).toHaveLength(4)
  })

  it('faq has six entries', () => {
    expect(faq).toHaveLength(6)
  })

  it('each manifesto citationProjectSlug matches a real project slug', () => {
    const projectSlugs = new Set(projects.map(project => project.slug))

    for (const entry of manifesto) {
      expect(projectSlugs.has(entry.citationProjectSlug)).toBe(true)
    }
  })
})

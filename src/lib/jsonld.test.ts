import { describe, expect, it } from 'vitest'
import {
  articleSchema,
  breadcrumbSchema,
  eventSchema,
  faqSchema,
  personSchema,
  profilePageSchema,
  webSiteSchema,
} from './jsonld'

describe('personSchema', () => {
  it('returns a Person with the expected id and ImageObject image', () => {
    const schema = personSchema()

    expect(schema).toMatchObject({
      '@id': 'https://lucholabs.dev/#person',
      '@type': 'Person',
    })
    expect(schema.image).toMatchObject({
      '@type': 'ImageObject',
    })
  })
})

describe('webSiteSchema', () => {
  it('returns a WebSite with an author reference to the Person schema', () => {
    const schema = webSiteSchema()

    expect(schema).toMatchObject({
      '@id': 'https://lucholabs.dev/#website',
      '@type': 'WebSite',
      author: { '@id': 'https://lucholabs.dev/#person' },
    })
  })
})

describe('profilePageSchema', () => {
  it('returns a ProfilePage pointing to the Person schema with dateModified fallback', () => {
    const schema = profilePageSchema(
      {
        name: 'Luis Alberto Duarte Cortés',
        title: 'Title',
        subtitle: 'Subtitle',
        cvUrl: '/cv.pdf',
        photo: '/photo.jpg',
        image: {
          url: '/photo.jpg',
          width: 192,
          height: 192,
          caption: 'Luis Alberto Duarte Cortés',
        },
        subMark: '',
        latamLine: '',
      },
      '2026-05-16',
    )

    expect(schema).toEqual({
      '@type': 'ProfilePage',
      '@id': 'https://lucholabs.dev/#profile',
      mainEntity: { '@id': 'https://lucholabs.dev/#person' },
      dateModified: '2026-05-16',
    })
    expect(profilePageSchema(
      {
        name: 'Luis Alberto Duarte Cortés',
        title: 'Title',
        subtitle: 'Subtitle',
        cvUrl: '/cv.pdf',
        photo: '/photo.jpg',
        image: {
          url: '/photo.jpg',
          width: 192,
          height: 192,
          caption: 'Luis Alberto Duarte Cortés',
        },
        subMark: '',
        latamLine: '',
      },
    ).dateModified).toBe('')
  })
})

describe('articleSchema', () => {
  it('returns a BlogPosting with the expected ids and references', () => {
    const slug = 'test-post'
    const title = 'Test Post'
    const date = '2026-05-17'
    const description = 'A test post description.'
    const schema = articleSchema({ slug, title, date, description })

    expect(schema['@type']).toBe('BlogPosting')
    expect(schema['@id']).toContain(slug)
    expect(schema.headline).toBe(title)
    expect(schema.datePublished).toBe(date)
    expect(schema.author).toEqual({ '@id': 'https://lucholabs.dev/#person' })
    expect(schema.publisher).toEqual({ '@id': 'https://lucholabs.dev/#person' })
  })
})

describe('eventSchema', () => {
  it('returns an Event with the expected id, performer, and PostalAddress location', () => {
    const slug = 'ai-cyber-2026'
    const title = 'AI Cyber 2026'
    const absoluteDate = '2026-06-01T18:00:00-05:00'
    const location = 'Bogota, Colombia'
    const schema = eventSchema({ slug, title, absoluteDate, location })

    expect(schema['@type']).toBe('Event')
    expect(schema['@id']).toContain(slug)
    expect(schema.startDate).toBe(absoluteDate)
    expect(schema.performer).toEqual({ '@id': 'https://lucholabs.dev/#person' })
    expect(schema.location).toMatchObject({
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bogota',
        addressCountry: 'Colombia',
      },
    })
  })
})

describe('faqSchema', () => {
  it('returns null for an empty faq array', () => {
    expect(faqSchema([])).toBeNull()
  })

  it('returns an FAQPage with Question entries when faqs exist', () => {
    const schema = faqSchema([{ question: 'Q', answer: 'A' }])

    expect(schema).toMatchObject({
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Q',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A',
          },
        },
      ],
    })
  })
})

describe('breadcrumbSchema', () => {
  it('returns a BreadcrumbList with sequential ListItem positions', () => {
    const schema = breadcrumbSchema([
      { name: 'Home', url: 'https://lucholabs.dev/' },
      { name: 'Blog', url: 'https://lucholabs.dev/blog' },
    ])

    expect(schema).toMatchObject({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://lucholabs.dev/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://lucholabs.dev/blog',
        },
      ],
    })
  })
})

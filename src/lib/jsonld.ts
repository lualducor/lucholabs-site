import { loadContent } from '../data/loader'

const SITE_URL = 'https://lucholabs.dev'
const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

export type ArticleSchemaInput = {
  slug: string
  title: string
  date: string
  description: string
}

export type EventSchemaInput = {
  slug: string
  title: string
  absoluteDate: string
  location: string
}

export type FaqSchemaInput = {
  question: string
  answer: string
}

export type BreadcrumbSchemaInput = {
  name: string
  url: string
}

function toAbsoluteUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return url.startsWith('/') ? `${SITE_URL}${url}` : `${SITE_URL}/${url}`
}

function toSectionUrl(section: string, slug: string): string {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '')
  return `${SITE_URL}/${section}/${cleanSlug}`
}

function locationSchema(location: string) {
  const [addressLocality, addressCountry] = location
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)

  return {
    '@type': 'Place',
    name: location,
    address: {
      '@type': 'PostalAddress',
      ...(addressLocality ? { addressLocality } : {}),
      ...(addressCountry ? { addressCountry } : {}),
    },
  }
}

export function personSchema() {
  const content = loadContent()
  const sameAs = content.contact
    .map(entry => entry.href)
    .filter(href => href.startsWith('https://'))
  const image = content.identity.image

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: content.identity.name,
    url: SITE_URL,
    image: {
      '@type': 'ImageObject',
      ...image,
      url: toAbsoluteUrl(image.url),
    },
    jobTitle: 'AI Systems & Automation Engineer',
    description:
      'Freelance automation engineer building AI-powered systems and integration infrastructure. Based in Bogotá, available remote for US & European time zones.',
    sameAs,
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'LuchoLabs',
    url: SITE_URL,
    description:
      'Personal engineering site of Luis Alberto Duarte Cortés — automation, AI systems, and build logs.',
    author: { '@id': PERSON_ID },
  }
}

export function profilePageSchema(
  identity: ReturnType<typeof loadContent>['identity'],
  dateModified?: string,
) {
  void identity

  return {
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profile`,
    mainEntity: { '@id': PERSON_ID },
    dateModified: dateModified || '',
  }
}

export function articleSchema(post: ArticleSchemaInput) {
  const url = toSectionUrl('blog', post.slug)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    headline: post.title,
    datePublished: post.date,
    description: post.description,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  }
}

export function eventSchema(talk: EventSchemaInput) {
  const url = toSectionUrl('talks', talk.slug)

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${url}#event`,
    url,
    name: talk.title,
    startDate: talk.absoluteDate,
    performer: { '@id': PERSON_ID },
    location: locationSchema(talk.location),
  }
}

// TODO: add softwareSourceCodeSchema(project) when projects[].repoUrl is published (CONTENT session)

export function faqSchema(faqs: FaqSchemaInput[] | undefined) {
  if (!faqs?.length) return null
  // FAQPage with empty answers is useless; will activate when CONTENT session fills answers.
  if (faqs.every(faq => faq.answer.trim() === '')) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbSchema(crumbs: BreadcrumbSchemaInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: toAbsoluteUrl(crumb.url),
    })),
  }
}

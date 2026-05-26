import type { LocaleString } from '../lib/locale'
import contentJson from './content.json' with { type: 'json' }

export interface ContentMeta {
  lastUpdated: string
  version: number
  note?: string
}

export interface ImageObject {
  url: string
  width: number
  height: number
  caption: string
}

export interface IdentityContent {
  name: string
  title: string
  roleLine?: string
  subtitle: string
  cvUrl: string
  photo: string
  image: ImageObject
  subMark: LocaleString
  latamLine: LocaleString
}

export interface Stat {
  label: string
  sub: string
  subColor: string
  category: string
  pulse?: boolean
}

export interface BentExperienceEntry {
  company: string
  role: string
  period: string
}

export interface SkillsContent {
  core: string[]
  tooling: string[]
}

export interface ThesisContent {
  title: string
  subtitle: string
  institution: string
  status: string
  adoptedBy: string[]
  stack: string[]
  impact: string
  publicationUrl?: string
  repoUrl?: string
}

export type TalkStatus = 'past' | 'upcoming'

export interface SpeakingEntry {
  status: TalkStatus
  event: string
  location: string
  date: string
  topic: string
  photo?: string
  recapUrl?: string
  videoUrl?: string
  slidesUrl?: string
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  description: string
  tags: string[]
}

export interface ProjectLinks {
  github: string | null
  demo: string | null
  paper: string | null
}

export interface ProjectContent {
  name: string
  slug: string
  tagline: string
  description: string
  stack: string[]
  status: string
  statusColor: string
  featuredOnCv: boolean
  featuredOnLab: boolean
  isHeadline: boolean
  isArchived: boolean
  isKilled: boolean
  cvTagline: string
  cvDescription: string
  labTagline: string
  labDescription: string
  labQuote: string
  labFeatures: string[]
  labVision: string
  links: ProjectLinks
  repoUrl: string | null
}

export interface ManifestoEntry {
  title: string
  body: LocaleString
  citationProjectSlug: string
}

export interface NowNext {
  now: string[]
  next: string[]
  recentCommits: string[]
}

export interface ContactEntry {
  label: string
  href: string
}

export interface ContactMetaContent {
  availability: string
  cta: string
  calUrl?: string
  hireHeadline?: string
  speakingHeadline?: string
  speakingCta?: string
  freelanceLine?: string
  notForLine: LocaleString
}

export interface CertificateContent {
  title: string
  issuer: string
  date: string
  topics: string[]
  credentialUrl: string | null
}

export interface TalkResource {
  title: string
  url: string
}

export interface TalkGalleryItem {
  src: string
  alt: string
}

export interface TalkPageData {
  slug: string
  event: string
  location: string
  date: string
  absoluteDate?: string
  title: string
  subtitle?: string
  format?: string
  role?: string
  abstract: string[]
  heroPhoto?: string
  heroPhotoAlt?: string
  videoUrl: string | null
  slidesUrl: string | null
  keyTakeaways: string[]
  resources: TalkResource[]
  gallery: TalkGalleryItem[]
  relatedBlogSlug: string | null
  labAnchorUrl: string | null
}

export interface FaqEntry {
  question: string
  answer: string
}

export interface UrlNamespaceEntry {
  title: string
  tagline: string
  body: string
}

export interface UrlNamespaces {
  services: UrlNamespaceEntry
  'case-studies': UrlNamespaceEntry
  print: UrlNamespaceEntry
}

export interface SeoEntry {
  title: string
  description: string
  ogImage?: string
}

export interface SeoMap {
  '/': SeoEntry & { ogImage: string }
  '/blog': SeoEntry
  '/lab': SeoEntry
  '/services': SeoEntry
  '/case-studies': SeoEntry
  '/print': SeoEntry
}

export interface MetricBucket {
  primary: string
  secondary: string[]
}

export interface MetricsContent {
  kpis: {
    cv: MetricBucket
    lab: MetricBucket
    blog: MetricBucket
    talks: MetricBucket
  }
  events: string[]
}

export interface Content {
  $schema?: string
  meta: ContentMeta
  identity: IdentityContent
  stats: Stat[]
  currentlyBuilding: string[]
  bentExperience: BentExperienceEntry[]
  skills: SkillsContent
  thesis: ThesisContent
  speaking: SpeakingEntry[]
  experience: ExperienceEntry[]
  projects: ProjectContent[]
  manifesto: ManifestoEntry[]
  nowNext: NowNext
  contact: ContactEntry[]
  contactMeta: ContactMetaContent
  certificates: CertificateContent[]
  talks: TalkPageData[]
  // Phase 2A shared fields remain required on the canonical content surface.
  faq: FaqEntry[]
  urlNamespaces: UrlNamespaces
  seo: SeoMap
  metrics: MetricsContent
}

export function loadContent(): Content {
  return contentJson as Content
}

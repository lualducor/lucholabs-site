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
  title: LocaleString
  roleLine?: LocaleString
  subtitle: LocaleString
  cvUrl: string
  photo: string
  image: ImageObject
  subMark: LocaleString
  latamLine: LocaleString
}

export interface Stat {
  label: LocaleString
  sub: LocaleString
  subColor: string
  category: LocaleString
  pulse?: boolean
}

export interface BentExperienceEntry {
  company: string
  role: LocaleString
  period: string
}

export interface SkillsContent {
  core: LocaleString[]
  tooling: LocaleString[]
}

export interface ThesisContent {
  title: LocaleString
  subtitle: LocaleString
  institution: LocaleString
  status: LocaleString
  adoptedBy: string[]
  stack: string[]
  impact: LocaleString
  publicationUrl?: string
  repoUrl?: string
}

export type TalkStatus = 'past' | 'upcoming'

export interface SpeakingEntry {
  status: TalkStatus
  event: string
  location: string
  date: string
  topic: LocaleString
  photo?: string
  recapUrl?: string
  videoUrl?: string
  slidesUrl?: string
}

export interface ExperienceEntry {
  company: string
  role: LocaleString
  period: LocaleString
  description: LocaleString
  tags: LocaleString[]
}

export interface ProjectLinks {
  github: string | null
  demo: string | null
  paper: string | null
}

export interface ProjectContent {
  name: string
  slug: string
  tagline: LocaleString
  description: LocaleString
  stack: string[]
  status: LocaleString
  statusColor: string
  featuredOnCv: boolean
  featuredOnLab: boolean
  isHeadline: boolean
  isArchived: boolean
  isKilled: boolean
  cvTagline: LocaleString
  cvDescription: LocaleString
  labTagline: LocaleString
  labDescription: LocaleString
  labQuote: LocaleString
  labFeatures: LocaleString[]
  labVision: LocaleString
  links: ProjectLinks
  repoUrl: string | null
}

export interface ManifestoEntry {
  title: LocaleString
  body: LocaleString
  citationProjectSlug: string
}

export interface NowNext {
  now: LocaleString[]
  next: LocaleString[]
  recentCommits: string[]
}

export interface ContactEntry {
  label: string
  href: string
}

export interface ContactMetaContent {
  availability: LocaleString
  cta: LocaleString
  calUrl?: string
  hireHeadline?: LocaleString
  speakingHeadline?: LocaleString
  speakingCta?: LocaleString
  freelanceLine?: LocaleString
  notForLine: LocaleString
}

export interface CertificateContent {
  title: LocaleString
  issuer: string
  date: string
  topics: LocaleString[]
  credentialUrl: string | null
}

export interface TalkResource {
  title: LocaleString
  url: string
}

export interface TalkGalleryItem {
  src: string
  alt: LocaleString
}

export interface TalkPageData {
  slug: string
  event: string
  location: string
  date: string
  absoluteDate?: string
  title: LocaleString
  subtitle?: LocaleString
  format?: LocaleString
  role?: LocaleString
  abstract: LocaleString[]
  heroPhoto?: string
  heroPhotoAlt?: LocaleString
  videoUrl: string | null
  slidesUrl: string | null
  keyTakeaways: LocaleString[]
  resources: TalkResource[]
  gallery: TalkGalleryItem[]
  relatedBlogSlug: string | null
  labAnchorUrl: string | null
}

export interface FaqEntry {
  question: LocaleString
  answer: LocaleString
}

export interface UrlNamespaceEntry {
  title: LocaleString
  tagline: LocaleString
  body: LocaleString
}

export interface UrlNamespaces {
  services: UrlNamespaceEntry
  'case-studies': UrlNamespaceEntry
  print: UrlNamespaceEntry
}

export interface SeoEntry {
  title: LocaleString
  description: LocaleString
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

export interface LabCopy {
  relatedKicker: LocaleString
  relatedLabel: LocaleString
  archiveTitle: LocaleString
  archiveDescription: LocaleString
}

export interface LabContent {
  copy?: LabCopy
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
  lab?: LabContent
}

export function loadContent(): Content {
  return contentJson as Content
}

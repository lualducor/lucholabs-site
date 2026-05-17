// Thin adapter over the canonical content source.
// Edit src/data/content.json (validates against content.schema.json).
// This file re-exports it with TypeScript types for component consumers.

import contentJson from './content.json'
import type {
  BentExperienceEntry,
  CertificateContent,
  ContactEntry,
  ContactMetaContent,
  Content,
  ExperienceEntry,
  FaqEntry,
  IdentityContent,
  ManifestoEntry,
  MetricsContent,
  NowNext,
  ProjectContent,
  SeoMap,
  SkillsContent,
  SpeakingEntry,
  Stat,
  TalkGalleryItem,
  TalkPageData,
  TalkResource,
  TalkStatus,
  ThesisContent,
  UrlNamespaces,
} from './loader'

export { t } from '../lib/locale'
export type { LocaleString } from '../lib/locale'
export type { TalkStatus }

const content = contentJson as Content

export type Talk = SpeakingEntry
export type Certificate = Omit<CertificateContent, 'credentialUrl'> & {
  credentialUrl?: string
}
export type TalkPage = TalkPageData
export type Project = Omit<ProjectContent, 'repoUrl'> & {
  repoUrl?: string
  demoUrl?: string
}

function normalizeProject(project: ProjectContent): Project {
  const { repoUrl, ...rest } = project

  return {
    ...rest,
    ...(repoUrl ? { repoUrl } : {}),
    ...(project.links.demo ? { demoUrl: project.links.demo } : {}),
  }
}

function normalizeCertificate(certificate: CertificateContent): Certificate {
  const { credentialUrl, ...rest } = certificate

  return {
    ...rest,
    ...(credentialUrl ? { credentialUrl } : {}),
  }
}

export const identity: IdentityContent = content.identity
export const stats: Stat[] = content.stats
export const currentlyBuilding: string[] = content.currentlyBuilding
export const bentExperience: BentExperienceEntry[] = content.bentExperience
export const skills: SkillsContent = content.skills
export const thesis: ThesisContent = content.thesis
export const speaking: Talk[] = content.speaking
export const experience: ExperienceEntry[] = content.experience
export const projects: Project[] = content.projects.map(normalizeProject)
export const activeProjects: Project[] = projects.filter(project => !project.isKilled && !project.isArchived)
export const archivedProjects: Project[] = projects.filter(project => project.isArchived)
export const killedProjects: Project[] = projects.filter(project => project.isKilled)
export const headlineProject: Project | undefined = projects.find(project => project.isHeadline)
export const otherProjects: Project[] = projects.filter(
  project => project.featuredOnCv && !project.isHeadline && !project.isKilled,
)
export const manifesto: ManifestoEntry[] = content.manifesto
export const nowNext: NowNext = content.nowNext
export const contact: ContactEntry[] = content.contact
export const contactMeta: ContactMetaContent = content.contactMeta
export const certificates: Certificate[] = content.certificates.map(normalizeCertificate)
export const talks: TalkPage[] = content.talks
export const faq: FaqEntry[] = content.faq
export const urlNamespaces: UrlNamespaces = content.urlNamespaces
export const seo: SeoMap = content.seo
export const metrics: MetricsContent = content.metrics

export type { TalkResource, TalkGalleryItem }

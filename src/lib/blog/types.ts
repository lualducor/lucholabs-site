export interface PostFrontmatter {
  title: string
  date: string
  slug: string
  description: string
  tags: string[]
  ogImage?: string
  series?: string
  seriesPart?: number
  draft?: boolean
}

export interface Post {
  frontmatter: PostFrontmatter
  slug: string
  readingTime: string
}

export interface SeriesGroup {
  name: string
  posts: Post[]
}

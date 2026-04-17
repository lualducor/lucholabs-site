/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const MDXComponent: ComponentType
  export default MDXComponent
}

declare module '*.json' {
  const data: unknown
  export default data
}

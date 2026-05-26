import { MDXProvider as BaseMDXProvider } from '@mdx-js/react'
import { Callout } from './Callout'

const components = { Callout }

export function MDXProvider({ children }: { children: React.ReactNode }) {
  return <BaseMDXProvider components={components}>{children}</BaseMDXProvider>
}

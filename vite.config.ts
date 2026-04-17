/// <reference types="vitest" />
import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// In SSR builds, CSS imports cause PostCSS to choke on `@import "tailwindcss"`.
// Stub them all out — the SSR bundle only needs the JS rendering logic.
function stubCssInSsr(): Plugin {
  return {
    name: 'stub-css-in-ssr',
    resolveId(id) {
      if (id.endsWith('.css')) return id
    },
    load(id) {
      if (id.endsWith('.css')) return ''
    },
  }
}

function stripFrontmatterInMdx(): Plugin {
  return {
    name: 'strip-frontmatter-in-mdx',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.mdx')) return null

      return code.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    stripFrontmatterInMdx(),
    {
      ...mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, {
            theme: 'one-dark-pro',
            keepBackground: true,
          }],
        ],
      }),
      enforce: 'pre',
    },
    react({
      include: /\.(mdx|js|jsx|ts|tsx)$/,
    }),
    ...(isSsrBuild ? [stubCssInSsr()] : [tailwindcss()]),
  ],
  ssr: {
    noExternal: [],
  },
}))

# LuchoLabs.dev

Personal engineering site of Luis Alberto Duarte Cortés — freelance AI Systems & Automation Engineer based in Bogotá.

🌐 **Live: [lucholabs.dev](https://lucholabs.dev)**

## What this site is

A static engineering portfolio plus a build-log blog. Profiles the projects I'm shipping, the systems I've worked on, and the open-source accessibility tooling adopted by SENA Regional Amazonas and Universidad ECCI. The blog covers automation deep-dives, AI systems experiments, and notes on whatever I'm building.

## Stack

- **Vite 8** + **React 19** + **TypeScript** (strict mode)
- **Tailwind CSS 4** for styling, dark-only theme
- **MDX** for blog content with frontmatter, syntax highlighting via Shiki
- **React Router 7** for client-side navigation
- **Custom SSR prerender** — every route is rendered to static HTML at build time, so crawlers and social unfurlers see real content (not an empty SPA shell)
- **Vitest** for unit tests
- Deployed on **Vercel**

## Why this stack instead of Next.js / Astro

The site predates the blog. When the blog was added, the existing Vite + React + custom-prerender setup was kept rather than ported, because the prerender already produced clean static HTML for SEO and the React components were already invested in. The blog reads MDX at build time, generates a typed JSON manifest, and the same prerender script extends to walk every blog route — so each post ships as a fully-rendered HTML file with per-post `<title>`, `<meta>`, and Open Graph tags baked into `<head>`.

## What's notable in the implementation

- **Build-time post indexing.** Frontmatter is parsed once at build time (not in the browser), producing `src/lib/blog/posts.generated.json` consumed by the runtime — keeping `gray-matter` out of the client bundle.
- **Per-route prerender.** `scripts/prerender.mjs` walks the homepage, `/blog`, every `/blog/{slug}`, and every `/blog/tag/{tag}`, emitting one HTML file per route with per-route OG tags injected.
- **RSS + sitemap auto-generated** from the post manifest on every build.
- **CSP-locked** — strict Content Security Policy, no inline scripts beyond what React 19 hydration requires.
- **JSON-LD Person + WebSite schema** for rich-result eligibility.

## Structure

```text
src/
  pages/                  React Router page components
  components/
    blog/                 Blog-specific UI
    bento/                Homepage bento grid
  lib/blog/               Post types, runtime loader, generated manifest
  data/resume.ts          Single source of truth for homepage content
content/posts/            MDX blog posts with frontmatter
scripts/
  prerender.mjs           Per-route SSR -> static HTML emitter
  build-post-index.mjs    Build-time MDX frontmatter -> JSON
  generate-rss.mjs        RSS feed builder
  generate-sitemap.mjs    Sitemap builder
public/
  blog/og/                Per-post Open Graph images (1200x630)
```

## Status

Active. Posts and project entries updated continuously. Source open under MIT.

## Contact

[lucholabs.dev/#contact](https://lucholabs.dev/#contact) · [LinkedIn](https://www.linkedin.com/in/luis-alberto-duarte-97748171/) · [GitHub](https://github.com/lualducor)

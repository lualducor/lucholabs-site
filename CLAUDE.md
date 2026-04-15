# LuchoLabs.dev — Claude Code Guide

Personal engineering site for Luis Alberto Duarte Cortés.
Stack: Vite 8 + React 19 + TypeScript + Tailwind CSS 4.

## Quick start

```bash
npm run dev        # Dev server at localhost:5173
npm run build      # tsc → vite build → SSR prerender → dist/
npm run lint       # ESLint
```

The build pipeline includes SSR pre-rendering via `scripts/prerender.mjs`.
This bakes full HTML into `dist/index.html` for SEO crawlability.

## Structure

```
src/
  App.tsx                    — Root layout (Nav + sections)
  entry-server.tsx           — SSR entry for prerender
  components/
    Nav.tsx                  — Fixed top nav
    BentoGrid.tsx            — Hero bento layout
    ExperienceSection.tsx    — Work history
    ProjectsSection.tsx      — Side projects
    ContactSection.tsx       — Contact + availability
    bento/                   — Individual bento cards
  data/
    resume.ts                — All content (identity, experience, projects, contact)
public/
  photo.jpg                  — Profile headshot (hero.jpg)
  og-image.jpg               — 1200×630 social preview banner
  speaking.jpg               — Conference panel photo (E-E-A-T asset)
  llms.txt                   — AI crawler guidance
  robots.txt / sitemap.xml
scripts/
  prerender.mjs              — Post-build SSR inject script
```

## Content updates

All copy lives in `src/data/resume.ts`. Edit that file — no component changes needed
for text, tags, experience entries, or project descriptions.

## Deploy Configuration (configured by /setup-deploy)
- Platform: Vercel
- Production URL: https://lucholabs-site.vercel.app
- Deploy workflow: auto-deploy on push to main (GitHub integration active)
- Merge method: merge
- Project type: web app (static SPA with SSR pre-render)
- Post-deploy health check: https://lucholabs-site.vercel.app

### Custom deploy hooks
- Pre-merge: none
- Deploy trigger: automatic on push to main
- Deploy status: HTTP health check
- Health check: https://lucholabs-site.vercel.app

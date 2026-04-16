# lucholabs.dev

Personal engineering site for **Luis Alberto Duarte Cortés** — Automation Engineer based in Bogotá, Colombia. The site is a technical lab presence, not a portfolio. It documents ongoing projects and professional positioning.

Live: [lucholabs-site.vercel.app](https://lucholabs-site.vercel.app)

---

## Stack

| Tool | Why |
|------|-----|
| **Vite** | Fast dev server and build tooling; zero config for a static SPA |
| **React 19** | Component model; minimal overhead for a single-page site |
| **TypeScript** | Type safety for data-driven sections (resume.ts → components) |
| **Tailwind CSS 4** | Utility-first styling without a stylesheet to maintain |
| **shadcn/ui + Radix** | Accessible primitives with zero visual opinion imposed |
| **SSR pre-render** | `scripts/prerender.mjs` bakes full HTML at build time for SEO crawlability |

---

## Run locally

```bash
cd CLAUDE/Websites/lucholabs/lucholabs-site

npm install
npm run dev        # Dev server at http://localhost:5173
npm run build      # tsc → vite build → SSR prerender → dist/
npm run lint       # ESLint
```

---

## Update content

All copy lives in [`src/data/resume.ts`](src/data/resume.ts). No component changes are needed for:

- Name, title, location
- Skills list
- Experience entries (company, role, period, description, tags)
- Projects (name, tagline, description, stack, status)
- Contact links

Edit `resume.ts` and the change propagates everywhere automatically.

---

## Deploy

Deployed on **Vercel** via GitHub integration.

- Push to `main` → auto-deploy
- Production URL: `https://lucholabs-site.vercel.app`
- Post-deploy health check hits the production URL

No manual deploy steps required. The build runs `npm run build` which includes the SSR pre-render step (`scripts/prerender.mjs`) that injects server-rendered HTML into `dist/index.html` before upload.

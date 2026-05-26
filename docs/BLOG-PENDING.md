PENDING STEPS FOR BLOG — lucholabs.dev
=======================================
Last updated: 2026-05-22


------------------------------------------
MANUAL (YOU NEED TO DO THESE)
------------------------------------------

1. GISCUS SETUP — activate blog comments
   Follow: docs/giscus-setup.md
   Steps:
   - Enable Discussions on github.com/lualducor/lucholabs-site
   - Create a "Blog Comments" category (Announcement format)
   - Install the Giscus GitHub App on the repo
   - Visit https://giscus.app, configure for your repo, copy the IDs
   - Paste Repo ID and Category ID into:
     src/components/blog/Comments.tsx  lines 6-8
   Status: comments render nothing until both IDs are filled


------------------------------------------
STILL TO BUILD
------------------------------------------

2. docs/blog-publishing.md
   The full editorial guide (longer form, markdown).
   PUBLISHING.txt covers the same ground as a quick cheat-sheet,
   but the detailed doc with OG check, share-link test, image
   weight guidance was in the original plan scope.
   Effort: ~1 session, no code changes needed.


------------------------------------------
VERIFICATION TO RUN BEFORE FIRST REAL POST
------------------------------------------

3. Full build smoke test
   Run: npm run build
   Must pass the entire pipeline:
   build-post-index → tsc → vite build → SSR → prerender
   → generate-og-images → generate-rss → generate-sitemap

4. Dev server visual check
   Run: npm run dev
   Open: http://localhost:5173/blog/hello-world
   Verify:
   - 2px progress bar appears at top and fills as you scroll
   - Code blocks show a Copy button (flashes "Copied" on click)
   - Share block renders with Copy link / LinkedIn / X / WhatsApp
   - Author card shows photo, name, role, "Get in touch" link
   - Related posts section is empty (only 1 post — that is correct)

5. Mobile check
   Open DevTools mobile emulation or a real device.
   Verify:
   - TOC collapses into a <details> element (not the fixed right-rail)
   - Share buttons are large enough to tap (>=40px)
   - Progress bar does not overlap the nav


------------------------------------------
DEFERRED (AGREED OUT OF SCOPE FOR NOW)
------------------------------------------

- Decap CMS / /admin route
  Revisit after 5+ published posts.

- Newsletter subscribe block
  No provider, no cadence commitment. Confirmed out.

- Bilingual blog (/es/blog content)
  Routes exist but no translated posts yet.

- Series-progress UI (position 3 of 5 + next/prev)
  Premature until a series exists.

- Level badge (intro / intermediate / advanced frontmatter field)
  Deferred with series UI.

- Plausible API view-count dashboard script
  Deferred — requires Plausible API key setup.

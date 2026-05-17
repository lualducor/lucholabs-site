#!/usr/bin/env bash
# ship-restructure.sh — single-shot driver for the 2026-05-17 restructure shipping.
#
# Runs (in order):
#   1. Stage + commit Phase 2A schema deepening as the "data" commit
#   2. Stage + commit Phase 1B + slug rename as the "talks" commit
#   3. Stage + commit DECISIONS + dual-CTA as the "chore" commit
#   4. Stage + commit Phase 1A/2B/2C/3A/3D as the "restructure" commit
#   5. npm install -D sharp + generate favicon-32 + WebP variants
#   6. Stage + commit generated assets
#   7. git push
#
# DOES NOT run vercel CLI. DOES NOT deploy. You handle Vercel manually.
# Each git command runs with --no-verify=false (hooks enabled). Stops on first failure.

set -euo pipefail

cd "$(dirname "$0")/.."  # → lucholabs-site root

CO="Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"

echo "==> Step 1/7: Phase 2A data commit"
git add src/data/content.json src/data/content.schema.json src/data/resume.ts src/data/resume.test.ts src/data/loader.ts src/data/loader.test.ts tsconfig.app.json
git commit -m "feat(data): canonical content.json + schema + adapter + Phase 2A deepening

- 5 projects with cv/lab split fields (isHeadline, isKilled, repoUrl, etc.)
- 2 killed projects added (haycorte, klipper-copilot)
- New top-level keys: manifesto, nowNext, faq, urlNamespaces, seo, metrics
- LocaleString envelope for bilingual readiness
- loader.ts CMS-swap abstraction
- 43 tests passing

$CO"

echo "==> Step 2/7: Phase 1B + talks + slug rename"
git add src/pages/TalkPage.tsx src/components/TalkNav.tsx src/components/bento/RecentTalkCard.tsx src/App.tsx src/components/BentoGrid.tsx src/components/bento/IdentityCard.tsx public/talks/
git rm -f src/components/bento/UpcomingTalkCard.tsx 2>/dev/null || true
git commit -m "feat(talks): /talks/:slug route + TalkPage infra + Phase 1B perf

- TalkPage, TalkNav, RecentTalkCard, gallery assets
- Slug rename: public/talks/ai-cyber-2026 -> ai-cybersecurity-2026
- IdentityCard: fetchPriority + loading=eager + subMark + latamLine slots
- App.tsx: route-change Plausible pageview + lazy BlogPostPage + new routes

$CO"

echo "==> Step 3/7: DECISIONS + dual-CTA + llms positioning"
git add DECISIONS.md src/components/ContactSection.tsx public/llms.txt
git commit -m "chore: DECISIONS lock + dual-CTA + notForLine + analytics events + llms FDE positioning

$CO"

echo "==> Step 4/7: Phase 1A/2B/2C/3A/3D — measurement + SEO infra + components"
git add index.html vercel.json public/robots.txt
git add scripts/prerender.mjs scripts/generate-sitemap.mjs scripts/build-favicon.mjs scripts/convert-images.mjs scripts/validate-content.mjs scripts/ship-restructure.sh
git add src/lib/
git add src/components/EmailCaptureBlock.tsx src/components/ManifestoTeaserSection.tsx src/components/Nav.tsx src/components/ProjectsSection.tsx src/components/SpeakingSection.tsx src/components/CertificatesSection.tsx src/components/ExperienceSection.tsx
git add src/components/bento/SkillsCard.tsx src/components/bento/SpeakingPhotoCard.tsx
git add src/pages/HomePage.tsx src/pages/placeholders/
git add package.json package-lock.json
git commit -m "feat(restructure): Phase 1A/2B/2C/3A/3D — measurement + SEO + components

Phase 1A: Plausible analytics, favicon.svg referenced + 1.18MB PNG dropped, HSTS,
Cache-Control, JSON-LD @id + ImageObject, preload tags in <head>, removed meta keywords,
Nav touch targets >=44px, dropped green/pixelated tokens, ManifestoTeaserSection,
EmailCaptureBlock (mailto), Boveda-first reorder.

Phase 2B: loader.ts (CMS-swap), locale.ts (LocaleString resolver), jsonld.ts
(Person/WebSite/Article/Event/FAQ/Breadcrumb/Profile builders + tests),
validate-content.mjs (warn-only word count), 4 placeholder pages, SpeakingPhotoCard fix.

Phase 2C: ManifestoTeaserSection consumes manifesto, ProjectsSection headline pattern,
IdentityCard subMark + latamLine, ContactSection notForLine + CTA events, Nav /es toggle
+ anchor sub-nav, App.tsx new routes + lazy BlogPostPage, section IDs added.

Phase 3A: prerender talks loop + JSON-LD injection per route, sitemap drops
priority/changefreq + adds lastmod, robots AI crawler allows (GPTBot/ClaudeBot/etc).

Phase 3D: twitter:title 60-char cap, ProfilePage schema, H1 size fix, anchor sub-nav.

43 tests passing. Build green. Local SEO verification estimates 74-76/100 (baseline 61).

$CO"

echo "==> Step 5/7: Install sharp + generate assets"
npm install -D sharp
node scripts/build-favicon.mjs
node scripts/convert-images.mjs

echo "==> Step 6/7: Commit generated assets"
git add package.json package-lock.json public/favicon-32.png public/apple-touch-icon.png
# WebP siblings — only stage those that exist
git add public/photo.webp 2>/dev/null || true
git add public/speaking.webp 2>/dev/null || true
git add public/talks/ai-cybersecurity-2026/*.webp 2>/dev/null || true
git commit -m "feat(assets): sharp + favicon-32 + apple-touch-icon + WebP image variants

$CO"

echo "==> Step 7/7: Push"
git push

echo ""
echo "==================================================="
echo "✓ lucholabs-site restructure shipped to origin."
echo ""
echo "Next manual steps (Vercel-side, your domain):"
echo "  1. Watch the Vercel deploy for lucholabs-site."
echo "  2. Once green, verify:"
echo "       curl -I https://lucholabs.dev | grep -i strict-transport-security"
echo "       curl https://lucholabs.dev/sitemap.xml | grep talks"
echo "       curl https://lucholabs.dev/talks/ai-cybersecurity-2026 | grep '\"@type\":\"Event\"'"
echo ""
echo "  3. THELAB (separate repo): run ../THELAB/scripts/ship-thelab.sh after setting"
echo "     up the GitHub remote and Vercel project for THELAB."
echo ""
echo "  4. After THELAB is on Vercel, add the /lab rewrite to lucholabs-site/vercel.json:"
echo "       \"rewrites\": ["
echo "         { \"source\": \"/lab/:path*\", \"destination\": \"https://<thelab-url>/:path*\" },"
echo "         { \"source\": \"/((?!.*\\\\.).*)\", \"destination\": \"/index.html\" }"
echo "       ]"
echo "     Then commit + push that change."
echo ""
echo "  5. Re-run the SEO audit (same tool that produced SEOREPORT.txt)."
echo "     Target: 78-82/100 (baseline 61, current estimate 74-76)."
echo "==================================================="

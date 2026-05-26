# LuchoLabs Restructure — Decision Log

Canonical record of every gating decision in the dual-site restructure. Locked answers below override any earlier discussion in the plan file (`~/.claude/plans/ok-help-me-out-lucky-crown.md`).

If a decision changes later, update the entry **and** add a "Revised on YYYY-MM-DD" line — never delete history.

---

## D1 — Primary audience for CV positioning

**Locked:** Solutions / Forward-Deployed Engineer at AI-native US companies.

**Why:** Highest leverage for C1 English + Bogotá timezone + shipped AI/automation projects + open-source accessibility credibility. Per second-opinion review.

**Consequences for execution:**
- CV identity title rewrites around accessibility & trust infrastructure (worldview), not job description.
- Contact CTA primary action targets FT remote Solutions/FDE roles.
- Project framing emphasizes "shipped systems with real adoption" over speculative AI research.
- LinkedIn headline syncs to this positioning.

**Date:** 2026-05-16.

---

## D2 — Contact CTA mode

**Locked:** Dual primary — FT remote Solutions/FDE roles **and** speaking/collaboration co-primary, freelance as tertiary line.

**Why:** User wants both modes visible. Speaking is now a real credential (AICF 2026 panel + 2025 prior). Two distinct blocks is cleaner than one mixed CTA.

**Implementation:**
```
HIRE ME
Open to full-time remote Solutions/FDE roles at AI-native companies.
[Email]  [LinkedIn]
—
BOOK ME TO SPEAK
Available for talks, panels, podcasts on AI security & prompt injection.
[Email]
—
Also taking selective freelance work — DM with details.
```

**Date:** 2026-05-16.

---

## D3 — Bilingual strategy

**Locked:** Full bilingual via `/es/` subdirectory.

**Why:** Talks delivered in Spanish, LATAM relationship signals, audience overlap between US-remote and LATAM markets.

**Consequences:**
- `content.json` schema uses `{ en: "...", es: "..." }` on every translatable string field. Non-translatable fields (slugs, dates, URLs, status enums) stay flat.
- Every CV route gets an `/es/` counterpart route.
- `hreflang="en"` and `hreflang="es"` link tags on every page.
- `sitemap.xml` doubles.
- Lab `/lab` gets a Spanish twin at `/lab/es/index.html` (two HTML files consuming same `content.json`).
- Blog posts may be EN-only initially with `availableIn` field declaring future ES intent — not gating publication.

**Date:** 2026-05-16.

---

## D4 — Image asset hosting

**Locked (default):** All images in `lucholabs-site/public/`. Lab consumes by absolute URL (`https://lucholabs.dev/talks/...`, etc.).

**Why:** One-place asset management. Lab repo stays small and HTML-only.

**Date:** 2026-05-16.

---

## D5 — Lab content sync mechanism

**Locked (default):** `build.sh` script in THELAB that copies `content.json` from `lucholabs-site/src/data/content.json` and inlines it into `index.html` at deploy time.

**Why:** No runtime fetch, no CORS, works offline, single source of truth maintained.

**Date:** 2026-05-16.

---

## D6 — CV PDF lifecycle

**Locked (default):** Replace standalone `Lucholabs.pdf` with a `/print` route on the CV. Visitors save-as-PDF from the browser.

**Why:** Removes a manual sync burden. One canonical source.

**Date:** 2026-05-16.

---

## D7 — Talk video state

**Locked:** **Two source videos available** — (a) full 21-minute 1080p HEVC recording (`talk-2026/video/full-20min.mp4`) and (b) 50-second WhatsApp 480p highlight (`talk-2026/video/raw-source.mp4`).

**Plan:**
- Full 21-min → upload to YouTube as primary recording.
- 60–90s LinkedIn-native clip → cut from 21-min source using `ffmpeg`.
- Talk page video embed → YouTube player.
- Hero stills → extracted from 21-min source at 1080p (Codex agent curating in background).

**Date:** 2026-05-16.

---

## D8 — Newsletter platform

**Locked (default):** Defer. Promote RSS until ~100 subscribers, then re-evaluate Buttondown / Beehiiv / Substack.

**Date:** 2026-05-16.

---

## D9 — Analytics platform

**Locked (default):** Plausible (or Umami if self-hosted preference emerges later).

**Critical timing:** Install **before** Phase 2 changes ship so a baseline exists to measure restructure impact against.

**Date:** 2026-05-16.

---

## D10 — GitHub bio

**Locked (default):** Option 3 — leads with speaking credential.

Final text (pending paste of current bio to confirm length fits):
```
Automation engineer. Open-source accessibility tooling.
Panelist @ AI & Cybersecurity Forum 2026.
```

**Constraint:** GitHub bio is 160 chars max. Above is 113 chars — fits.

**Date:** 2026-05-16.

---

## Event format correction

**Locked:** The May 2026 AICF appearance was a **panel discussion** (4 panelists on couch + 1 in armchair + moderator), not a solo keynote. All CV / Lab / blog / LinkedIn copy frames Luis as **panelist** on this event.

**Why this matters:** Original plan drafts assumed solo talk. Discovered after photo review on 2026-05-16.

**Date:** 2026-05-16.

---

## Open decisions (not yet locked)

- **GitHub bio final text** — pending paste of current GitHub bio so user can compare and confirm.
- **LinkedIn vanity URL** — current is `luis-alberto-duarte-cortes-97748171`; user has not confirmed whether a shorter vanity URL will be set.
- **Thesis repository visibility** — unknown whether captioning code repo is public, private, or local-only. Needed for Phase 5C pinning.
- **`lucholabs.dev` Vercel domain status** — whether custom domain is already pointing at the CV Vercel project.
- **`lualducor/THELAB` push status** — whether the Lab repo is on GitHub yet.
- **Conference URL + organizer LinkedIn handles** — needed for blog recap, LinkedIn post tagging, llms.txt update.

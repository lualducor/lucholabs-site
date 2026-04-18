# Publishing from Android

One-time setup: ~15 minutes. After that, new posts take 4 taps.

## 1. Create a GitHub Personal Access Token

The shortcut commits files to your repo, so it needs an auth token.

1. Go to <https://github.com/settings/tokens?type=beta>
2. Click **Generate new token** → **Fine-grained personal access token**
3. Name: `lucholabs-new-post`
4. Expiration: 1 year (set a calendar reminder to rotate it)
5. Repository access: **Only select repositories** → select `lualducor/lucholabs-site`
6. Repository permissions, set only these two:
   - **Contents**: Read and write
   - **Metadata**: Read-only (auto-added; leave it)
7. Click **Generate token**
8. **Copy the token immediately** — it won't be shown again. It starts with `github_pat_`.

The token lives only on your phone and (optionally) your laptop. Never commit it.

## 2. Install HTTP Shortcuts

Either source works:

- **Play Store**: <https://play.google.com/store/apps/details?id=ch.rmy.android.http_shortcuts>
- **F-Droid** (no Google Play required): <https://f-droid.org/packages/ch.rmy.android.http_shortcuts/>

Open the app once, allow notification permission so you see failure alerts.

## 3. Import the shortcut config

1. Download `docs/android-shortcut.json` from this repo to your phone
2. In HTTP Shortcuts, tap the top-right menu → **Import/Export** → **Import from file**
3. Select the downloaded `android-shortcut.json`
4. Tap the imported shortcut → pencil icon (edit) → **Variables**
5. Find the variable named `GITHUB_TOKEN` and paste your token from step 1
6. Save

## 4. Put it on your home screen

1. Long-press the shortcut in the app
2. Tap **Place on home screen**
3. Pick a name and icon

## 5. Use it

Tap the home-screen icon. It asks four things in order:

1. **Title** — e.g. `Building Boveda's data layer`
2. **Tags** — comma-separated, e.g. `boveda, fintech, sqlalchemy`
3. **Description** — one sentence, used in social previews
4. **Body** — full markdown content

Hit submit. The shortcut:

- Derives the slug from the title
- Stamps today's date (UTC)
- Builds the MDX frontmatter
- Commits to `main` via the GitHub Contents API
- Shows a success toast with the post URL

Vercel auto-deploys and the post is live in ~1-2 minutes.

## Troubleshooting

**"401 Unauthorized"** — token is wrong, expired, or lacks Contents write permission. Regenerate per step 1.

**"422 Unprocessable Entity"** — a post with that slug already exists. Either delete the existing one in the repo or change your title.

**"409 Conflict"** — someone (or another device) committed to `main` in the last few seconds. Tap the shortcut again.

**Post didn't appear** — check <https://github.com/lualducor/lucholabs-site/commits/main>. If the commit is there, Vercel is still building; wait 2 min. If no commit, the shortcut didn't reach GitHub — open HTTP Shortcuts → History to see the raw request/response.

## Security notes

- The token only has access to this one repo and only to Contents + Metadata
- If your phone is lost: revoke the token at <https://github.com/settings/tokens>
- Rotate the token yearly (calendar reminder from step 1.4)

# Editing and deleting posts

Creating posts is a one-step workflow (see README "Adding a post"). Editing and deleting are rare enough — and stateful enough — that the right tool is GitHub's web UI, not a custom shortcut.

## Edit a post

### From phone (GitHub mobile app or browser)

1. Open <https://github.com/lualducor/lucholabs-site/tree/main/content/posts>
2. Tap the `.mdx` file for the post
3. Tap the pencil icon (top-right of the file view)
4. Make your changes — GitHub's editor has syntax highlighting and a Preview tab
5. Scroll down → fill in the commit message (e.g. `blog: fix typo in hello-world`)
6. Tap **Commit changes** → **Commit directly to the main branch** → confirm

Vercel deploys in ~1-2 minutes.

### From desktop

```bash
git pull
$EDITOR content/posts/the-post.mdx    # vim, code, nano, whatever
git add -A
git commit -m "blog: edit the-post — brief description"
git push
```

No script needed. The friction is in the content editing, not the Git commands.

## Delete a post

### From phone

1. Open <https://github.com/lualducor/lucholabs-site/tree/main/content/posts>
2. Tap the `.mdx` file
3. Tap the trash icon (top-right of the file view)
4. Commit message prefills — edit to `blog: remove the-post`
5. **Commit directly to main branch** → confirm

### From desktop

```bash
git pull
git rm content/posts/the-post.mdx
git commit -m "blog: remove the-post"
git push
```

## Rename or change the slug of a post

Renaming a file changes the URL. Existing links and anyone who shared the old URL will 404. If you must rename:

### From desktop only (do not do this from phone — too easy to lose the old file)

```bash
git mv content/posts/old-slug.mdx content/posts/new-slug.mdx
# Now edit the file and update the `slug:` field in frontmatter to match
$EDITOR content/posts/new-slug.mdx
git add -A
git commit -m "blog: rename old-slug → new-slug"
git push
```

Consider whether the old URL should redirect. If the post had traffic, add a redirect to `vercel.json`:
```json
{
  "redirects": [
    { "source": "/blog/old-slug", "destination": "/blog/new-slug", "permanent": true }
  ]
}
```
Do not touch the `headers` array when editing `vercel.json`.

## Why these aren't one-tap shortcuts

**Edit** needs finding the post first, which needs a file browser, which means building admin UI you don't want. GitHub already has one.

**Delete** needs a confirmation step. One accidental tap and a post is gone — that's exactly the kind of irreversible operation that benefits from GitHub's "commit message + confirm" friction.

**Rename** is rare enough that the risk of getting it wrong on a phone (losing the old content, breaking URLs silently) outweighs the convenience.

If you find yourself editing so often that the GitHub flow is a bottleneck, the right next step is **Obsidian with the Git plugin** pointed at `content/posts/` — not a bigger shortcut.

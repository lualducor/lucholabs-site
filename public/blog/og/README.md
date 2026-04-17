# Blog post OG images

One image per post. Filename matches the `ogImage` field in post frontmatter.

## Spec
- Size: 1200 x 630 px
- Format: JPG or PNG (JPG preferred for photos, PNG for graphics)
- Naming: matches `ogImage` value exactly
  - frontmatter `ogImage: "building-boveda.jpg"` -> file `building-boveda.jpg`

## Fallback
If a post has no `ogImage` field, the prerender uses `/og-image.jpg` (the global OG image).

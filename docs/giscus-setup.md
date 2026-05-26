# Giscus Setup

One-time manual steps to activate comments on the blog.

## 1. Enable GitHub Discussions

Go to: https://github.com/lualducor/lucholabs-site/settings  
Check **Discussions** under the Features section. Save.

## 2. Create a "Blog Comments" category

Go to: https://github.com/lualducor/lucholabs-site/discussions/categories  
Click **New category**. Name it `Blog Comments`. Choose **Announcement** format
(only you can open threads; readers can reply). Save.

## 3. Install the Giscus GitHub App

Visit: https://github.com/apps/giscus  
Click **Install**. Grant access to `lualducor/lucholabs-site`.

## 4. Get your repo and category IDs

Visit: https://giscus.app  
Fill in:
- Repository: `lualducor/lucholabs-site`
- Page ↔ Discussions mapping: **pathname**
- Discussion category: `Blog Comments`

The tool will show you two values:
- `data-repo-id` — this is your **Repo ID**
- `data-category-id` — this is your **Category ID**

## 5. Fill in the IDs

Open `src/components/blog/Comments.tsx` and fill in:

```ts
const GISCUS_REPO_ID = 'R_...'        // paste Repo ID here
const GISCUS_CATEGORY_ID = 'DIC_...'  // paste Category ID here
```

The component is already gated — it renders nothing until both values are filled.
Once filled, save and deploy.

## 6. Verify

Open any published blog post in a browser. Scroll to the bottom.
The Giscus comment box should appear. The iframe loads from `https://giscus.app`.

If you see a CSP error in the console, check that `vercel.json` has `https://giscus.app`
in `frame-src`, `script-src`, `connect-src`, and `style-src`. This is already configured.

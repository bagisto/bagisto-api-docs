---
outline: false
---

# URL Rewrites

A **URL rewrite** redirects an old or custom path to a target path, so links keep working when a product, category, or CMS page slug changes. It mirrors the admin **Marketing → Search & SEO → URL Rewrites** screen.

## How a URL rewrite works

Each rewrite maps a **source path** to a **destination path** for a given entity and locale.

- **`entityType`** ties the rewrite to a `product`, `category`, or `cms_page` — the kind of storefront page the rewrite is for.
- **`requestPath`** is the path the shopper requests (the old or custom slug).
- **`targetPath`** is where that request is sent.
- **`redirectType`** decides the kind of redirect:

| `redirectType` | Meaning | Use when |
|----------------|---------|----------|
| `301` | Permanent redirect | The old path is gone for good; search engines should pass ranking to the new path |
| `302` | Temporary redirect | The move is temporary; keep the old path's ranking |

- **`locale`** scopes the rewrite to a single storefront locale.

**Keeping old links alive.** When a slug changes, the rewrite makes the old link still resolve to the right page. This complements the automatic rewrites the store creates when a slug is edited — you can also add your own custom redirects here.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List](/api/graphql-api/admin/marketing/search-seo/url-rewrites-list) | `adminMarketingUrlRewrites` query |
| [Detail](/api/graphql-api/admin/marketing/search-seo/url-rewrites-detail) | `adminMarketingUrlRewrite` query |
| [Create](/api/graphql-api/admin/marketing/search-seo/url-rewrites-create) | `createAdminMarketingUrlRewrite` mutation |
| [Update](/api/graphql-api/admin/marketing/search-seo/url-rewrites-update) | `updateAdminMarketingUrlRewrite` mutation |
| [Delete](/api/graphql-api/admin/marketing/search-seo/url-rewrites-delete) | `deleteAdminMarketingUrlRewrite` mutation |
| [Mass Delete](/api/graphql-api/admin/marketing/search-seo/url-rewrites-mass-delete) | `createAdminMarketingUrlRewriteMassDelete` mutation |

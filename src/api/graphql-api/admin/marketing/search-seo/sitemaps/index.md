---
outline: false
---

# Sitemaps

A **sitemap** is an XML file that lists your store's public URLs so search engines can crawl them efficiently. It mirrors the admin **Marketing → Search & SEO → Sitemaps** screen.

## How a sitemap works

A sitemap has two parts: a **definition** (where the file lives) and a **generation** step that builds the actual XML.

- **Definition** — `fileName` is the index file's name (must end with `.xml`) and `path` is the directory it lives in (must start and end with `/`). Together they set where the sitemap index is written.
- **Generation** — the [generate](/api/graphql-api/admin/marketing/search-seo/sitemaps-generate) action walks every public category, product, and page, writes the index file plus per-batch XML files, and records their paths.

**Generated paths.** After a generate run, the detail query exposes `indexFile` (the index path) and `generatedSitemaps` (the per-batch file paths). Both are `null` / empty before the first generation. `generatedAt` records when the files were last built.

**Generation is explicit.** Creating or updating a sitemap definition does **not** auto-build the XML — you must call the generate action yourself. Generation runs synchronously, so the response carries the written paths once finished. If sitemap generation is disabled in store configuration, the generate action still succeeds but produces no files.

**Relation to SEO.** A sitemap feeds search engines the URLs that the rest of the **Search & SEO** menu — [URL Rewrites](/api/graphql-api/admin/marketing/search-seo/url-rewrites/), [Search Terms](/api/graphql-api/admin/marketing/search-seo/search-terms/), and [Search Synonyms](/api/graphql-api/admin/marketing/search-seo/search-synonyms/) — works to keep discoverable.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List](/api/graphql-api/admin/marketing/search-seo/sitemaps-list) | `adminMarketingSitemaps` query |
| [Detail](/api/graphql-api/admin/marketing/search-seo/sitemaps-detail) | `adminMarketingSitemap` query |
| [Create](/api/graphql-api/admin/marketing/search-seo/sitemaps-create) | `createAdminMarketingSitemap` mutation |
| [Update](/api/graphql-api/admin/marketing/search-seo/sitemaps-update) | `updateAdminMarketingSitemap` mutation |
| [Delete](/api/graphql-api/admin/marketing/search-seo/sitemaps-delete) | `deleteAdminMarketingSitemap` mutation |
| [Generate](/api/graphql-api/admin/marketing/search-seo/sitemaps-generate) | `createAdminMarketingSitemapGenerate` mutation |

`indexFile` and `generatedSitemaps` resolve only on the **detail** query — they are omitted from list rows.

All Sitemaps operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

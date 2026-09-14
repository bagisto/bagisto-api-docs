---
outline: false
---

# Sitemaps

A **sitemap** is an XML file that lists your store's public URLs so search engines can crawl them efficiently. Each definition records where the index file lives, which channels it covers and, once built, which XML files it produced for each of them. It mirrors the admin **Marketing → Search & SEO → Sitemaps** screen.

## How a sitemap works

A sitemap has three parts: a **definition** (where its files go), the **channels** it covers, and a **generation** step that builds the actual XML.

- **Definition** — `fileName` is the index file's name (must end with `.xml`) and `path` is the directory it lives in (must start and end with `/`). Together they set where the sitemap index is written.
- **Channels** — `channels` is the list of channel ids the sitemap covers, and at least one is required. Generation runs once per channel, so a sitemap covering none produces nothing.
- **Generation** — the [generate](/api/graphql-api/admin/marketing/search-seo/sitemaps-generate) action walks each channel's root category subtree together with the products and pages assigned to that channel, writes an index file plus per-batch XML files under `sitemaps/{channel}/`, and records what it wrote.

**One channel, one set of files.** Each channel gets its own index and child files, and the URLs inside them use that channel's hostname — so a storefront served on a second domain is crawled under that domain. `urls` returns the public index URL per channel, which is the link to submit to a search engine.

**Generated paths.** After a generate run, the detail query exposes `generatedFiles` — one entry per channel with its `hostname`, `index` and `sitemaps[]`. It is empty before the first generation. `generatedAt` records when the files were last built.

**Generation is explicit.** Creating or updating a sitemap definition does **not** auto-build the XML — you must call the generate action yourself. Generation runs synchronously, so the response carries the written paths once finished. A sitemap covering no channel is refused, since there is nothing to walk. If sitemap generation is disabled in store configuration, the generate action still succeeds but produces no files.

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

`generatedFiles` resolves only on the **detail** query — list rows carry the definition fields, the channels and their `urls`.

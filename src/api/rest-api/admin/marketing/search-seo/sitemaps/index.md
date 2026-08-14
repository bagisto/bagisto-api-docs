---
outline: false
---

# Sitemaps

A **sitemap** is an XML file that lists your storefront URLs for search-engine
crawlers. Each definition records where the index file lives and, once built,
which per-batch XML files it produced. It mirrors the admin **Marketing →
Search & SEO → Sitemaps** screen.

## How a sitemap works

A sitemap has two stages: **define** it, then **generate** it.

- **Define** — `file_name` is the index file's name (must end with `.xml`) and
  `path` is where that index file is written (must start and end with `/`, no
  `//`). Creating or updating a definition only stores these settings.
- **Generate** — building the actual XML is a separate, explicit step. The
  [generate](/api/rest-api/admin/marketing/search-seo/sitemaps-generate) action
  walks every public category, product, and page, writes the index file plus the
  per-batch product / category / page XML files, and records their paths.

**Built-file fields.** `generatedAt` is the timestamp of the last generate run,
`indexFile` is the path of the produced index file, and `generatedSitemaps` lists
the per-batch XML files. All three stay empty until the first generate. They are
returned on the [detail](/api/rest-api/admin/marketing/search-seo/sitemaps-detail)
endpoint — list rows carry only the flat definition fields.

**No auto-generation.** Create and update never rebuild the XML — they only change
the definition. Always call generate explicitly after a definition change.

**Disabled generation.** If sitemap generation is turned off in the store
configuration, the generate request still succeeds but produces no files.

**Deleting** a sitemap removes both the definition row and its generated XML files.

## Relation to other menus

A sitemap feeds search engines the URLs that the rest of **Search & SEO** shapes —
the canonical paths that [URL Rewrites](/api/rest-api/admin/marketing/search-seo/url-rewrites/)
redirect to and that drive organic discovery.

## Operations in this menu

| Action | Endpoint |
|--------|----------|
| [List](/api/rest-api/admin/marketing/search-seo/sitemaps-list) | `GET /api/admin/marketing/sitemaps` |
| [Detail](/api/rest-api/admin/marketing/search-seo/sitemaps-detail) | `GET /api/admin/marketing/sitemaps/{id}` |
| [Create](/api/rest-api/admin/marketing/search-seo/sitemaps-create) | `POST /api/admin/marketing/sitemaps` |
| [Update](/api/rest-api/admin/marketing/search-seo/sitemaps-update) | `PUT /api/admin/marketing/sitemaps/{id}` |
| [Delete](/api/rest-api/admin/marketing/search-seo/sitemaps-delete) | `DELETE /api/admin/marketing/sitemaps/{id}` |
| [Generate](/api/rest-api/admin/marketing/search-seo/sitemaps-generate) | `POST /api/admin/marketing/sitemaps/{id}/generate` |

`indexFile` and `generatedSitemaps` are returned only on the **detail** endpoint —
they are not present on list rows.

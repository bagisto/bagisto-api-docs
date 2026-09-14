---
outline: false
---

# Sitemaps

A **sitemap** is an XML file that lists your storefront URLs for search-engine
crawlers. Each definition records where the index file lives, which channels it covers and,
once built, which XML files it produced for each of them. It mirrors the admin **Marketing →
Search & SEO → Sitemaps** screen.

## How a sitemap works

A sitemap has three parts: **where** its files go, **which channels** it covers,
and the **generate** step that builds them.

- **Define** — `file_name` is the index file's name (must end with `.xml`) and
  `path` is where that index file is written (must start and end with `/`, no
  `//`). Creating or updating a definition only stores these settings.
- **Channels** — `channels` is the list of channel ids the sitemap covers, and at
  least one is required. Generation runs once per channel, so a sitemap covering
  none produces nothing.
- **Generate** — building the actual XML is a separate, explicit step. The
  [generate](/api/rest-api/admin/marketing/search-seo/sitemaps-generate) action walks each channel's root category
  subtree together with the products and pages assigned to that channel, writes an
  index file plus the per-batch XML files under `sitemaps/{channel}/`, and records
  what it wrote.

**One channel, one set of files.** Each channel gets its own index and child files,
and the URLs inside them use that channel's hostname — so a storefront served on a
second domain is crawled under that domain. `urls` returns the public index URL per
channel, which is the link to submit to a search engine.

**Built-file fields.** `generatedAt` is the timestamp of the last generate run and
`generatedFiles` lists what it wrote, one entry per channel with its `hostname`,
`index` and `sitemaps[]`. Both stay empty until the first generate. `generatedFiles`
is returned on the [detail](/api/rest-api/admin/marketing/search-seo/sitemaps-detail) endpoint — list rows carry the
definition fields, the channels and their `urls`.

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

`generatedFiles` is returned only on the **detail** endpoint — it is not present on
list rows.

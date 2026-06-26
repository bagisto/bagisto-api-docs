---
outline: false
examples:
  - id: detail
    title: Sitemap Detail
    description: Full payload for a single sitemap, including the generated index file and per-batch sitemap paths.
    query: |
      query AdminMarketingSitemap($id: ID!) {
        adminMarketingSitemap(id: $id) {
          id
          _id
          fileName
          path
          generatedAt
          indexFile
          generatedSitemaps
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/marketing/sitemaps/1"
      }
    response: |
      {
        "data": {
          "adminMarketingSitemap": {
            "id": "/api/admin/marketing/sitemaps/1",
            "_id": 1,
            "fileName": "sitemap.xml",
            "path": "/",
            "generatedAt": "2026-06-23T13:00:00+05:30",
            "indexFile": "/sitemap.xml",
            "generatedSitemaps": [
              "/sitemap-products-1.xml",
              "/sitemap-categories-1.xml"
            ],
            "createdAt": "2026-06-20T10:00:00+05:30",
            "updatedAt": "2026-06-23T13:00:00+05:30"
          }
        }
      }
---

# Sitemap Detail

Returns a single sitemap with its full field set — the data behind the admin
**Marketing → Search & SEO → Sitemaps** view screen.

::: tip
New here? Read the [Sitemaps overview](/api/graphql-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingSitemap` | Query | Fetch one sitemap by id |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Pass the sitemap's IRI (e.g. `/api/admin/marketing/sitemaps/1`) as the `id`
  argument; `_id` in the response is the numeric id.
- Unlike list rows, the detail query resolves `indexFile` and
  `generatedSitemaps` — the paths written by the last
  [generate](/api/graphql-api/admin/marketing/search-seo/sitemaps-generate) run.
  Both are `null` / empty before the sitemap is generated for the first time.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | ID | The sitemap's IRI |
| `_id` | Int | Numeric id |
| `fileName` | String | Index file name (ends with `.xml`) |
| `path` | String | Directory the index file lives in (starts and ends with `/`) |
| `generatedAt` | String | Timestamp of the last generate run, or `null` |
| `indexFile` | String | Path of the generated index file, or `null` before first generate |
| `generatedSitemaps` | Array | Paths of the per-batch product / category / page files; empty before first generate |
| `createdAt` | String | Creation timestamp |
| `updatedAt` | String | Last-update timestamp |

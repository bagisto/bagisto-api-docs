---
outline: false
apiType: rest
examples:
  - id: detail
    title: Sitemap Detail
    description: Full payload for a single sitemap, including the built index file and child sitemap paths.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/sitemaps/1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 1,
        "fileName": "sitemap.xml",
        "path": "/",
        "generatedAt": null,
        "indexFile": "/sitemap.xml",
        "generatedSitemaps": [
          "/sitemap-products-1.xml",
          "/sitemap-categories-1.xml"
        ],
        "createdAt": "2026-06-20T10:00:00+05:30",
        "updatedAt": "2026-06-20T10:00:00+05:30"
      }
---

# Sitemap Detail

Returns a single sitemap with its full field set — the data behind the admin
**Marketing → Search & SEO → Sitemaps** view screen.

::: tip
New here? Read the [Sitemaps overview](/api/rest-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps/{id}` | GET |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Unlike list rows, the detail endpoint returns `indexFile` and
  `generatedSitemaps` — the actual XML files produced by the last generate run.
- `indexFile` is `null` and `generatedSitemaps` is empty until the sitemap has
  been generated at least once.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Numeric id |
| `fileName` | string | Index file name (ends with `.xml`) |
| `path` | string | Path where the index file is written (starts and ends with `/`) |
| `generatedAt` | string | Timestamp of the last generate run, or `null` |
| `indexFile` | string | Path of the generated index file, or `null` before first generate |
| `generatedSitemaps` | string[] | Paths of the per-batch product / category / page XML files |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |

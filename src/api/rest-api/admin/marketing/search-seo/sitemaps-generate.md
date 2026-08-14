---
outline: false
apiType: rest
examples:
  - id: generate
    title: Generate Sitemap
    description: Build the XML files for a sitemap. Send an empty body — the id comes from the URL.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/sitemaps/1/generate" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "sitemapId": 1,
        "indexFile": "/sitemap.xml",
        "generatedSitemaps": [
          "/sitemap-products-1.xml"
        ],
        "generatedAt": "2026-06-23T13:00:00+05:30",
        "message": "Sitemap generated successfully."
      }
---

# Generate Sitemap

Builds the XML files for a sitemap — the **Generate** row action on the admin
**Marketing → Search & SEO → Sitemaps** screen. Saving a sitemap does not build
its files, so this is the explicit step that produces them.

New here? Read the [Sitemaps overview](/api/rest-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps/{id}/generate` | POST |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.sitemaps.edit`
  permission.
- Send an **empty body** — the sitemap id comes from the URL.
- Walks every public category, product, and page, writes the index file plus the
  per-batch XML files, and records their paths and the generate timestamp on the
  sitemap row.
- The response carries the generated file paths once the build finishes.
- If sitemap generation is disabled in the store configuration, the request still
  succeeds but produces no files (`indexFile` `null`, `generatedSitemaps` empty).

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `sitemapId` | int | Id of the sitemap that was generated |
| `indexFile` | string | Path of the generated index file |
| `generatedSitemaps` | string[] | Paths of the per-batch XML files |
| `generatedAt` | string | Timestamp of this generate run |
| `message` | string | Success message |

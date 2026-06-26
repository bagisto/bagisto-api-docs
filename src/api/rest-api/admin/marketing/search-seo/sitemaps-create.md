---
outline: false
apiType: rest
examples:
  - id: create
    title: Create Sitemap
    description: Create a sitemap definition. The XML is not built on save — call generate explicitly.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/sitemaps" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "file_name": "sitemap.xml",
          "path": "/"
        }'
    variables: |
      {}
    response: |
      {
        "id": 1,
        "fileName": "sitemap.xml",
        "path": "/",
        "generatedAt": null,
        "indexFile": null,
        "generatedSitemaps": [],
        "createdAt": "2026-06-20T10:00:00+05:30",
        "updatedAt": "2026-06-20T10:00:00+05:30"
      }
---

# Create Sitemap

Creates a sitemap definition — the **Create Sitemap** action on the admin
**Marketing → Search & SEO → Sitemaps** screen.

::: tip
New here? Read the [Sitemaps overview](/api/rest-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps` | POST |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.sitemaps.create`
  permission.
- Returns the full sitemap payload.

::: warning The XML is not built on save
Creating the row only registers the definition — `generatedAt`, `indexFile`,
and `generatedSitemaps` stay empty. Call
[generate](/api/rest-api/admin/marketing/search-seo/sitemaps-generate)
(`POST /api/admin/marketing/sitemaps/{id}/generate`) to build the XML files.
:::

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `file_name` | string | yes | Index file name — letters, digits, `-`, `_`, `.`; must end with `.xml` |
| `path` | string | yes | Where the index file is written — must start and end with `/`, no `//` |

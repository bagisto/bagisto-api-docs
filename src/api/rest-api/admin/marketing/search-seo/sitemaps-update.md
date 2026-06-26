---
outline: false
apiType: rest
examples:
  - id: update
    title: Update Sitemap
    description: Update a sitemap's file name. Update is a partial merge — send only the fields you change.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/sitemaps/1" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "file_name": "sitemap-v2.xml"
        }'
    variables: |
      {}
    response: |
      {
        "id": 1,
        "fileName": "sitemap-v2.xml",
        "path": "/",
        "generatedAt": null,
        "indexFile": null,
        "generatedSitemaps": [],
        "createdAt": "2026-06-20T10:00:00+05:30",
        "updatedAt": "2026-06-20T10:05:00+05:30"
      }
---

# Update Sitemap

Updates an existing sitemap — the **Edit Sitemap** action on the admin
**Marketing → Search & SEO → Sitemaps** screen.

::: tip
New here? Read the [Sitemaps overview](/api/rest-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps/{id}` | PUT |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.sitemaps.edit`
  permission.
- The update is a **partial merge** — send only the fields you want to change;
  omitted fields keep their existing values.
- Returns the full updated sitemap payload.

::: warning No auto-regeneration
Changing `file_name` / `path` does not rebuild the XML. Call
[generate](/api/rest-api/admin/marketing/search-seo/sitemaps-generate)
(`POST /api/admin/marketing/sitemaps/{id}/generate`) to refresh the files.
:::

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `file_name` | string | no | Index file name — letters, digits, `-`, `_`, `.`; must end with `.xml` |
| `path` | string | no | Where the index file is written — must start and end with `/`, no `//` |

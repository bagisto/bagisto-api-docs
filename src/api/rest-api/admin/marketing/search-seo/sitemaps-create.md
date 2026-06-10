---
outline: false
apiType: rest
examples:
  - id: admin-marketing-sitemap-create
    title: Create Sitemap
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/sitemaps" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "file_name": "sitemap.xml", "path": "/" }'
    response: |
      { "id": 4, "fileName": "sitemap.xml", "path": "/" }
---

# Create Sitemap

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps` | POST |

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `file_name` | string | yes | |
| `path` | string | yes | |

::: warning Sitemap is not auto-generated on save
Creating the row does NOT build the XML files. Call `POST /api/admin/marketing/sitemaps/{id}/generate` to (re)build the XML.
:::

Permission: `marketing.search_seo.sitemaps.create`.

---
outline: false
apiType: rest
examples:
  - id: admin-marketing-sitemap-update
    title: Update Sitemap
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/sitemaps/4" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "file_name": "sitemap-v2.xml" }'
    response: |
      { "id": 4, "fileName": "sitemap-v2.xml", "path": "/" }
---

# Update Sitemap

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps/{id}` | PUT |

::: warning No auto-regeneration
Updating `file_name` / `path` does NOT regenerate the XML. Call `POST /sitemaps/{id}/generate` to refresh.
:::

Permission: `marketing.search_seo.sitemaps.edit`.

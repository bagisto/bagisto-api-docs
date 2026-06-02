---
outline: false
apiType: rest
examples:
  - id: admin-marketing-sitemap-delete
    title: Delete Sitemap
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/sitemaps/4" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Sitemap deleted." }
---

# Delete Sitemap

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps/{id}` | DELETE |

Removes the DB row and the generated XML files.

Permission: `marketing.search_seo.sitemaps.delete`.

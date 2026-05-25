---
outline: false
apiType: rest
examples:
  - id: admin-marketing-sitemap-detail
    title: Sitemap Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/sitemaps/4" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 4, "fileName": "sitemap.xml", "path": "/", "generatedAt": "2026-05-23T11:02:55+00:00", "indexFile": "/sitemap.xml", "generatedSitemaps": ["/sitemap-4-1.xml"] }
---

# Sitemap Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps/{id}` | GET |

Detail includes `generatedAt`, `indexFile`, and `generatedSitemaps` (the latter two are detail-only — null in listing rows).

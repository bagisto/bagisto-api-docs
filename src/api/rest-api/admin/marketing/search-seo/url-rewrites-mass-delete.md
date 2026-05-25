---
outline: false
apiType: rest
examples:
  - id: admin-marketing-url-rewrite-mass-delete
    title: Mass Delete URL Rewrites
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/url-rewrites/mass-delete" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [12, 18] }'
    response: |
      { "deleted": [12, 18], "message": "URL rewrites deleted." }
---

# Mass Delete URL Rewrites

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites/mass-delete` | POST |

Non-existent IDs silently skipped.

Permission: `marketing.search_seo.url_rewrites.delete`.

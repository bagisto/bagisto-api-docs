---
outline: false
apiType: rest
examples:
  - id: admin-marketing-url-rewrite-delete
    title: Delete URL Rewrite
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/url-rewrites/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "URL rewrite deleted." }
---

# Delete URL Rewrite

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites/{id}` | DELETE |

Permission: `marketing.search_seo.url_rewrites.delete`.

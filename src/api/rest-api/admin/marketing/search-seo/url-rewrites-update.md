---
outline: false
apiType: rest
examples:
  - id: admin-marketing-url-rewrite-update
    title: Update URL Rewrite
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/url-rewrites/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "target_path": "newer-path", "redirect_type": "302" }'
    response: |
      { "id": 1, "targetPath": "newer-path", "redirectType": "302" }
---

# Update URL Rewrite

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites/{id}` | PUT |

Permission: `marketing.search_seo.url_rewrites.edit`.

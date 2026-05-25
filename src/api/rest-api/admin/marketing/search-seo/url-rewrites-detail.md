---
outline: false
apiType: rest
examples:
  - id: admin-marketing-url-rewrite-detail
    title: URL Rewrite Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/url-rewrites/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "entityType": "product", "requestPath": "old-path", "targetPath": "new-path", "redirectType": "301", "locale": "en" }
---

# URL Rewrite Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites/{id}` | GET |

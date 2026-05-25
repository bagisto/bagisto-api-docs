---
outline: false
apiType: rest
examples:
  - id: admin-marketing-url-rewrite-create
    title: Create URL Rewrite
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/url-rewrites" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "entity_type": "product", "request_path": "old-path", "target_path": "new-path", "redirect_type": "301", "locale": "en" }'
    response: |
      { "id": 1, "entityType": "product", "requestPath": "old-path", "targetPath": "new-path", "redirectType": "301", "locale": "en" }
---

# Create URL Rewrite

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites` | POST |

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `entity_type` | enum | yes | `product`, `category`, `cms_page`. |
| `request_path` | string | yes | |
| `target_path` | string | yes | |
| `redirect_type` | enum | yes | `301`, `302`. |
| `locale` | string | yes | Locale code. |

Permission: `marketing.search_seo.url_rewrites.create`.

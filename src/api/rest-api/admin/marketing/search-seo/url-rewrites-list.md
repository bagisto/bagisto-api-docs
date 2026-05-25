---
outline: false
apiType: rest
examples:
  - id: admin-marketing-url-rewrites-list
    title: List URL Rewrites
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/url-rewrites" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "entityType": "product", "requestPath": "old-path", "targetPath": "new-path", "redirectType": "301", "locale": "en" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List URL Rewrites

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites` | GET |

## Query Parameters

`page`, `per_page` (default 10, cap 50), `entity_type` (`product`/`category`/`cms_page`), `request_path` (partial), `redirect_type` (`301`/`302`), `locale`, `sort` (`id`, `entity_type`, `locale`, `redirect_type`), `order`.

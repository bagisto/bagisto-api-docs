---
outline: false
apiType: rest
examples:
  - id: admin-marketing-templates-list
    title: List Email Templates
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/templates?per_page=10" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "name": "Welcome Email", "status": "active", "createdAt": "2026-01-01 00:00:00" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Email Templates

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/templates` | GET |

## Query Parameters

`page`, `per_page` (default 10, cap 50), `name` (partial), `status` (`active`/`inactive`/`draft`), `sort` (`id`, `name`), `order`.

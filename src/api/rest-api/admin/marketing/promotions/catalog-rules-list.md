---
outline: false
apiType: rest
examples:
  - id: admin-marketing-catalog-rules-list
    title: List Catalog Rules
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/catalog-rules?per_page=10" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "name": "Summer 10% off", "status": 1, "actionType": "by_percent", "discountAmount": 10, "startsFrom": "2026-06-01", "endsTill": "2026-08-31" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Catalog Rules

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules` | GET |

## Query Parameters

`page`, `per_page` (default 10, cap 50), `name` (partial), `status` (0/1), `sort` (`id`, `name`, `sort_order`), `order` (`asc`/`desc`).

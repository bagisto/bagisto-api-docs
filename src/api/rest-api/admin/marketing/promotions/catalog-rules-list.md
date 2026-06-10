---
outline: false
apiType: rest
examples:
  - id: admin-marketing-catalog-rules-list
    title: List Catalog Rules
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/catalog-rules?per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "name": "Summer 10% off", "status": 1, "actionType": "by_percent", "discountAmount": 10, "startsFrom": "2026-06-01", "endsTill": "2026-08-31" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Catalog Rules

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules` | GET |

## Query Parameters

| Parameter | Notes |
|-----------|-------|
| `page` | Page number. |
| `per_page` | Page size (default 10, cap 50). |
| `id` | Single id or comma-separated list (e.g. `1,4,9`). |
| `name` | Partial match. |
| `status` | `0`/`1`. |
| `sort_order` | Priority, exact match. |
| `starts_from_from` | Start-date range lower bound (ISO 8601). |
| `starts_from_to` | Start-date range upper bound (ISO 8601). |
| `ends_till_from` | End-date range lower bound (ISO 8601). |
| `ends_till_to` | End-date range upper bound (ISO 8601). |
| `sort` | `id`, `name`, `sort_order`. |
| `order` | `asc`/`desc`. |

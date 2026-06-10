---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Inventory Sources
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/inventory-sources?per_page=10" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "code": "default", "name": "Default Warehouse", "priority": 1, "status": 1, "country": "US", "city": "Springfield" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Inventory Sources

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/inventory-sources` | GET |

Filters: `code`, `name` (partial), `status` (0/1), `country`. Sort: `id`, `code`, `name`, `priority`, `status`.

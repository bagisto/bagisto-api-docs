---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Imports
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/data-transfer/imports?per_page=10" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 3, "code": "products", "action": "append", "state": "completed", "processed": 150, "summary": { "created": 100, "updated": 50, "deleted": 0 }, "createdAt": "2026-05-25 09:00:00" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Data Transfer Imports

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports` | GET |

Filters: `code` (entity type), `type` (synonym for code), `action`, `state`, `created_at_from`, `created_at_to`. Sort: `id` (default desc), `state`, `created_at`.

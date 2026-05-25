---
outline: false
apiType: rest
examples:
  - id: admin-marketing-events-list
    title: List Marketing Events
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/events" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "name": "Holiday Sale Kickoff", "description": "Email blast to all subscribers.", "date": "2026-12-20" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Marketing Events

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/events` | GET |

## Query Parameters

`page`, `per_page` (default 10, cap 50), `name` (partial), `date_from`, `date_to`, `sort` (`id`, `name`, `date`), `order`.

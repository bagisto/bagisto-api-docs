---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Locales
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/locales?per_page=10" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "code": "en", "name": "English", "direction": "ltr", "logoPath": null, "logoUrl": null }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Locales

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/locales` | GET |

Filters: `code` (partial), `name` (partial), `direction` (`ltr`/`rtl`). Sort: `id`, `code`, `name`.

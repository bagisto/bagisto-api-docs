---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Tax Categories
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/tax-categories" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "code": "us-tax", "name": "US Tax", "description": "Standard US sales tax", "taxRates": [1, 2] }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Tax Categories

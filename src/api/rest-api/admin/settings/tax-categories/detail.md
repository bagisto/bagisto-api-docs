---
outline: false
apiType: rest
examples:
  - id: rest
    title: Tax Category Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/tax-categories/1" -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "code": "us-tax", "name": "US Tax", "description": "Standard US sales tax", "taxRates": [1, 2] }
---

# Tax Category Detail

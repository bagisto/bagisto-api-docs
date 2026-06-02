---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Tax Rates
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/tax-rates" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "identifier": "us-il-7", "taxRate": 7.25, "country": "US", "state": "IL", "isZip": false, "zipCode": "62704" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Tax Rates

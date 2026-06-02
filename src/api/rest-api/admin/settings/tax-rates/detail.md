---
outline: false
apiType: rest
examples:
  - id: rest
    title: Tax Rate Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/tax-rates/1" -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "identifier": "us-il-7", "taxRate": 7.25, "country": "US", "state": "IL", "isZip": false, "zipCode": "62704" }
---

# Tax Rate Detail

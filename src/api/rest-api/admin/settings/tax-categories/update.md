---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Tax Category
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/tax-categories/1" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "code": "us-tax", "name": "US Sales Tax", "description": "Updated", "taxrates": [1, 2, 3] }'
    response: |
      { "id": 1, "code": "us-tax", "name": "US Sales Tax", "taxRates": [1, 2, 3] }
---

# Update Tax Category

Code uniqueness excludes self. Re-syncs the `tax_rates` pivot to the supplied list.

---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Tax Category
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/tax-categories" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "code": "us-tax", "name": "US Tax", "description": "Standard US sales tax", "taxrates": [1, 2] }'
    response: |
      { "id": 1, "code": "us-tax", "name": "US Tax", "taxRates": [1, 2] }
---

# Create Tax Category

Required: `code` (unique), `name`, `description`, `taxrates` (array of tax_rate ids). Permission: `settings.taxes.tax_categories.create`.

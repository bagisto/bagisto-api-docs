---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Tax Rate
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/tax-rates/1" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "tax_rate": 7.5 }'
    response: |
      { "id": 1, "taxRate": 7.5 }
---

# Update Tax Rate

Partial. `identifier` uniqueness excludes self. Permission: `settings.taxes.tax_rates.edit`.

---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete Tax Rate
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/settings/tax-rates/1" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>"
    response: |
      { "message": "Tax rate deleted." }
---

# Delete Tax Rate

Tax category pivot cascades automatically. Permission: `settings.taxes.tax_rates.delete`.

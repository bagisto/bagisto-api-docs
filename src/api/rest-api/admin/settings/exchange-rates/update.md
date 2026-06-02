---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Exchange Rate
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/exchange-rates/1" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "rate": 0.94 }'
    response: |
      { "id": 1, "targetCurrency": 2, "rate": 0.94 }
---

# Update Exchange Rate

Partial-update friendly. Composite-uniqueness excludes self. Permission: `settings.exchange_rates.edit`.

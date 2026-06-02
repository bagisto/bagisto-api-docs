---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Delete Exchange Rates
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/exchange-rates/mass-delete" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "indices": [1, 2] }'
    response: |
      { "deleted": [1, 2], "message": "Exchange rates deleted." }
---

# Mass Delete Exchange Rates

Non-existent IDs silently skipped. Empty `indices` → 422. Permission: `settings.exchange_rates.delete`.

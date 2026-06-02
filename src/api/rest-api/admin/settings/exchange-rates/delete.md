---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete Exchange Rate
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/settings/exchange-rates/1" -H "Authorization: Bearer <token>"
    response: |
      { "message": "Exchange rate deleted." }
---

# Delete Exchange Rate

Returns 200 + message. Permission: `settings.exchange_rates.delete`.

---
outline: false
apiType: rest
examples:
  - id: rest
    title: Exchange Rate Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/exchange-rates/1" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "targetCurrency": 2, "targetCurrencyCode": "EUR", "targetCurrencyName": "Euro", "rate": 0.92 }
---

# Exchange Rate Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/exchange-rates/{id}` | GET |

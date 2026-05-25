---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Exchange Rates
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/exchange-rates?per_page=10" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "targetCurrency": 2, "targetCurrencyCode": "EUR", "targetCurrencyName": "Euro", "rate": 0.92 }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Exchange Rates

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/exchange-rates` | GET |

Joins `currency_exchange_rates × currencies` so each row carries `targetCurrencyCode` + `targetCurrencyName` inline. Filters: `target_currency`, `rate_from`/`rate_to`. Sort: `id`, `target_currency`, `rate`.

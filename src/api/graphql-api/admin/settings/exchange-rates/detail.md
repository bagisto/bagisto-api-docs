---
outline: false
examples:
  - id: gql
    title: Exchange Rate Detail
    query: |
      query A($id: ID!) { adminSettingsExchangeRate(id: $id) { id _id targetCurrency targetCurrencyCode targetCurrencyName rate } }
    variables: |
      { "id": "/api/admin/settings/exchange-rates/1" }
    response: |
      { "data": { "adminSettingsExchangeRate": { "id": "/api/admin/settings/exchange-rates/1", "_id": 1, "targetCurrency": 2, "targetCurrencyCode": "EUR", "targetCurrencyName": "Euro", "rate": 0.92 } } }
---

# Exchange Rate Detail (GraphQL)

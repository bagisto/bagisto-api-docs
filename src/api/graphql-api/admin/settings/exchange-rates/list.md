---
outline: false
examples:
  - id: gql
    title: List Exchange Rates
    query: |
      query A($first: Int) { adminSettingsExchangeRates(first: $first) { edges { cursor node { id _id targetCurrency targetCurrencyCode targetCurrencyName rate } } pageInfo { hasNextPage endCursor } totalCount } }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminSettingsExchangeRates": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/settings/exchange-rates/1", "_id": 1, "targetCurrency": 2, "targetCurrencyCode": "EUR", "targetCurrencyName": "Euro", "rate": 0.92 } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Exchange Rates (GraphQL)

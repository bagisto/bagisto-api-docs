---
outline: false
examples:
  - id: gql
    title: List Currencies
    query: |
      query AdminCurrencies($first: Int) {
        adminSettingsCurrencies(first: $first) {
          edges { cursor node { id _id code name symbol } }
          pageInfo { hasNextPage endCursor } totalCount
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminSettingsCurrencies": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/settings/currencies/1", "_id": 1, "code": "USD", "name": "US Dollar", "symbol": "$" } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Currencies (GraphQL)

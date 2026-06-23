---
outline: false
examples:
  - id: list-exchange-rates
    title: List Exchange Rates
    description: Cursor-paginated list of every exchange rate, each with its target currency code/name and rate.
    query: |
      query AdminSettingsExchangeRates($first: Int) {
        adminSettingsExchangeRates(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              targetCurrency
              targetCurrencyCode
              targetCurrencyName
              rate
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "adminSettingsExchangeRates": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/exchange-rates/11",
                  "_id": 11,
                  "targetCurrency": 27,
                  "targetCurrencyCode": "PSH",
                  "targetCurrencyName": "E2E PSH",
                  "rate": 1.23,
                  "createdAt": "2026-05-26T13:01:36+05:30",
                  "updatedAt": "2026-05-26T13:01:36+05:30"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/admin/settings/exchange-rates/10",
                  "_id": 10,
                  "targetCurrency": 26,
                  "targetCurrencyCode": "EOQ",
                  "targetCurrencyName": "E2E EOQ",
                  "rate": 1.23,
                  "createdAt": "2026-05-26T13:00:09+05:30",
                  "updatedAt": "2026-05-26T13:00:09+05:30"
                }
              },
              {
                "cursor": "Mg==",
                "node": {
                  "id": "/api/admin/settings/exchange-rates/9",
                  "_id": 9,
                  "targetCurrency": 25,
                  "targetCurrencyCode": "PPX",
                  "targetCurrencyName": "E2E PPX",
                  "rate": 1.23,
                  "createdAt": "2026-05-26T13:00:07+05:30",
                  "updatedAt": "2026-05-26T13:00:07+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "Mg=="
            },
            "totalCount": 3
          }
        }
      }
---

# List Exchange Rates

Returns a cursor-paginated list of every exchange rate, ordered newest-first. Each node carries its target currency's resolved code and name alongside the numeric `rate`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsExchangeRates(first: Int)` | QueryCollection | List exchange rates with cursor pagination |

## Notes

- Use `first` with `after: <endCursor>` to page forward through results.
- `targetCurrencyCode` and `targetCurrencyName` are resolved from the linked currency for convenience — you don't need a separate currency lookup.

::: tip
All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
:::

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
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by target currency and rate range, sorted by rate ascending. Filter args, sorting and pagination all combine in one query. Supplying multiple filters narrows the result (logical AND).
    query: |
      query AdminSettingsExchangeRates(
        $first: Int
        $target_currency: Int
        $rate_from: Float
        $rate_to: Float
        $sort: String
        $order: String
      ) {
        adminSettingsExchangeRates(
          first: $first
          target_currency: $target_currency
          rate_from: $rate_from
          rate_to: $rate_to
          sort: $sort
          order: $order
        ) {
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
        "first": 10,
        "target_currency": 27,
        "rate_from": 1,
        "rate_to": 2,
        "sort": "rate",
        "order": "asc"
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
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MA=="
            },
            "totalCount": 1
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

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**.

| Argument | Type | Match | Example |
|----------|------|-------|---------|
| `target_currency` | `Int` | Exact — target currency id. | `27` |
| `rate_from` | `Float` | Minimum rate (inclusive). | `1` |
| `rate_to` | `Float` | Maximum rate (inclusive). | `2` |

`rate_from` and `rate_to` together bound the rate to a range.

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `target_currency`, `rate` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

## Notes

- Use `first` with `after: <endCursor>` to page forward through results.
- `targetCurrencyCode` and `targetCurrencyName` are resolved from the linked currency for convenience — you don't need a separate currency lookup.


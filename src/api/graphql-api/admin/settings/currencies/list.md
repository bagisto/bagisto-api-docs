---
outline: false
examples:
  - id: gql
    title: List Currencies
    query: |
      query AdminCurrencies($first: Int) {
        adminSettingsCurrencies(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              code
              name
              symbol
              decimal
              groupSeparator
              decimalSeparator
              currencyPosition
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
          "adminSettingsCurrencies": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/currencies/98",
                  "_id": 98,
                  "code": "QIG",
                  "name": "E2E QIG",
                  "symbol": null,
                  "decimal": 2,
                  "groupSeparator": ",",
                  "decimalSeparator": ".",
                  "currencyPosition": null,
                  "createdAt": "2026-06-17T12:20:14+05:30",
                  "updatedAt": "2026-06-17T12:20:14+05:30"
                }
              },
              {
                "cursor": "NQ==",
                "node": {
                  "id": "/api/admin/settings/currencies/1",
                  "_id": 1,
                  "code": "USD",
                  "name": "US Dollar",
                  "symbol": "$",
                  "decimal": 2,
                  "groupSeparator": ",",
                  "decimalSeparator": ".",
                  "currencyPosition": null,
                  "createdAt": null,
                  "updatedAt": null
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "NQ=="
            },
            "totalCount": 6
          }
        }
      }
---

# List Currencies

Returns the paginated list of currencies configured in the store — every currency the store can price and display amounts in. This is the data behind the admin **Settings → Currencies** grid.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsCurrencies(first: Int)` | QueryCollection (cursor) | List currencies |

## Notes

- Results are cursor-paginated — pass `first` for the page size and `after` (an `endCursor`) to page forward.
- `symbol` and `currencyPosition` may be `null` for currencies created without those fields set.
- The seeded default currency (`USD`) carries `null` timestamps because it predates timestamp tracking.

All currency operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

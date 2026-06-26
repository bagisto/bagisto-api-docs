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
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by code and sort by name ascending. Filter args, sorting and pagination all combine in one query. Supplying multiple filters narrows the result (logical AND).
    query: |
      query AdminCurrencies(
        $first: Int
        $code: String
        $name: String
        $symbol: String
        $sort: String
        $order: String
      ) {
        adminSettingsCurrencies(
          first: $first
          code: $code
          name: $name
          symbol: $symbol
          sort: $sort
          order: $order
        ) {
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
        "first": 10,
        "code": "USD",
        "sort": "name",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminSettingsCurrencies": {
            "edges": [
              {
                "cursor": "MA==",
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
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# List Currencies

Returns the paginated list of currencies configured in the store — every currency the store can price and display amounts in. This is the data behind the admin **Settings → Currencies** grid.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsCurrencies` | QueryCollection (cursor) | List currencies |

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**. They mirror the admin Currencies datagrid filters.

| Argument | Type | Match | Example |
|----------|------|-------|---------|
| `code` | `String` | Partial (contains). | `"USD"` |
| `name` | `String` | Partial (contains). | `"Dollar"` |
| `symbol` | `String` | Partial (contains). | `"$"` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `code`, `name` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

## Notes

- Results are cursor-paginated — pass `first` for the page size and `after` (an `endCursor`) to page forward.
- `symbol` and `currencyPosition` may be `null` for currencies created without those fields set.
- The seeded default currency (`USD`) carries `null` timestamps because it predates timestamp tracking.

All currency operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

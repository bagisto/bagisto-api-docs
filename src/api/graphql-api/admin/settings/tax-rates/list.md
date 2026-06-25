---
outline: false
examples:
  - id: gql
    title: List Tax Rates
    query: |
      query AdminSettingsTaxRates($first: Int) {
        adminSettingsTaxRates(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              identifier
              isZip
              zipCode
              zipFrom
              zipTo
              state
              country
              taxRate
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
        "first": 3
      }
    response: |
      {
        "data": {
          "adminSettingsTaxRates": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/tax-rates/57",
                  "_id": 57,
                  "identifier": "AUDIT-DEMO-848",
                  "isZip": false,
                  "zipCode": "90001",
                  "zipFrom": null,
                  "zipTo": null,
                  "state": "CA",
                  "country": "US",
                  "taxRate": 9.25,
                  "createdAt": "2026-06-09T17:18:23+05:30",
                  "updatedAt": "2026-06-09T17:18:24+05:30"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/admin/settings/tax-rates/10",
                  "_id": 10,
                  "identifier": "e2e_tr_mbmo7c",
                  "isZip": false,
                  "zipCode": "94105",
                  "zipFrom": null,
                  "zipTo": null,
                  "state": "CA",
                  "country": "US",
                  "taxRate": 8.5,
                  "createdAt": "2026-05-26T13:06:36+05:30",
                  "updatedAt": "2026-05-26T13:06:36+05:30"
                }
              },
              {
                "cursor": "Mg==",
                "node": {
                  "id": "/api/admin/settings/tax-rates/6",
                  "_id": 6,
                  "identifier": "e2e_tr_mblddj",
                  "isZip": false,
                  "zipCode": "94105",
                  "zipFrom": null,
                  "zipTo": null,
                  "state": "CA",
                  "country": "US",
                  "taxRate": 8.5,
                  "createdAt": "2026-05-26T13:05:24+05:30",
                  "updatedAt": "2026-05-26T13:05:24+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "Mg=="
            },
            "totalCount": 4
          }
        }
      }
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by identifier, country and state and sort by tax rate ascending. Filter args, sorting and pagination all combine in one query. Supplying multiple filters narrows the result (logical AND).
    query: |
      query AdminSettingsTaxRates(
        $first: Int
        $identifier: String
        $country: String
        $state: String
        $tax_rate_from: Float
        $tax_rate_to: Float
        $sort: String
        $order: String
      ) {
        adminSettingsTaxRates(
          first: $first
          identifier: $identifier
          country: $country
          state: $state
          tax_rate_from: $tax_rate_from
          tax_rate_to: $tax_rate_to
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              id
              _id
              identifier
              isZip
              zipCode
              zipFrom
              zipTo
              state
              country
              taxRate
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
        "identifier": "AUDIT",
        "country": "US",
        "state": "CA",
        "tax_rate_from": 5,
        "tax_rate_to": 10,
        "sort": "tax_rate",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminSettingsTaxRates": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/tax-rates/57",
                  "_id": 57,
                  "identifier": "AUDIT-DEMO-848",
                  "isZip": false,
                  "zipCode": "90001",
                  "zipFrom": null,
                  "zipTo": null,
                  "state": "CA",
                  "country": "US",
                  "taxRate": 9.25,
                  "createdAt": "2026-06-09T17:18:23+05:30",
                  "updatedAt": "2026-06-09T17:18:24+05:30"
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

# List Tax Rates

Returns the store-wide list of tax rates as a cursor-paginated connection. Each node is one tax rate — a rule that defines the tax percentage applied to a location, identified by country/state and either a single zip code or a zip-code range.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsTaxRates(first: Int, after: String)` | QueryCollection | List tax rates with cursor pagination |

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
| `identifier` | `String` | Partial (contains). | `"AUDIT"` |
| `country` | `String` | Exact — two-letter ISO code. | `"US"` |
| `state` | `String` | Exact. | `"CA"` |
| `tax_rate_from` | `Float` | Minimum tax rate (inclusive). | `5` |
| `tax_rate_to` | `Float` | Maximum tax rate (inclusive). | `10` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `identifier`, `tax_rate` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

## Fields

| Field | Meaning |
|-------|---------|
| `isZip` | `true` when the rate targets a **zip range** (`zipFrom`–`zipTo`); `false` when it targets a **single** `zipCode`. |
| `zipCode` | The single zip code the rate applies to. Populated only when `isZip` is `false`. |
| `zipFrom` / `zipTo` | The start and end of the zip range. Populated only when `isZip` is `true`. |
| `state` / `country` | The location the rate applies to. `country` is a two-letter ISO code. |
| `taxRate` | The tax percentage (0–100). |

For how tax rates fit together with tax categories, see the [menu overview](./).

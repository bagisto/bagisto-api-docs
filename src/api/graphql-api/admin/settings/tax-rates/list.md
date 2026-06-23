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
---

# List Tax Rates

Returns the store-wide list of tax rates as a cursor-paginated connection. Each node is one tax rate — a rule that defines the tax percentage applied to a location, identified by country/state and either a single zip code or a zip-code range.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsTaxRates(first: Int, after: String)` | QueryCollection | List tax rates with cursor pagination |

## Fields

| Field | Meaning |
|-------|---------|
| `isZip` | `true` when the rate targets a **zip range** (`zipFrom`–`zipTo`); `false` when it targets a **single** `zipCode`. |
| `zipCode` | The single zip code the rate applies to. Populated only when `isZip` is `false`. |
| `zipFrom` / `zipTo` | The start and end of the zip range. Populated only when `isZip` is `true`. |
| `state` / `country` | The location the rate applies to. `country` is a two-letter ISO code. |
| `taxRate` | The tax percentage (0–100). |

For how tax rates fit together with tax categories, see the [menu overview](./).

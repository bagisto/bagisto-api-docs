---
outline: false
examples:
  - id: gql
    title: Tax Rate Detail
    query: |
      query AdminSettingsTaxRate($id: ID!) {
        adminSettingsTaxRate(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/settings/tax-rates/57"
      }
    response: |
      {
        "data": {
          "adminSettingsTaxRate": {
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
      }
---

# Tax Rate Detail

Fetches a single tax rate by its IRI id. The payload carries every field of the rate, including the location (`state` / `country`) and the zip targeting (a single `zipCode`, or a `zipFrom`–`zipTo` range when `isZip` is `true`).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsTaxRate(id: ID!)` | Query | Get one tax rate by id |

## Notes

- `id` is the IRI form (`/api/admin/settings/tax-rates/{id}`). Discover valid ids with the [`adminSettingsTaxRates`](./list) query.
- When `isZip` is `false`, `zipCode` is set and `zipFrom` / `zipTo` are `null`. When `isZip` is `true`, `zipFrom` / `zipTo` are set and `zipCode` is `null`.

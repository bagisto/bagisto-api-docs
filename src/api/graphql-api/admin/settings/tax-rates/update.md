---
outline: false
examples:
  - id: gql
    title: Update Tax Rate
    query: |
      mutation UpdateAdminSettingsTaxRate($input: updateAdminSettingsTaxRateInput!) {
        updateAdminSettingsTaxRate(input: $input) {
          adminSettingsTaxRate {
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
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/tax-rates/69",
          "taxRate": 7.5
        }
      }
    response: |
      {
        "data": {
          "updateAdminSettingsTaxRate": {
            "adminSettingsTaxRate": {
              "id": "/api/admin/settings/tax-rates/69",
              "_id": 69,
              "identifier": "docs-gql-demo-9281",
              "isZip": false,
              "zipCode": "62704",
              "zipFrom": null,
              "zipTo": null,
              "state": "IL",
              "country": "US",
              "taxRate": 7.5,
              "createdAt": "2026-06-19T17:39:25+05:30",
              "updatedAt": "2026-06-19T17:39:33+05:30"
            }
          }
        }
      }
---

# Update Tax Rate

Updates an existing tax rate. The update is partial — send only the fields you want to change; omitted fields keep their current value. `identifier` stays unique, and a changed `taxRate` must remain between 0 and 100.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminSettingsTaxRate(input:)` | Mutation | Update a tax rate |

## Conditional zip rules

The same zip rules as create are re-checked after the change is merged onto the existing rate:

| `isZip` | Required zip fields | Targets |
|---------|---------------------|---------|
| `false` | `zipCode` | A single zip code |
| `true` | `zipFrom` **and** `zipTo` | A zip-code range |

If you flip `isZip` you must also supply the matching zip field(s) in the same request, otherwise the update is rejected with a validation error.

## Notes

- `id` is the IRI form (`/api/admin/settings/tax-rates/{id}`). Discover valid ids with the [`adminSettingsTaxRates`](./list) query.

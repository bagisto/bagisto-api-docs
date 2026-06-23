---
outline: false
examples:
  - id: gql
    title: Delete Tax Rate
    query: |
      mutation DeleteAdminSettingsTaxRate($input: deleteAdminSettingsTaxRateInput!) {
        deleteAdminSettingsTaxRate(input: $input) {
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
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/tax-rates/72"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsTaxRate": {
            "adminSettingsTaxRate": {
              "id": "/api/admin/settings/tax-rates/72",
              "_id": 72,
              "identifier": "throwaway_tr_9931",
              "isZip": false,
              "zipCode": "90210",
              "zipFrom": null,
              "zipTo": null,
              "state": "CA",
              "country": "US",
              "taxRate": 7.25
            }
          }
        }
      }
---

# Delete Tax Rate

Permanently removes a tax rate. On success the mutation returns a snapshot of the rate that was deleted, so you can confirm exactly which record was removed. Any tax categories that referenced the rate keep working; only the rate is removed.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsTaxRate(input:)` | Mutation | Delete a tax rate |

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a tax rate that exists in your store — use the [`adminSettingsTaxRates`](./list) query to discover valid ids.
:::

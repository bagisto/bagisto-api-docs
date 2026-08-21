---
outline: false
examples:
  - id: gql
    title: Delete Tax Rate
    query: |
      mutation DeleteAdminSettingsTaxRate($input: deleteAdminSettingsTaxRateInput!) {
        deleteAdminSettingsTaxRate(input: $input) {
          adminSettingsTaxRate {
            _id
            identifier
            isZip
            zipCode
            zipFrom
            zipTo
            state
            country
            taxRate
            message
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
              "_id": 72,
              "identifier": "throwaway_tr_9931",
              "isZip": false,
              "zipCode": "90210",
              "zipFrom": null,
              "zipTo": null,
              "state": "CA",
              "country": "US",
              "taxRate": 7.25,
              "message": "Tax rate deleted successfully."
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

The example uses an illustrative `id` value. Replace it with the id of a tax rate that exists in your store — use the [`adminSettingsTaxRates`](./list) query to discover valid ids.

## Notes

- The returned node is an in-memory snapshot of the just-deleted record — its scalar fields (`_id`, `identifier`, `isZip`, `zipCode`, `zipFrom`, `zipTo`, `state`, `country`, `taxRate`) still resolve so you can confirm what was removed.
- Select **`message`** for the success confirmation — it resolves to `"Tax rate deleted successfully."` on a successful delete. `message` is `null` on read / list / create / update; a failed delete returns a top-level `errors[]` entry instead.
- Do **not** select the node's IRI `id` field on this mutation — the IRI cannot be generated for a deleted record and the field resolves with an `errors[]` entry. Select `_id` instead, as shown.
- There is **no mass-delete** for tax rates (the admin UI ships single delete only).

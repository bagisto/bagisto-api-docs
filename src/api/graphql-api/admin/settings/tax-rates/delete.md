---
outline: false
examples:
  - id: gql
    title: Delete Tax Rate
    query: |
      mutation Delete($input: deleteAdminSettingsTaxRateInput!) {
        deleteAdminSettingsTaxRate(input: $input) { adminSettingsTaxRate { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/tax-rates/1" } }
    response: |
      { "data": { "deleteAdminSettingsTaxRate": { "adminSettingsTaxRate": null } } }
---

# Delete Tax Rate (GraphQL)

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a tax rate that exists in your store — use the [`adminSettingsTaxRates`](./list.md) query to discover valid ids.
:::

---
outline: false
examples:
  - id: gql
    title: Delete Currency
    query: |
      mutation Delete($input: deleteAdminSettingsCurrencyInput!) {
        deleteAdminSettingsCurrency(input: $input) { adminSettingsCurrency { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/currencies/2" } }
    response: |
      { "data": { "deleteAdminSettingsCurrency": { "adminSettingsCurrency": null } } }
---

# Delete Currency (GraphQL)

::: warning Guards
Refuses if last currency or any channel uses it as base.
:::

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a currency that exists in your store — use the [`adminSettingsCurrencies`](./list.md) query to discover valid ids.
:::

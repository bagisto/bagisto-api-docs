---
outline: false
examples:
  - id: gql
    title: Update Currency
    query: |
      mutation Update($input: updateAdminSettingsCurrencyInput!) {
        updateAdminSettingsCurrency(input: $input) { adminSettingsCurrency { id _id name } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/currencies/2", "name": "Euro (EU)" } }
    response: |
      { "data": { "updateAdminSettingsCurrency": { "adminSettingsCurrency": { "id": "/api/admin/settings/currencies/2", "_id": 2, "name": "Euro (EU)" } } } }
---

# Update Currency (GraphQL)

`code` is immutable. Permission: `settings.currencies.edit`.

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a currency that exists in your store — use the [`adminSettingsCurrencies`](./list.md) query to discover valid ids.
:::

---
outline: false
examples:
  - id: gql
    title: Delete Exchange Rate
    query: |
      mutation Delete($input: deleteAdminSettingsExchangeRateInput!) {
        deleteAdminSettingsExchangeRate(input: $input) { adminSettingsExchangeRate { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/exchange-rates/1" } }
    response: |
      { "data": { "deleteAdminSettingsExchangeRate": { "adminSettingsExchangeRate": null } } }
---

# Delete Exchange Rate (GraphQL)

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a exchange rate that exists in your store — use the [`adminSettingsExchangeRates`](./list.md) query to discover valid ids.
:::

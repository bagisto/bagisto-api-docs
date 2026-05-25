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

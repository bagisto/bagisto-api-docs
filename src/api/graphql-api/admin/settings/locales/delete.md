---
outline: false
examples:
  - id: gql
    title: Delete Locale
    query: |
      mutation Delete($input: deleteAdminSettingsLocaleInput!) {
        deleteAdminSettingsLocale(input: $input) { adminSettingsLocale { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/locales/2" } }
    response: |
      { "data": { "deleteAdminSettingsLocale": { "adminSettingsLocale": null } } }
---

# Delete Locale (GraphQL)

::: warning Guards
Refuses if last locale or used as a channel default.
:::

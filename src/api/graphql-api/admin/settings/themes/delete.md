---
outline: false
examples:
  - id: gql
    title: Delete Theme Customization
    query: |
      mutation Delete($input: deleteAdminSettingsThemeInput!) {
        deleteAdminSettingsTheme(input: $input) { adminSettingsTheme { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/themes/1" } }
    response: |
      { "data": { "deleteAdminSettingsTheme": { "adminSettingsTheme": null } } }
---

# Delete Theme Customization (GraphQL)

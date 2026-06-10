---
outline: false
examples:
  - id: gql
    title: Mass Delete Theme Customizations
    query: |
      mutation MassDelete($input: createAdminSettingsThemeMassDeleteInput!) {
        createAdminSettingsThemeMassDelete(input: $input) { adminSettingsThemeMassDelete { deleted message } }
      }
    variables: |
      { "input": { "indices": [1, 2] } }
    response: |
      { "data": { "createAdminSettingsThemeMassDelete": { "adminSettingsThemeMassDelete": { "deleted": [1, 2], "message": "Themes deleted." } } } }
---

# Mass Delete Theme Customizations (GraphQL)

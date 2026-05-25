---
outline: false
examples:
  - id: gql
    title: Update Theme Customization
    query: |
      mutation Update($input: updateAdminSettingsThemeInput!) {
        updateAdminSettingsTheme(input: $input) { adminSettingsTheme { id _id name } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/themes/1", "locale": "en", "options": { "title": "Welcome" } } }
    response: |
      { "data": { "updateAdminSettingsTheme": { "adminSettingsTheme": { "id": "/api/admin/settings/themes/1", "_id": 1, "name": "Homepage Banner" } } } }
---

# Update Theme Customization (GraphQL)

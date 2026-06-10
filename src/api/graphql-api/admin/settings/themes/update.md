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

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a theme that exists in your store — use the [`adminSettingsThemes`](./list.md) query to discover valid ids.
:::

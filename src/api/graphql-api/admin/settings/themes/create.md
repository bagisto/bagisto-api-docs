---
outline: false
examples:
  - id: gql
    title: Create Theme Customization
    query: |
      mutation Create($input: createAdminSettingsThemeInput!) {
        createAdminSettingsTheme(input: $input) { adminSettingsTheme { id _id name } }
      }
    variables: |
      { "input": { "name": "Homepage Banner", "type": "image_carousel", "sort_order": 1, "channel_id": 1, "theme_code": "default" } }
    response: |
      { "data": { "createAdminSettingsTheme": { "adminSettingsTheme": { "id": "/api/admin/settings/themes/1", "_id": 1, "name": "Homepage Banner" } } } }
---

# Create Theme Customization (GraphQL)

::: warning Image upload deferred
Multipart binary upload not yet supported.
:::

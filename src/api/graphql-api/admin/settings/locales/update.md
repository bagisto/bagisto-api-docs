---
outline: false
examples:
  - id: gql
    title: Update Locale
    query: |
      mutation Update($input: updateAdminSettingsLocaleInput!) {
        updateAdminSettingsLocale(input: $input) { adminSettingsLocale { id _id name } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/locales/2", "name": "Français" } }
    response: |
      { "data": { "updateAdminSettingsLocale": { "adminSettingsLocale": { "id": "/api/admin/settings/locales/2", "_id": 2, "name": "Français" } } } }
---

# Update Locale (GraphQL)

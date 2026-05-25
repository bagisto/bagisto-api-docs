---
outline: false
examples:
  - id: gql
    title: Create Locale
    query: |
      mutation Create($input: createAdminSettingsLocaleInput!) {
        createAdminSettingsLocale(input: $input) { adminSettingsLocale { id _id code name } }
      }
    variables: |
      { "input": { "code": "fr", "name": "French", "direction": "ltr" } }
    response: |
      { "data": { "createAdminSettingsLocale": { "adminSettingsLocale": { "id": "/api/admin/settings/locales/2", "_id": 2, "code": "fr", "name": "French" } } } }
---

# Create Locale (GraphQL)

Image upload deferred. Permission: `settings.locales.create`.

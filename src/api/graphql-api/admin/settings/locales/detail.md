---
outline: false
examples:
  - id: gql
    title: Locale Detail
    query: |
      query AdminLocale($id: ID!) { adminSettingsLocale(id: $id) { id _id code name direction logoUrl } }
    variables: |
      { "id": "/api/admin/settings/locales/1" }
    response: |
      { "data": { "adminSettingsLocale": { "id": "/api/admin/settings/locales/1", "_id": 1, "code": "en", "name": "English", "direction": "ltr", "logoUrl": null } } }
---

# Locale Detail (GraphQL)

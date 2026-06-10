---
outline: false
examples:
  - id: gql
    title: Channel Detail
    query: |
      query A($id: ID!) { adminSettingsChannel(id: $id) { id _id code name hostname rootCategoryId defaultLocaleId baseCurrencyId } }
    variables: |
      { "id": "/api/admin/settings/channels/1" }
    response: |
      { "data": { "adminSettingsChannel": { "id": "/api/admin/settings/channels/1", "_id": 1, "code": "default", "name": "Default", "hostname": "store.example.com", "rootCategoryId": 1, "defaultLocaleId": 1, "baseCurrencyId": 1 } } }
---

# Channel Detail (GraphQL)

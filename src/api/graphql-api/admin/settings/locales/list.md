---
outline: false
examples:
  - id: gql
    title: List Locales
    query: |
      query AdminLocales($first: Int) {
        adminSettingsLocales(first: $first) { edges { cursor node { id _id code name direction logoUrl } } pageInfo { hasNextPage endCursor } totalCount }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminSettingsLocales": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/settings/locales/1", "_id": 1, "code": "en", "name": "English", "direction": "ltr", "logoUrl": null } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Locales (GraphQL)

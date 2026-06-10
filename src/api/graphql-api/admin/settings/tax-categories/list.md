---
outline: false
examples:
  - id: gql
    title: List Tax Categories
    query: |
      query A($first: Int) { adminSettingsTaxCategories(first: $first) { edges { cursor node { id _id code name description } } pageInfo { hasNextPage endCursor } totalCount } }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminSettingsTaxCategories": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/settings/tax-categories/1", "_id": 1, "code": "us-tax", "name": "US Tax", "description": "Standard" } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Tax Categories (GraphQL)

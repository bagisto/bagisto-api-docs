---
outline: false
examples:
  - id: gql
    title: List Imports
    query: |
      query A($first: Int) { adminSettingsDataTransferImports(first: $first) { edges { cursor node { id _id code action state processed createdAt } } pageInfo { hasNextPage endCursor } totalCount } }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminSettingsDataTransferImports": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/settings/data-transfer/imports/3", "_id": 3, "code": "products", "action": "append", "state": "completed", "processed": 150, "createdAt": "2026-05-25 09:00:00" } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Imports (GraphQL)

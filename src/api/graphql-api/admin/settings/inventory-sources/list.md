---
outline: false
examples:
  - id: gql
    title: List Inventory Sources
    query: |
      query A($first: Int) { adminSettingsInventorySources(first: $first) { edges { cursor node { id _id code name priority status } } pageInfo { hasNextPage endCursor } totalCount } }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminSettingsInventorySources": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/settings/inventory-sources/1", "_id": 1, "code": "default", "name": "Default Warehouse", "priority": 1, "status": 1 } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Inventory Sources (GraphQL)

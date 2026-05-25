---
outline: false
examples:
  - id: gql
    title: List Roles
    query: |
      query A($first: Int) { adminSettingsRoles(first: $first) { edges { cursor node { id _id name description permissionType } } pageInfo { hasNextPage endCursor } totalCount } }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminSettingsRoles": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/settings/roles/1", "_id": 1, "name": "Administrator", "description": "Full access", "permissionType": "all" } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Roles (GraphQL)

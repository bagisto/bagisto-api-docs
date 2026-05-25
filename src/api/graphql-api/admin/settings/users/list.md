---
outline: false
examples:
  - id: gql
    title: List Admin Users
    query: |
      query A($first: Int) { adminSettingsUsers(first: $first) { edges { cursor node { id _id name email roleId status } } pageInfo { hasNextPage endCursor } totalCount } }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminSettingsUsers": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/settings/users/1", "_id": 1, "name": "Super Admin", "email": "admin@example.com", "roleId": 1, "status": 1 } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Admin Users (GraphQL)

---
outline: false
examples:
  - id: gql
    title: Role Detail
    query: |
      query A($id: ID!) { adminSettingsRole(id: $id) { id _id name description permissionType permissions } }
    variables: |
      { "id": "/api/admin/settings/roles/1" }
    response: |
      { "data": { "adminSettingsRole": { "id": "/api/admin/settings/roles/1", "_id": 1, "name": "Administrator", "description": "Full access", "permissionType": "all", "permissions": null } } }
---

# Role Detail (GraphQL)

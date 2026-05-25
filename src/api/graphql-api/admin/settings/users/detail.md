---
outline: false
examples:
  - id: gql
    title: Admin User Detail
    query: |
      query A($id: ID!) { adminSettingsUser(id: $id) { id _id name email roleId status } }
    variables: |
      { "id": "/api/admin/settings/users/1" }
    response: |
      { "data": { "adminSettingsUser": { "id": "/api/admin/settings/users/1", "_id": 1, "name": "Super Admin", "email": "admin@example.com", "roleId": 1, "status": 1 } } }
---

# Admin User Detail (GraphQL)

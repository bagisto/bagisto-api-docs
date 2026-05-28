---
outline: false
examples:
  - id: gql
    title: Create Admin User
    query: |
      mutation Create($input: createAdminSettingsUserInput!) {
        createAdminSettingsUser(input: $input) { adminSettingsUser { id _id name email roleId } }
      }
    variables: |
      { "input": { "name": "Ops User", "email": "ops@example.com", "password": "secret123", "roleId": 2, "status": 1 } }
    response: |
      { "data": { "createAdminSettingsUser": { "adminSettingsUser": { "id": "/api/admin/settings/users/4", "_id": 4, "name": "Ops User", "email": "ops@example.com", "roleId": 2 } } } }
---

# Create Admin User (GraphQL)

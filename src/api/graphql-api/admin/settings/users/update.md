---
outline: false
examples:
  - id: gql
    title: Update Admin User
    query: |
      mutation Update($input: updateAdminSettingsUserInput!) {
        updateAdminSettingsUser(input: $input) { adminSettingsUser { id _id name } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/users/4", "name": "Ops User (Updated)" } }
    response: |
      { "data": { "updateAdminSettingsUser": { "adminSettingsUser": { "id": "/api/admin/settings/users/4", "_id": 4, "name": "Ops User (Updated)" } } } }
---

# Update Admin User (GraphQL)

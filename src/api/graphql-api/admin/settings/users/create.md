---
outline: false
examples:
  - id: gql
    title: Create Admin User
    query: |
      mutation CreateAdminSettingsUser($input: createAdminSettingsUserInput!) {
        createAdminSettingsUser(input: $input) {
          adminSettingsUser {
            id
            _id
            name
            email
            roleId
            roleName
            status
            image
            imageUrl
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "name": "Docs Throwaway User",
          "email": "docs-throwaway@example.com",
          "password": "secret123",
          "roleId": 2,
          "status": 1
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsUser": {
            "adminSettingsUser": {
              "id": "/api/admin/settings/users/3165",
              "_id": 3165,
              "name": "Docs Throwaway User",
              "email": "docs-throwaway@example.com",
              "roleId": 2,
              "roleName": "Sales",
              "status": 1,
              "image": null,
              "imageUrl": null,
              "createdAt": "2026-06-19T17:38:54+05:30",
              "updatedAt": "2026-06-19T17:38:54+05:30"
            }
          }
        }
      }
---

# Create Admin User

Creates a new admin user. `name`, `email`, `password`, and `roleId` are required; `status` defaults to active (`1`). The `password` is required at create time and is stored hashed — it is never returned.

`roleId` must reference an existing role. Use the [`adminSettingsRoles`](/api/graphql-api/admin/settings/roles/list) query to discover valid role ids.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsUser(input:)` | Mutation | Create an admin user |

For field meanings and the delete guards, see the [Users overview](./).

Requires the `settings.users.users.create` permission and an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

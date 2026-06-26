---
outline: false
examples:
  - id: gql
    title: Update Admin User
    query: |
      mutation UpdateAdminSettingsUser($input: updateAdminSettingsUserInput!) {
        updateAdminSettingsUser(input: $input) {
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
          "id": "/api/admin/settings/users/3165",
          "name": "Docs Throwaway User (Updated)"
        }
      }
    response: |
      {
        "data": {
          "updateAdminSettingsUser": {
            "adminSettingsUser": {
              "id": "/api/admin/settings/users/3165",
              "_id": 3165,
              "name": "Docs Throwaway User (Updated)",
              "email": "docs-throwaway@example.com",
              "roleId": 2,
              "roleName": "Sales",
              "status": 1,
              "image": null,
              "imageUrl": null,
              "createdAt": "2026-06-19T17:38:54+05:30",
              "updatedAt": "2026-06-19T17:39:03+05:30"
            }
          }
        }
      }
---

# Update Admin User

Partially updates an admin user — send only the fields you want to change. `email` must stay unique. `password` is **optional** on update: include it to set a new hashed password, or omit it to keep the existing one. The `password` is never returned.

::: tip Prerequisites
The example uses an illustrative `id`. Replace it with the id of a user that exists in your store — use the [`adminSettingsUsers`](./list) query to discover valid ids.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminSettingsUser(input:)` | Mutation | Update an admin user |

::: tip Overview
For field meanings and the delete guards, see the [Users overview](./).
:::

Requires the `settings.users.users.edit` permission and an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

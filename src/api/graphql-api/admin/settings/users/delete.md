---
outline: false
examples:
  - id: gql
    title: Delete Admin User
    query: |
      mutation DeleteAdminSettingsUser($input: deleteAdminSettingsUserInput!) {
        deleteAdminSettingsUser(input: $input) {
          adminSettingsUser {
            id
            _id
            name
            email
            roleId
            roleName
            status
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/users/3167"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsUser": {
            "adminSettingsUser": {
              "id": "/api/admin/settings/users/3167",
              "_id": 3167,
              "name": "Throwaway Delete Test",
              "email": "throwaway-deltest-9921@example.com",
              "roleId": 15,
              "roleName": "DebugAdmin",
              "status": 1
            }
          }
        }
      }
---

# Delete Admin User

Deletes another admin user by id. The mutation returns a snapshot of the deleted record, so you can read back its `id`, `name`, `email`, `roleId`, `roleName`, and `status` in the same response. The `password` and `api_token` values are never returned.

::: warning Delete guards
- **Cannot delete yourself** through this endpoint — the id must belong to a different admin. To remove your own account use [Delete My Account](./delete-self).
- **Cannot delete the last remaining admin.**

A blocked delete returns the reason in the `errors` array and leaves the account intact.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsUser(input:)` | Mutation | Delete an admin user |

::: tip Overview
For field meanings and create/update rules, see the [Users overview](./).
:::

Requires the `settings.users.users.delete` permission and an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

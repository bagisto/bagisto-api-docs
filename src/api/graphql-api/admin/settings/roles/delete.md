---
outline: false
examples:
  - id: gql
    title: Delete Role
    query: |
      mutation DeleteRole($input: deleteAdminSettingsRoleInput!) {
        deleteAdminSettingsRole(input: $input) {
          adminSettingsRole {
            id
            _id
            name
            description
            permissionType
            permissions
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/roles/146"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsRole": {
            "adminSettingsRole": {
              "id": "/api/admin/settings/roles/146",
              "_id": 146,
              "name": "Seasonal Staff",
              "description": "Temporary holiday team",
              "permissionType": "all",
              "permissions": null
            }
          }
        }
      }
---

# Delete Role (GraphQL)

Deletes a role and returns a snapshot of the record that was removed, so you can confirm exactly what was deleted. The role no longer appears in the listing afterward.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsRole` | Mutation | Delete a role |

## Quirks

- `input.id` is the IRI form (`/api/admin/settings/roles/{id}`).
- The mutation returns a snapshot of the just-deleted role — `id`, `_id`, `name`, `description`, `permissionType`, and `permissions` all resolve (a role with `permissionType: all` has `permissions: null`). The record itself is gone from the store.

## Guards

Deletion is refused (returns an `errors[]` message) when:

- The role is **assigned to one or more admins** — reassign those admins to a different role first.
- It is the **last remaining role** — at least one role must always exist.

::: tip
All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
:::

---
outline: false
examples:
  - id: gql
    title: Create Role
    query: |
      mutation CreateRole($input: createAdminSettingsRoleInput!) {
        createAdminSettingsRole(input: $input) {
          adminSettingsRole {
            id
            _id
            name
            description
            permissionType
            permissions
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "name": "Docs Throwaway Role",
          "description": "Temporary role created for documentation examples",
          "permissionType": "custom",
          "permissions": [
            "catalog",
            "catalog.products",
            "catalog.products.view"
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsRole": {
            "adminSettingsRole": {
              "id": "/api/admin/settings/roles/142",
              "_id": 142,
              "name": "Docs Throwaway Role",
              "description": "Temporary role created for documentation examples",
              "permissionType": "custom",
              "permissions": [
                "catalog",
                "catalog.products",
                "catalog.products.view"
              ],
              "createdAt": "2026-06-19T17:39:01+05:30",
              "updatedAt": "2026-06-19T17:39:01+05:30"
            }
          }
        }
      }
---

# Create Role (GraphQL)

Creates a new admin role with a name, description, and permission set.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsRole` | Mutation | Create a role |

## Quirks

- `permissionType` is either `custom` or `all`.
- When `permissionType` is `custom`, the `permissions` **string array** is required — supply the permission keys this role should grant.
- When `permissionType` is `all`, omit `permissions` (the role is granted full access; any list is ignored and stored as `[]`).


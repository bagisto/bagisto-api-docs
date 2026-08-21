---
outline: false
examples:
  - id: gql
    title: Update Role
    query: |
      mutation UpdateRole($input: updateAdminSettingsRoleInput!) {
        updateAdminSettingsRole(input: $input) {
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
          "id": "/api/admin/settings/roles/142",
          "name": "Docs Throwaway Role (Updated)",
          "description": "Now switched to full access",
          "permissionType": "all"
        }
      }
    response: |
      {
        "data": {
          "updateAdminSettingsRole": {
            "adminSettingsRole": {
              "id": "/api/admin/settings/roles/142",
              "_id": 142,
              "name": "Docs Throwaway Role (Updated)",
              "description": "Now switched to full access",
              "permissionType": "all",
              "permissions": [],
              "createdAt": "2026-06-19T17:39:01+05:30",
              "updatedAt": "2026-06-19T17:39:09+05:30"
            }
          }
        }
      }
---

# Update Role (GraphQL)

Updates an existing role's name, description, permission type, and permission set.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminSettingsRole` | Mutation | Update a role |

## Quirks

- `input.id` is the IRI form (`/api/admin/settings/roles/{id}`).
- **Switching `permissionType` to `all` clears `permissions` to `[]`** — the response above shows this: the role was `custom` with permission keys before the update and comes back with an empty `permissions` array.
- When `permissionType` is `custom`, supply the full `permissions` **string array** you want the role to have.


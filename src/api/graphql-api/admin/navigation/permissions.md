---
outline: false
examples:
  - id: admin-permissions-gql-all
    title: Full Access Token
    query: |
      query {
        getAdminPermissions {
          permissionType
          permissions
        }
      }
    response: |
      {
        "data": {
          "getAdminPermissions": {
            "permissionType": "all",
            "permissions": ["*"]
          }
        }
      }
  - id: admin-permissions-gql-custom
    title: Custom Access Token
    query: |
      query {
        getAdminPermissions {
          permissionType
          permissions
        }
      }
    response: |
      {
        "data": {
          "getAdminPermissions": {
            "permissionType": "custom",
            "permissions": ["catalog", "catalog.products", "sales.orders"]
          }
        }
      }
---

# Get Admin Permissions (GraphQL)

Returns the authenticated token's effective permissions so you can gate UI up front — show or hide buttons, menus and actions without triggering trial-and-error errors.

## Output Fields

| Field | Type | Description |
|-------|------|-------------|
| `permissionType` | String | One of `all`, `custom`, or `same_as_web`. |
| `permissions` | JSON | The granted ACL keys, or `["*"]` for full access. |

`permissionType` semantics:

- `all` — full access. `permissions` is `["*"]`.
- `custom` — `permissions` lists the explicitly granted ACL keys.
- `same_as_web` — the token follows the admin's web role; `permissions` lists the keys that role currently grants.

In every case the effective `permissions` are capped by the admin's role — a token can never do more than its owner admin can currently do.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

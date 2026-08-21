---
outline: false
examples:
  - id: admin-permissions-gql-all
    title: Full Access Token
    description: A token whose permission mode is All returns the wildcard rather than an expanded key list.
    query: |
      query {
        getAdminPermissions {
          id
          _id
          permissionType
          permissions
        }
      }
    response: |
      {
        "data": {
          "getAdminPermissions": {
            "id": "/api/admin/admin_permissions/permissions",
            "_id": "permissions",
            "permissionType": "all",
            "permissions": ["*"]
          }
        }
      }
  - id: admin-permissions-gql-custom
    title: Custom Access Token
    description: A restricted token returns the explicit ACL keys it was granted, already capped by the owning admin's role.
    query: |
      query {
        getAdminPermissions {
          id
          _id
          permissionType
          permissions
        }
      }
    response: |
      {
        "data": {
          "getAdminPermissions": {
            "id": "/api/admin/admin_permissions/permissions",
            "_id": "permissions",
            "permissionType": "custom",
            "permissions": ["catalog", "catalog.products", "sales.orders"]
          }
        }
      }
---

# Get Admin Permissions

Returns the authenticated token's effective permissions so you can gate UI up front — show or hide buttons, menus and actions without triggering trial-and-error errors.

## Output Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID! | Resource identifier in IRI form, `/api/admin/admin_permissions/permissions`. |
| `_id` | String | The bare identifier, always the literal `permissions`. |
| `permissionType` | String | One of `all`, `custom`, or `same_as_web`. |
| `permissions` | Iterable | The granted ACL keys, or `["*"]` for full access. |

`permissions` is a JSON scalar — select it as a **bare field**, with no sub-selection.

## Permission Modes

- `all` — full access. `permissions` is the single-element `["*"]`, never an expanded list of keys.
- `custom` — `permissions` lists the explicitly granted ACL keys, frozen onto the token when it was generated.
- `same_as_web` — the token mirrors the owning admin's current role, so the returned keys change whenever that role changes.

In every case the effective `permissions` are capped by the owning admin's role — a token can never do more than its owner currently can.

## Using the Result

Match a key against the `permission` field of a [menu](/api/graphql-api/admin/navigation/menu) node, or against the ACL key named on an operation's page, to decide whether to render its UI.

Two things to handle:

- **`["*"]` is a wildcard, not a key.** A literal `permissions.includes('sales.orders')` returns false for a full-access token. Branch on `permissionType === 'all'` first.
- **Keys are exact, not prefixes.** Holding `catalog` does not imply `catalog.products` — the example above lists both because both were granted. Check the exact key an operation requires.

Gating on this query is advisory. The API re-checks on every call, so a client that skips the check still gets a permission error rather than unauthorized access.

## Errors

A request without a valid token is rejected by the transport with HTTP `401` before the GraphQL layer runs. Any valid token can read its own permissions — there is no permission gate on this query.

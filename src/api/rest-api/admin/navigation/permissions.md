---
outline: false
apiType: rest
examples:
  - id: admin-permissions-all
    title: Full Access Token
    description: A token whose role grants full access returns the `all` permission type and a single wildcard.
    query: |
      curl -X GET "https://your-domain.com/api/admin/permissions" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "id": "permissions",
          "permissionType": "all",
          "permissions": ["*"]
        }
      ]
  - id: admin-permissions-custom
    title: Custom Access Token
    description: A token with a restricted role returns the `custom` permission type and the explicit list of granted ACL keys.
    query: |
      curl -X GET "https://your-domain.com/api/admin/permissions" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "id": "permissions",
          "permissionType": "custom",
          "permissions": ["catalog", "catalog.products", "sales.orders"]
        }
      ]
---

# Get Admin Permissions

| Endpoint | Method |
|----------|--------|
| `/api/admin/permissions` | GET |

Returns the authenticated token's effective permissions so you can gate UI up front — show or hide buttons, menus and actions without triggering trial-and-error `403` responses.

The response is a one-element array describing the token's access.

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Identifier of the permissions payload (`permissions`). |
| `permissionType` | string | One of `all`, `custom`, or `same_as_web`. |
| `permissions` | array | The granted ACL keys, or `["*"]` for full access. |

`permissionType` semantics:

- `all` — full access. `permissions` is `["*"]`.
- `custom` — `permissions` lists the explicitly granted ACL keys.
- `same_as_web` — the token follows the admin's web role; `permissions` lists the keys that role currently grants.

In every case the effective `permissions` are capped by the admin's role — a token can never do more than its owner admin can currently do.

## Errors

A request without a valid token returns `401 Unauthorized`.

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).

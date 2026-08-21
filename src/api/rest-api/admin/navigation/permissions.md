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
| `id` | String | Identifier of the payload, always the literal `permissions`. |
| `permissionType` | String | One of `all`, `custom`, or `same_as_web`. |
| `permissions` | Array | The granted ACL keys, or `["*"]` for full access. |

## Permission Modes

- `all` — full access. `permissions` is the single-element `["*"]`, never an expanded list of keys.
- `custom` — `permissions` lists the explicitly granted ACL keys, frozen onto the token when it was generated.
- `same_as_web` — the token mirrors the owning admin's current role, so the returned keys change whenever that role changes.

In every case the effective `permissions` are capped by the owning admin's role — a token can never do more than its owner currently can.

## Using the Result

Match a key against the `permission` field of a [menu](/api/rest-api/admin/navigation/menu) node, or against the ACL key named on an endpoint's page, to decide whether to render its UI.

Two things to handle:

- **`["*"]` is a wildcard, not a key.** A literal `permissions.includes('sales.orders')` returns false for a full-access token. Branch on `permissionType === 'all'` first.
- **Keys are exact, not prefixes.** Holding `catalog` does not imply `catalog.products` — the example above lists both because both were granted. Check the exact key an endpoint requires.

Gating on this endpoint is advisory. The API re-checks on every call, so a client that skips the check still gets a `403` rather than unauthorized access.

## Errors

A request without a valid token returns HTTP `401` with `{"message": "Unauthenticated.", "error": "unauthenticated"}`. Any valid token can call this endpoint — there is no permission gate on it.

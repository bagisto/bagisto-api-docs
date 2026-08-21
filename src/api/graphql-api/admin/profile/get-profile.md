---
outline: false
examples:
  - id: admin-get-profile
    title: Get Admin Profile
    description: Read the authenticated admin's profile. The token identifies the admin, so the query takes no arguments. This example selects every field the query returns.
    query: |
      query readAdminProfile {
        readAdminProfile {
          id
          _id
          name
          email
          image
          status
          roleId
          roleName
          success
          message
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "readAdminProfile": {
            "id": "/api/admin/admin_profiles/1",
            "_id": "1",
            "name": "Example Admin",
            "email": "admin@example.com",
            "image": null,
            "status": "1",
            "roleId": 1,
            "roleName": "Administrator",
            "success": true,
            "message": null
          }
        }
      }
---

# Get Admin Profile

Returns the profile of the admin who owns the Bearer token on the request. Use it to confirm a token is live and to learn who it belongs to — the account name and email to show in a header, and the role that governs everything else the token can do.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `readAdminProfile` | Query | Return the authenticated admin's profile |

The query takes **no arguments**. The token alone selects the record, so there is no way to read another admin's profile here — use the [Settings → Users](/api/graphql-api/admin/settings/users/list) queries for that.

## Output Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID! | Resource identifier in IRI form, `/api/admin/admin_profiles/<id>`. |
| `_id` | String | The numeric admin id, as a string. |
| `name` | String | Admin's display name. |
| `email` | String | Admin's login email. |
| `image` | String | Storage path of the avatar, or `null` when none is set. |
| `status` | String | `"1"` when the account is active, `"0"` when disabled. |
| `roleId` | Int | Id of the assigned role, or `null` when the admin has no role. |
| `roleName` | String | Name of the assigned role, or `null` when the admin has no role. |
| `success` | Boolean | Always `true`. Present so the payload matches the REST response shape. |
| `message` | String | Always `null`. Present so the payload matches the REST response shape. |

Three of these behave differently from how they look:

- **`status` is a string, not a boolean.** Compare against `"1"` / `"0"`, or cast before testing — a bare truthiness check treats `"0"` as true in most languages.
- **`_id` is a string, not an integer**, unlike `_id` on most other admin types. Cast it before using it as a numeric key.
- **`success` and `message` are constants**, not a result signal. This query either resolves or fails at the transport; never branch on them.

## Role Fields

`roleId` and `roleName` name the role, but they do not tell you what the token may do — a token can be narrowed below its owner's role. To gate UI, read [Get Admin Permissions](/api/graphql-api/admin/navigation/permissions) instead, which returns the effective permission set after that narrowing.

## Errors

An unauthenticated request never reaches the GraphQL layer. A missing, malformed, expired, or revoked token is rejected by the transport with HTTP `401` and a plain JSON body:

```json
{
  "message": "Unauthenticated.",
  "error": "unauthenticated"
}
```

No permission check applies — any valid token can read its own profile, whatever its permission mode.

## Read-Only

There is no counterpart mutation. The admin API has no login, logout, forgot-password, or profile-update operation — accounts are managed in the admin panel, and tokens are issued from the Integration menu. To edit an admin record programmatically, use the [Settings → Users](/api/graphql-api/admin/settings/users/update) mutations, which act on any admin by id and are permission-gated.

---
outline: false
apiType: rest
examples:
  - id: admin-get-profile
    title: Get Admin Profile
    description: Return the authenticated admin's profile. The token identifies the admin, so the endpoint takes no parameters.
    query: |
      curl -X GET "https://your-domain.com/api/admin/get" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    variables: |
      {}
    response: |
      [
        {
          "id": "1",
          "name": "Example Admin",
          "email": "admin@example.com",
          "image": null,
          "status": "1",
          "roleId": 1,
          "roleName": "Administrator",
          "success": true,
          "message": null
        }
      ]
    commonErrors:
      - error: Unauthenticated (401)
        cause: Missing, malformed, expired, or revoked Bearer token, or a client IP outside the token's allowlist
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Get Admin Profile

Returns the profile of the admin who owns the Bearer token on the request. Use it to confirm a token is live and to learn who it belongs to — the account name and email to show in a header, and the role that governs everything else the token can do.

## Endpoint

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/get` | GET | Return the authenticated admin's profile |

The endpoint takes **no path or query parameters**. The token alone selects the record, so there is no way to read another admin's profile here — use the [Settings → Users](/api/rest-api/admin/settings/users/list) endpoints for that.

## Response Fields

The response is a **JSON array holding exactly one object**, not a bare object — read `[0]`, or destructure the first element.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | The admin id, as a string. |
| `name` | String | Admin's display name. |
| `email` | String | Admin's login email. |
| `image` | String | Storage path of the avatar, or `null` when none is set. |
| `status` | String | `"1"` when the account is active, `"0"` when disabled. |
| `roleId` | Integer | Id of the assigned role, or `null` when the admin has no role. |
| `roleName` | String | Name of the assigned role, or `null` when the admin has no role. |
| `success` | Boolean | Always `true`. Present for shape parity across the admin payloads. |
| `message` | String | Always `null`. Present for shape parity across the admin payloads. |

Three of these behave differently from how they look:

- **`id` and `status` are strings, not numbers.** `status` is `"1"` / `"0"` — compare against the string, or cast before testing, since a bare truthiness check treats `"0"` as true in most languages.
- **`roleId` is an integer** while `id` beside it is a string. The two are not interchangeable types.
- **`success` and `message` are constants**, not a result signal. A successful call is HTTP `200`; a failed one never reaches this body. Never branch on them.

## Role Fields

`roleId` and `roleName` name the role, but they do not tell you what the token may do — a token can be narrowed below its owner's role. To gate UI, call [Get Admin Permissions](/api/rest-api/admin/navigation/permissions) instead, which returns the effective permission set after that narrowing.

## Errors

An unauthenticated request is rejected before the endpoint runs. A missing, malformed, expired, or revoked token returns HTTP `401`:

```json
{
  "message": "Unauthenticated.",
  "error": "unauthenticated"
}
```

No permission check applies — any valid token can read its own profile, whatever its permission mode.

## Read-Only

There is no write counterpart. The admin API has no login, logout, forgot-password, or profile-update endpoint — accounts are managed in the admin panel, and tokens are issued from the Integration menu. To edit an admin record programmatically, use the [Settings → Users](/api/rest-api/admin/settings/users/update) endpoints, which act on any admin by id and are permission-gated.

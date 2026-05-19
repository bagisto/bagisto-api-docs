---
outline: false
apiType: rest
examples:
  - id: admin-get-profile
    title: Get Admin Profile
    description: Return the authenticated admin's profile. Requires the Bearer token in the Authorization header.
    query: |
      curl -X GET "https://your-domain.com/api/admin/get" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
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
      - error: Unauthorized (401)
        cause: Missing, invalid, or revoked Bearer token
        solution: Log in via /api/admin/login and send the returned token
---

# Get Admin Profile

Read the profile of the currently authenticated admin.

## Endpoint

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/get` | GET | Return the authenticated admin's profile |

## Details

- Requires the `X-Admin-Key` header and a valid admin Bearer token.
- The response is a JSON array containing a single profile object — `id`,
  `name`, `email`, `image`, `status`, and role (`roleId` / `roleName`).
- An unauthenticated request returns HTTP `401`.

## Examples

Use the interactive example on the right.

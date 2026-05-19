---
outline: false
apiType: rest
examples:
  - id: admin-update-profile
    title: Update Admin Profile
    description: Update the authenticated admin's name or email. currentPassword is always required.
    query: |
      curl -X POST "https://your-domain.com/api/admin/update" \
        -H "Content-Type: application/json" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -d '{
          "name": "Updated Admin Name",
          "currentPassword": "admin123"
        }'
    variables: |
      {}
    response: |
      {
        "id": "1",
        "name": "Updated Admin Name",
        "email": "admin@example.com",
        "success": true,
        "message": "Account updated successfully."
      }
    commonErrors:
      - error: Bad Request (400) — incorrect password
        cause: The supplied currentPassword does not match
        solution: Send the admin's correct current password
      - error: Bad Request (400) — email in use
        cause: The new email already belongs to another admin
        solution: Choose an email not used by any other admin

  - id: admin-change-password
    title: Change Admin Password
    description: Change the authenticated admin's password. Requires currentPassword and a matching confirmPassword.
    query: |
      curl -X POST "https://your-domain.com/api/admin/update" \
        -H "Content-Type: application/json" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -d '{
          "currentPassword": "admin123",
          "password": "NewPass123!",
          "confirmPassword": "NewPass123!"
        }'
    variables: |
      {}
    response: |
      {
        "id": "1",
        "name": "Example Admin",
        "email": "admin@example.com",
        "success": true,
        "message": "Account updated successfully."
      }
    commonErrors:
      - error: Bad Request (400) — password mismatch
        cause: password and confirmPassword do not match
        solution: Ensure both fields are identical
---

# Update Admin Profile

Update the authenticated admin's own profile — name, email, or password.

## Endpoint

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/update` | POST | Update name / email / password |

## Rules

- Requires the `X-Admin-Key` header and a valid admin Bearer token.
- **`currentPassword` is always required** — even when only changing the name.
  This mirrors the Bagisto admin panel's account screen.
- To change the password, also send `password` and a matching
  `confirmPassword`.
- `email` must remain unique across all admins.
- A wrong `currentPassword`, a mismatched `confirmPassword`, or a duplicate
  email returns HTTP `400` with an explanatory message.

## Examples

Use the interactive examples on the right.

---
outline: false
apiType: rest
examples:
  - id: admin-login
    title: Admin Login
    description: Authenticate an admin user and retrieve a Bearer token for all subsequent Admin API calls.
    query: |
      curl -X POST "https://your-domain.com/api/admin/login" \
        -H "Content-Type: application/json" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -d '{
          "email": "admin@example.com",
          "password": "admin123"
        }'
    variables: |
      {}
    response: |
      {
        "id": 1,
        "name": "Example Admin",
        "email": "admin@example.com",
        "token": "12|xY7s06JCndg5FHb8WbfF6ZR8jGq23168m9gm37J9Cmz4xah8...",
        "success": true,
        "message": "Logged in successfully."
      }
    commonErrors:
      - error: Invalid credentials
        cause: Wrong email or password
        solution: Verify the email and password; `success` is false and `token` is empty
      - error: Account inactive
        cause: The admin account has status = 0
        solution: Activate the admin account from the Bagisto panel

  - id: admin-logout
    title: Admin Logout
    description: Revoke the current admin Bearer token. Pass "all" = true to revoke every token for the admin.
    query: |
      curl -X POST "https://your-domain.com/api/admin/logout" \
        -H "Content-Type: application/json" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -d '{ "all": false }'
    variables: |
      {}
    response: |
      {
        "success": true,
        "message": "Logged out successfully."
      }

  - id: admin-forgot-password
    title: Admin Forgot Password
    description: Send a password reset link to the given admin email if the account exists.
    query: |
      curl -X POST "https://your-domain.com/api/admin/forgot-password" \
        -H "Content-Type: application/json" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -d '{
          "email": "admin@example.com"
        }'
    variables: |
      {}
    response: |
      {
        "success": true,
        "message": "A password reset link has been sent to your email."
      }
---

# Admin Authentication

Sign-in endpoints for admin users of the Bagisto Admin REST API. An admin signs
in with their panel credentials and receives a Bearer token that authorises
every subsequent Admin API request.

## Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/login` | POST | Sign in, receive a Bearer token |
| `/api/admin/logout` | POST | Revoke the current (or all) token(s) |
| `/api/admin/forgot-password` | POST | Request a password-reset email |

## Authentication model

- The token returned by `/api/admin/login` is a **Sanctum personal access
  token** issued on the admin account. Send it on every authenticated request:

  ```
  Authorization: Bearer <token>
  ```

- Every `/api/admin/*` request also requires the admin API key header
  `X-Admin-Key`, the same way `/api/shop/*` requires `X-STOREFRONT-KEY`.
- Admin login tokens are independent of the **Integration tokens** managed in
  Admin → Settings → Integration (those are for server-to-server callers).
- Inactive admins (`status = 0`) cannot log in.
- `/api/admin/logout` revokes the current token; send `{"all": true}` to revoke
  every token for the admin.
- `/api/admin/forgot-password` sends a reset link via the `admins` password
  broker.

## Examples

Use the interactive examples on the right — each shows the request as cURL,
Node.js, React, and PHP, plus the response.

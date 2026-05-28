---
outline: false
examples:
  - id: admin-login
    title: Admin Login
    description: Authenticate an admin user with email and password. Returns a Bearer token used for all subsequent Admin API calls.
    query: |
      # This endpoint was removed in the 2026-05-27 admin-auth refactor.
      # Admin clients now authenticate with a pre-issued Integration token
      # (Admin → Settings → Integration in the panel).
      # See ./profile/get-profile.md for the only surviving auth-related call.
    variables: |
      {}
    response: |
      {}

  - id: admin-logout
    title: Admin Logout
    description: Revoke the current admin Bearer token. Pass all = true to revoke every token for the admin (logout from all devices).
    query: |
      # This endpoint was removed in the 2026-05-27 admin-auth refactor.
      # Admin clients now authenticate with a pre-issued Integration token
      # (Admin → Settings → Integration in the panel).
      # See ./profile/get-profile.md for the only surviving auth-related call.
    variables: |
      {}
    response: |
      {}

  - id: admin-forgot-password
    title: Admin Forgot Password
    description: Send a password reset link to the given admin email if the account exists.
    query: |
      # This endpoint was removed in the 2026-05-27 admin-auth refactor.
      # Admin clients now authenticate with a pre-issued Integration token
      # (Admin → Settings → Integration in the panel).
      # See ./profile/get-profile.md for the only surviving auth-related call.
    variables: |
      {}
    response: |
      {}

---

# Admin Authentication

Sign-in operations for admin users of the Bagisto Admin API. An admin signs in
with their panel credentials and receives a Bearer token that authorises every
subsequent Admin API request.

## Operations

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminLogin` | Mutation | Sign in, receive a Bearer token |
| `createAdminLogout` | Mutation | Revoke the current (or all) token(s) |
| `createAdminForgotPassword` | Mutation | Request a password-reset email |

## Authentication model

- The token returned by `createAdminLogin` is a **Sanctum personal access
  token** issued on the admin account. Send it on every authenticated request:

  ```
  Authorization: Bearer <token>
  ```

- Admin login tokens are independent of the **Integration tokens** managed in
  Admin → Settings → Integration. Those are for server-to-server integrations;
  the login token represents a human admin.
- Inactive admins (`status = 0`) cannot log in.
- `createAdminLogout` revokes the current request's token. Pass `all: true` to
  revoke every token for the admin — useful for "log out from all devices".
- `createAdminForgotPassword` sends a reset link via the `admins` password
  broker. The response shape is the same whether or not the email exists; only
  the `message` differs.

## Examples

Use the interactive examples on the right to try each operation.

---
outline: false
examples:
  - id: admin-login
    title: Admin Login
    description: Authenticate an admin user with email and password. Returns a Bearer token used for all subsequent Admin API calls.
    query: |
      mutation createAdminLogin(
        $email: String!
        $password: String!
      ) {
        createAdminLogin(
          input: {
            email: $email
            password: $password
          }
        ) {
          adminLogin {
            id
            name
            email
            token
            success
            message
          }
        }
      }
    variables: |
      {
          "email": "admin@example.com",
          "password": "admin123"
      }
    response: |
      {
        "data": {
          "createAdminLogin": {
            "adminLogin": {
              "id": 1,
              "name": "Example Admin",
              "email": "admin@example.com",
              "token": "12|xY7s06JCndg5FHb8WbfF6ZR8jGq23168m9gm37J9Cmz4xah8...",
              "success": true,
              "message": "Logged in successfully."
            }
          }
        }
      }

  - id: admin-logout
    title: Admin Logout
    description: Revoke the current admin Bearer token. Pass all = true to revoke every token for the admin (logout from all devices).
    query: |
      mutation createAdminLogout($all: Boolean) {
        createAdminLogout(input: { all: $all }) {
          adminLogout {
            success
            message
          }
        }
      }
    variables: |
      {
          "all": false
      }
    response: |
      {
        "data": {
          "createAdminLogout": {
            "adminLogout": {
              "success": true,
              "message": "Logged out successfully."
            }
          }
        }
      }

  - id: admin-forgot-password
    title: Admin Forgot Password
    description: Send a password reset link to the given admin email if the account exists.
    query: |
      mutation createAdminForgotPassword($email: String!) {
        createAdminForgotPassword(input: { email: $email }) {
          adminForgotPassword {
            success
            message
          }
        }
      }
    variables: |
      {
          "email": "admin@example.com"
      }
    response: |
      {
        "data": {
          "createAdminForgotPassword": {
            "adminForgotPassword": {
              "success": true,
              "message": "A password reset link has been sent to your email."
            }
          }
        }
      }
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

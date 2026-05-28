---
outline: false
examples:
  - id: admin-update-profile
    title: Update Admin Profile
    description: Update the authenticated admin's name or email. currentPassword is always required.
    query: |
      # This endpoint was removed in the 2026-05-27 admin-auth refactor.
      # Admin clients now authenticate with a pre-issued Integration token
      # (Admin → Settings → Integration in the panel).
      # See ./profile/get-profile.md for the only surviving auth-related call.
    variables: |
      {}
    response: |
      {}

  - id: admin-change-password
    title: Change Admin Password
    description: Change the authenticated admin's password. Requires currentPassword and a matching confirmPassword.
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

# Update Admin Profile

Update the authenticated admin's own profile — name, email, or password.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminProfileUpdate` | Mutation | Update name / email / password |

## Rules

- Requires a valid admin Bearer token.
- **`currentPassword` is always required** — even when only changing the name.
  This mirrors the Bagisto admin panel's account screen.
- To change the password, also send `password` and a matching
  `confirmPassword`. A mismatch returns a GraphQL error.
- `email` must remain unique across all admins; a duplicate returns an error.
- A wrong `currentPassword` returns a GraphQL error and no change is made.

## Examples

Use the interactive examples on the right.

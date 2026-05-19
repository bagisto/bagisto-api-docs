---
outline: false
examples:
  - id: admin-update-profile
    title: Update Admin Profile
    description: Update the authenticated admin's name or email. currentPassword is always required.
    query: |
      mutation createAdminProfileUpdate(
        $name: String
        $email: String
        $currentPassword: String!
      ) {
        createAdminProfileUpdate(
          input: {
            name: $name
            email: $email
            currentPassword: $currentPassword
          }
        ) {
          adminProfileUpdate {
            id
            name
            email
            success
            message
          }
        }
      }
    variables: |
      {
          "name": "Updated Admin Name",
          "currentPassword": "admin123"
      }
    response: |
      {
        "data": {
          "createAdminProfileUpdate": {
            "adminProfileUpdate": {
              "id": "1",
              "name": "Updated Admin Name",
              "email": "admin@example.com",
              "success": true,
              "message": "Account updated successfully."
            }
          }
        }
      }

  - id: admin-change-password
    title: Change Admin Password
    description: Change the authenticated admin's password. Requires currentPassword and a matching confirmPassword.
    query: |
      mutation createAdminProfileUpdate(
        $currentPassword: String!
        $password: String
        $confirmPassword: String
      ) {
        createAdminProfileUpdate(
          input: {
            currentPassword: $currentPassword
            password: $password
            confirmPassword: $confirmPassword
          }
        ) {
          adminProfileUpdate {
            id
            success
            message
          }
        }
      }
    variables: |
      {
          "currentPassword": "admin123",
          "password": "NewPass123!",
          "confirmPassword": "NewPass123!"
      }
    response: |
      {
        "data": {
          "createAdminProfileUpdate": {
            "adminProfileUpdate": {
              "id": "1",
              "success": true,
              "message": "Account updated successfully."
            }
          }
        }
      }
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

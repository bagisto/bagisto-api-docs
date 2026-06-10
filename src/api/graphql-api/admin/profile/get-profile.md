---
outline: false
examples:
  - id: admin-get-profile
    title: Get Admin Profile
    description: Read the authenticated admin's profile. Requires the Bearer token in the Authorization header.
    query: |
      query readAdminProfile {
        readAdminProfile {
          id
          name
          email
          image
          status
          roleId
          roleName
          success
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "readAdminProfile": {
            "id": "1",
            "name": "Example Admin",
            "email": "admin@example.com",
            "image": null,
            "status": "1",
            "roleId": 1,
            "roleName": "Administrator",
            "success": true
          }
        }
      }
---

# Get Admin Profile

Read the profile of the currently authenticated admin.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `readAdminProfile` | Query | Return the authenticated admin's profile |

## Details

- Requires a valid admin Bearer token in the `Authorization` header.
- Returns the admin's `id`, `name`, `email`, `image`, `status`, and role
  (`roleId` / `roleName`).
- An unauthenticated request returns a GraphQL error and `null` data.

## Examples

Use the interactive example on the right to run the query.

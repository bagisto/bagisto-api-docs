---
outline: false
examples:
  - id: gql
    title: Delete My Account
    query: |
      mutation DeleteSelf($input: createAdminSettingsUserDeleteSelfInput!) {
        createAdminSettingsUserDeleteSelf(input: $input) {
          adminSettingsUserDeleteSelf {
            success
            message
          }
        }
      }
    variables: |
      { "input": { "password": "current-password" } }
    response: |
      {
        "data": {
          "createAdminSettingsUserDeleteSelf": {
            "adminSettingsUserDeleteSelf": {
              "success": true,
              "message": "Your admin account has been deleted."
            }
          }
        }
      }
---

# Delete My Account — GraphQL

Deletes the **authenticated** admin's own account after re-confirming their password.

- Requires the caller's current `password`. A missing or incorrect password returns an `errors` entry; the account is left intact.
- Refuses to delete the **last remaining** admin.
- Distinct from [Delete User](./delete), which deletes another admin and always refuses self-deletion.
- Deleting the account also invalidates the token that owns it.

No additional permission is required beyond authentication — the password confirmation is the gate.

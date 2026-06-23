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
      {
        "input": {
          "password": "current-password"
        }
      }
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

# Delete My Account

Deletes the **authenticated** admin's own account after re-confirming their password.

- Requires the caller's current `password`. A missing or incorrect password returns an `errors` entry and the account is left intact.
- Refuses to delete the **last remaining** admin.
- Deleting the account **invalidates the Bearer token** that owns it — subsequent requests with that token are unauthenticated.
- Distinct from [Delete User](./delete), which removes another admin and always refuses self-deletion.

No additional permission is required beyond authentication — the password confirmation is the gate.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsUserDeleteSelf(input:)` | Mutation | Delete your own admin account |

::: warning
The response above is illustrative. Running this mutation permanently deletes your account and invalidates your token, so it is not executed against the live API in these docs.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

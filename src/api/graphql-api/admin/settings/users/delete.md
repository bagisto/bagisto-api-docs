---
outline: false
examples:
  - id: gql
    title: Delete Admin User
    query: |
      mutation DeleteAdminSettingsUser($input: deleteAdminSettingsUserInput!) {
        deleteAdminSettingsUser(input: $input) {
          adminSettingsUser {
            _id
            name
            email
            roleId
            roleName
            status
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/users/3167"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsUser": {
            "adminSettingsUser": {
              "_id": 3167,
              "name": "Throwaway Delete Test",
              "email": "throwaway-deltest-9921@example.com",
              "roleId": 15,
              "roleName": "DebugAdmin",
              "status": 1,
              "message": "Admin user deleted successfully."
            }
          }
        }
      }
---

# Delete Admin User

Deletes another admin user by id. The mutation returns a snapshot of the deleted record, so you can read back its `_id`, `name`, `email`, `roleId`, `roleName`, and `status` in the same response. The `password` and `api_token` values are never returned.

### Delete guards

- **Cannot delete yourself** through this endpoint — the id must belong to a different admin. To remove your own account use [Delete My Account](./delete-self).
- **Cannot delete the last remaining admin.**

A blocked delete returns the reason in the `errors` array and leaves the account intact.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsUser(input:)` | Mutation | Delete an admin user |

## Notes

- The returned node is an in-memory snapshot of the just-deleted record — its scalar fields (`_id`, `name`, `email`, `roleId`, `roleName`, `status`) still resolve so you can confirm what was removed.
- Select **`message`** for the success confirmation — it resolves to `"Admin user deleted successfully."` on a successful delete. `message` is `null` on read / list / create / update; a blocked delete returns a top-level `errors[]` entry instead.
- Do **not** select the node's IRI `id` field on this mutation — the IRI cannot be generated for a deleted record and the field resolves with an `errors[]` entry. Select `_id` instead, as shown.
- Use the [`adminSettingsUsers`](./list.md) query to discover valid ids.

For field meanings and create/update rules, see the [Users overview](./).

Requires the `settings.users.users.delete` permission and an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

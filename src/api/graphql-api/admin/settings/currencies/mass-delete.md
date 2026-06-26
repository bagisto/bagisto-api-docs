---
outline: false
examples:
  - id: gql
    title: Mass Delete Currencies
    query: |
      mutation MassDelete($input: createAdminSettingsCurrencyMassDeleteInput!) {
        createAdminSettingsCurrencyMassDelete(input: $input) {
          adminSettingsCurrencyMassDelete {
            deleted
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [111, 112]
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsCurrencyMassDelete": {
            "adminSettingsCurrencyMassDelete": {
              "deleted": [111, 112],
              "message": "Currencies deleted successfully."
            }
          }
        }
      }
---

# Mass Delete Currencies

Deletes several currencies in one call by their numeric ids.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsCurrencyMassDelete(input:)` | Mutation | Bulk-delete currencies |

## Notes

- `indices` is an array of the numeric ids (`_id`) to delete. Non-existent ids are silently skipped; an empty array is rejected.
- `deleted` returns a plain array of the ids that were removed. Read `message` to confirm the outcome.
- The [delete guards](./delete.md) still apply per id: the last currency and any channel's base currency cannot be removed.
- Permission: `settings.currencies.delete`.

All currency operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

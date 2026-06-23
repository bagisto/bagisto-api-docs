---
outline: false
examples:
  - id: gql
    title: Delete Currency
    query: |
      mutation Delete($input: deleteAdminSettingsCurrencyInput!) {
        deleteAdminSettingsCurrency(input: $input) {
          adminSettingsCurrency {
            id
            _id
            code
            name
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/currencies/109"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsCurrency": {
            "adminSettingsCurrency": {
              "id": "/api/admin/settings/currencies/109",
              "_id": 109,
              "code": "ZZA",
              "name": "Throwaway A"
            }
          }
        }
      }
---

# Delete Currency

Deletes a single currency by its IRI id.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsCurrency(input:)` | Mutation | Delete a currency |

## Notes

- The mutation returns a snapshot of the just-deleted record, so you can select `id`, `_id`, `code`, `name`, and the other scalar fields to confirm exactly what was removed.
- Use the [`adminSettingsCurrencies`](./list.md) query to discover a valid `id`.
- Permission: `settings.currencies.delete`.

::: warning Delete guards
The store **cannot delete the last currency**, and it **cannot delete a currency that is set as a channel's base currency**. Either condition is rejected before the delete runs.
:::

All currency operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

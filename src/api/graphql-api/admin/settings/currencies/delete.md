---
outline: false
examples:
  - id: gql
    title: Delete Currency
    query: |
      mutation Delete($input: deleteAdminSettingsCurrencyInput!) {
        deleteAdminSettingsCurrency(input: $input) {
          adminSettingsCurrency {
            _id
            code
            name
            symbol
            message
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
              "_id": 109,
              "code": "ZZA",
              "name": "Throwaway A",
              "symbol": "$",
              "message": "Currency deleted successfully."
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

- The returned node is an in-memory snapshot of the just-deleted record — its scalar fields (`_id`, `code`, `name`, `symbol`) still resolve so you can confirm what was removed.
- Select **`message`** for the success confirmation — it resolves to `"Currency deleted successfully."` on a successful delete. `message` is `null` on read / list / create / update; a failed delete returns a top-level `errors[]` entry instead.
- Do **not** select the node's IRI `id` field on this mutation — the IRI cannot be generated for a deleted record and the field resolves with an `errors[]` entry. Select `_id` instead, as shown.
- Use the [`adminSettingsCurrencies`](./list.md) query to discover a valid `id`.
- Permission: `settings.currencies.delete`.

::: warning Delete guards
The store **cannot delete the last currency**, and it **cannot delete a currency that is set as a channel's base currency**. Either condition is rejected before the delete runs.
:::

All currency operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

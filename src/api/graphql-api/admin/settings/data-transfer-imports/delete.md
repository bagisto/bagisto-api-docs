---
outline: false
examples:
  - id: gql
    title: Delete Import
    query: |
      mutation DeleteImport($input: deleteAdminSettingsDataTransferImportInput!) {
        deleteAdminSettingsDataTransferImport(input: $input) {
          adminSettingsDataTransferImport {
            id
            _id
            code
            action
            state
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/data-transfer/imports/13"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsDataTransferImport": {
            "adminSettingsDataTransferImport": {
              "id": "/api/admin/settings/data-transfer/imports/13",
              "_id": 13,
              "code": "products",
              "action": "append",
              "state": "validated"
            }
          }
        }
      }
---

# Delete Import (GraphQL)

Removes an import job and its uploaded source file. Returns a snapshot of the deleted record so you can confirm exactly which import was removed.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsDataTransferImport` | Mutation | Delete an import job + its file |

## Quirks

- The input takes the import's `id` (its resource IRI).
- The response echoes the deleted record's `id` / `_id` and scalar fields.

::: tip Prerequisites
The example uses an illustrative `id`. Replace it with the id of an import that exists in your store — use the [`adminSettingsDataTransferImports`](./list.md) query to discover valid ids.
:::

Permission: `settings.data_transfer.imports.delete`. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

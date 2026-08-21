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
            message
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
              "state": "validated",
              "message": "Import deleted successfully."
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
- The returned node is an in-memory snapshot of the just-deleted record — its `id` / `_id` and scalar fields still resolve so you can confirm what was removed.
- Select **`message`** for the success confirmation — it resolves to `"Import deleted successfully."` on a successful delete. `message` is `null` on read / list / detail; a failed delete returns a top-level `errors[]` entry instead.

The example uses an illustrative `id`. Replace it with the id of an import that exists in your store — use the [`adminSettingsDataTransferImports`](./list.md) query to discover valid ids.

Permission: `settings.data_transfer.imports.delete`.

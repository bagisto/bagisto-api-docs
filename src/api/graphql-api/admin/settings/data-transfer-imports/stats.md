---
outline: false
examples:
  - id: gql
    title: Import Stats
    query: |
      query ImportStats($id: ID!) {
        adminSettingsDataTransferImportStats(id: $id) {
          _id
          type
          action
          state
          processedRowsCount
          invalidRowsCount
          errorsCount
        }
      }
    variables: |
      { "id": "/api/admin/settings/data-transfer/imports/12/stats" }
    response: |
      { "data": { "adminSettingsDataTransferImportStats": { "_id": 12, "type": "products", "action": "append", "state": "processed", "processedRowsCount": 12, "invalidRowsCount": 0, "errorsCount": 0 } } }
---

# Import Stats (GraphQL)

Returns the current progress of an import without advancing it. The counts (`processedRowsCount`, `invalidRowsCount`, `errorsCount`) reflect how far the import has run.

Permission: `settings.data_transfer.imports.view`.

::: tip Prerequisites
The example uses an illustrative `id`. Replace it with the id of a data transfer import that exists in your store — use the [`adminSettingsDataTransferImports`](./list.md) query to discover valid ids.
:::

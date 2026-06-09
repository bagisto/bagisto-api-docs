---
outline: false
examples:
  - id: gql
    title: Start Import
    description: API Platform GraphQL naming yields `startAdminSettingsDataTransferImportStart`. Clients typically alias the field.
    query: |
      mutation StartImport($input: startAdminSettingsDataTransferImportStartInput!) {
        startAdminSettingsDataTransferImportStart(input: $input) {
          adminSettingsDataTransferImportStart {
            id
            state
            processedRowsCount
          }
        }
      }
    variables: |
      { "input": { "importId": 12 } }
    response: |
      { "data": { "startAdminSettingsDataTransferImportStart": { "adminSettingsDataTransferImportStart": { "id": 12, "state": "processing", "processedRowsCount": 10 } } } }
---

# Start Import (GraphQL)

Processes the next pending batch of rows. Call this repeatedly until there are no pending batches left — each call advances the import.

After the rows are processed, run the [Link](./link.md) stage, then the [Index](./index.md) stage to finish the import.

## Errors

The mutation reports an error when there is nothing left to import, when the import has not been validated, or when asynchronous processing is requested but the queue is not configured.

Permission: `settings.data_transfer.imports.edit`.

::: tip Prerequisites
The example uses an illustrative `importId`. Replace it with the id of a validated import in your store.
:::

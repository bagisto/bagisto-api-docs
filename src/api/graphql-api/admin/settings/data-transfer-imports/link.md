---
outline: false
examples:
  - id: gql
    title: Link Import
    description: API Platform GraphQL naming yields `linkAdminSettingsDataTransferImportLink`. Clients typically alias the field.
    query: |
      mutation LinkImport($input: linkAdminSettingsDataTransferImportLinkInput!) {
        linkAdminSettingsDataTransferImportLink(input: $input) {
          adminSettingsDataTransferImportLink {
            id
            state
            processedRowsCount
          }
        }
      }
    variables: |
      { "input": { "importId": 12 } }
    response: |
      { "data": { "linkAdminSettingsDataTransferImportLink": { "adminSettingsDataTransferImportLink": { "id": 12, "state": "linked", "processedRowsCount": 12 } } } }
---

# Link Import (GraphQL)

Runs the post-process linking stage of the import. This follows the processing stage (see [Start](./start.md)) and resolves relationships between the imported records.

After linking, run the [Index](./index.md) stage to finish the import.

Permission: `settings.data_transfer.imports.edit`.

::: tip Prerequisites
The example uses an illustrative `importId`. Replace it with the id of an import in your store that has finished processing.
:::

---
outline: false
examples:
  - id: gql
    title: Index Import
    description: API Platform GraphQL naming yields `indexAdminSettingsDataTransferImportIndex`. Clients typically alias the field.
    query: |
      mutation IndexImport($input: indexAdminSettingsDataTransferImportIndexInput!) {
        indexAdminSettingsDataTransferImportIndex(input: $input) {
          adminSettingsDataTransferImportIndex {
            id
            state
            processedRowsCount
          }
        }
      }
    variables: |
      { "input": { "importId": 12 } }
    response: |
      { "data": { "indexAdminSettingsDataTransferImportIndex": { "adminSettingsDataTransferImportIndex": { "id": 12, "state": "indexed", "processedRowsCount": 12 } } } }
---

# Index Import (GraphQL)

Runs the indexing stage of the import. This is the final stage, following the linking stage (see [Link](./link.md)), and makes the imported records searchable and visible on the storefront.

Permission: `settings.data_transfer.imports.edit`.

::: tip Prerequisites
The example uses an illustrative `importId`. Replace it with the id of an import in your store that has finished linking.
:::

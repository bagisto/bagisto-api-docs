---
outline: false
examples:
  - id: gql
    title: Delete Import
    query: |
      mutation Delete($input: deleteAdminSettingsDataTransferImportInput!) {
        deleteAdminSettingsDataTransferImport(input: $input) { adminSettingsDataTransferImport { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/data-transfer/imports/3" } }
    response: |
      { "data": { "deleteAdminSettingsDataTransferImport": { "adminSettingsDataTransferImport": null } } }
---

# Delete Import (GraphQL)

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a data transfer import that exists in your store — use the [`adminSettingsDataTransferImports`](./list.md) query to discover valid ids.
:::

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

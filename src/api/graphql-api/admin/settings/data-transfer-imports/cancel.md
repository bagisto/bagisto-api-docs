---
outline: false
examples:
  - id: gql
    title: Cancel Import
    description: API Platform GraphQL naming yields `cancelAdminSettingsDataTransferImportCancel`. Clients typically alias the field.
    query: |
      mutation CancelImport($input: cancelAdminSettingsDataTransferImportCancelInput!) {
        cancelAdminSettingsDataTransferImportCancel(input: $input) {
          adminSettingsDataTransferImportCancel { id state message }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/data-transfer/imports/3" } }
    response: |
      { "data": { "cancelAdminSettingsDataTransferImportCancel": { "adminSettingsDataTransferImportCancel": { "id": 3, "state": "cancelled", "message": "Import cancelled successfully." } } } }
---

# Cancel Import (GraphQL)

::: warning Terminal-state guard
Refuses when the import is `completed`, `processed`, `failed` or already `cancelled` (errors[]).
:::

Permission: `settings.data_transfer.imports.edit`.

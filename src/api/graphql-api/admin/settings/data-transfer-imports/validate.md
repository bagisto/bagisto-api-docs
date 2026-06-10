---
outline: false
examples:
  - id: gql
    title: Validate Import
    description: API Platform GraphQL naming yields `validateAdminSettingsDataTransferImportValidate`. Clients typically alias the field.
    query: |
      mutation ValidateImport($input: validateAdminSettingsDataTransferImportValidateInput!) {
        validateAdminSettingsDataTransferImportValidate(input: $input) {
          adminSettingsDataTransferImportValidate {
            id
            isValid
          }
        }
      }
    variables: |
      { "input": { "importId": 12 } }
    response: |
      { "data": { "validateAdminSettingsDataTransferImportValidate": { "adminSettingsDataTransferImportValidate": { "id": 12, "isValid": true } } } }
---

# Validate Import (GraphQL)

Runs validation over the uploaded file without importing any data. This is the second step of the import lifecycle (after the import is created).

The response carries an `isValid` flag. When `isValid` is `false`, inspect the import's error counts and download the error report over REST to see which rows failed.

Permission: `settings.data_transfer.imports.edit`.

::: tip Prerequisites
The example uses an illustrative `importId`. Replace it with the id of a data transfer import that exists in your store — use the [`adminSettingsDataTransferImports`](./list.md) query to discover valid ids.
:::

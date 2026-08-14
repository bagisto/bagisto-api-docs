---
outline: false
examples:
  - id: gql
    title: Validate Import
    description: Runs the validation pass over the uploaded file. The field name follows API Platform naming — clients typically alias it.
    query: |
      mutation ValidateImport($input: validateAdminSettingsDataTransferImportValidateInput!) {
        validateAdminSettingsDataTransferImportValidate(input: $input) {
          adminSettingsDataTransferImportValidate {
            _id
            state
            isValid
            errorsCount
            invalidRowsCount
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/data-transfer/imports/12/validate",
          "importId": 12
        }
      }
    response: |
      {
        "data": {
          "validateAdminSettingsDataTransferImportValidate": {
            "adminSettingsDataTransferImportValidate": {
              "_id": 12,
              "state": "validated",
              "isValid": true,
              "errorsCount": 0,
              "invalidRowsCount": 0
            }
          }
        }
      }
---

# Validate Import (GraphQL)

Runs validation over the uploaded file **without importing any data**. This is the second step of the import lifecycle — run it after the import is created (over REST), before [start](./start.md).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `validateAdminSettingsDataTransferImportValidate` | Mutation | Validate the uploaded file |

## Quirks

- The input takes the import's `importId` **and** an `id` (the validate IRI) — API Platform requires the `id` field on every non-create mutation.
- The response carries an `isValid` flag. When `isValid` is `false`, read `errorsCount` / `invalidRowsCount`, or download the error report over REST to see which rows failed.
- Select `_id` for the numeric import id; the payload `id` IRI does not resolve on mutation results.

The example uses an illustrative import. Replace it with an import that exists in your store — use the [`adminSettingsDataTransferImports`](./list.md) query to discover valid ids.

Permission: `settings.data_transfer.imports.edit`.

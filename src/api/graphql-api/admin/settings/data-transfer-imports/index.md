---
outline: false
examples:
  - id: gql
    title: Index Import
    description: Runs the final indexing stage. The field name follows API Platform naming — clients typically alias it. Runs against an import that has finished linking.
    query: |
      mutation IndexImport($input: indexAdminSettingsDataTransferImportIndexInput!) {
        indexAdminSettingsDataTransferImportIndex(input: $input) {
          adminSettingsDataTransferImportIndex {
            _id
            state
            processedRowsCount
            invalidRowsCount
            errorsCount
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/data-transfer/imports/12/index",
          "importId": 12
        }
      }
    response: |
      {
        "data": {
          "indexAdminSettingsDataTransferImportIndex": {
            "adminSettingsDataTransferImportIndex": {
              "_id": 12,
              "state": "indexed",
              "processedRowsCount": 12,
              "invalidRowsCount": 0,
              "errorsCount": 0
            }
          }
        }
      }
---

# Index Import (GraphQL)

Runs the **indexing** stage — the final step. It makes the imported records searchable and visible on the storefront. Runs after [link](./link.md).

> This example runs against an import whose linking has completed. Calling it on an import that has not finished linking returns an error.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `indexAdminSettingsDataTransferImportIndex` | Mutation | Run the indexing stage (final step) |

## Quirks

- The input takes the import's `importId` **and** an `id` (the index IRI) — API Platform requires the `id` field on every non-create mutation.
- Select `_id` for the numeric import id; the payload `id` IRI does not resolve on mutation results.

::: tip Prerequisites
The example uses an illustrative import. Replace it with an import in your store that has finished linking.
:::

Permission: `settings.data_transfer.imports.edit`. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

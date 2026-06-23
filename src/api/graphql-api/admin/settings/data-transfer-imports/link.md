---
outline: false
examples:
  - id: gql
    title: Link Import
    description: Runs the post-process linking stage. The field name follows API Platform naming — clients typically alias it. Runs against an import that has finished processing.
    query: |
      mutation LinkImport($input: linkAdminSettingsDataTransferImportLinkInput!) {
        linkAdminSettingsDataTransferImportLink(input: $input) {
          adminSettingsDataTransferImportLink {
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
          "id": "/api/admin/settings/data-transfer/imports/12/link",
          "importId": 12
        }
      }
    response: |
      {
        "data": {
          "linkAdminSettingsDataTransferImportLink": {
            "adminSettingsDataTransferImportLink": {
              "_id": 12,
              "state": "linked",
              "processedRowsCount": 12,
              "invalidRowsCount": 0,
              "errorsCount": 0
            }
          }
        }
      }
---

# Link Import (GraphQL)

Runs the **post-process linking** stage — resolves relationships between the imported records (e.g. linking variants to their configurable parent). Runs after the rows have finished processing (see [start](./start.md)).

> This example runs against an import whose processing has completed. Calling it on an import that has not finished processing returns an error.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `linkAdminSettingsDataTransferImportLink` | Mutation | Run the linking stage |

## After linking

Run the [index](./index.md) stage to finish the import.

## Quirks

- The input takes the import's `importId` **and** an `id` (the link IRI) — API Platform requires the `id` field on every non-create mutation.
- Select `_id` for the numeric import id; the payload `id` IRI does not resolve on mutation results.

::: tip Prerequisites
The example uses an illustrative import. Replace it with an import in your store that has finished processing.
:::

Permission: `settings.data_transfer.imports.edit`. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

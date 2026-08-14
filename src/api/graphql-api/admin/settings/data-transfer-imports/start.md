---
outline: false
examples:
  - id: gql
    title: Start Import
    description: Processes the next pending batch of rows. The field name follows API Platform naming — clients typically alias it. Runs against a validated import.
    query: |
      mutation StartImport($input: startAdminSettingsDataTransferImportStartInput!) {
        startAdminSettingsDataTransferImportStart(input: $input) {
          adminSettingsDataTransferImportStart {
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
          "id": "/api/admin/settings/data-transfer/imports/12/start",
          "importId": 12
        }
      }
    response: |
      {
        "data": {
          "startAdminSettingsDataTransferImportStart": {
            "adminSettingsDataTransferImportStart": {
              "_id": 12,
              "state": "processing",
              "processedRowsCount": 10,
              "invalidRowsCount": 0,
              "errorsCount": 0
            }
          }
        }
      }
---

# Start Import (GraphQL)

Processes the **next pending batch** of rows. Call it repeatedly — each call advances the import — until [stats](./stats.md) reports `remaining: 0`. Runs only after the import has been [validated](./validate.md).

> This example runs against a **validated, mid-pipeline** import. A freshly-created import with validation errors returns `There is nothing to import.` instead.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `startAdminSettingsDataTransferImportStart` | Mutation | Process the next batch of rows |

## After processing

When all batches are processed, run the [link](./link.md) stage, then the [index](./index.md) stage to finish the import.

## Errors

The mutation reports an error when there is nothing left to import, when the import has not been validated, or when asynchronous processing is requested but the queue is not configured.

## Quirks

- The input takes the import's `importId` **and** an `id` (the start IRI) — API Platform requires the `id` field on every non-create mutation.
- Select `_id` for the numeric import id; the payload `id` IRI does not resolve on mutation results.

The example uses an illustrative import. Replace it with a validated import in your store.

Permission: `settings.data_transfer.imports.edit`.

---
outline: false
examples:
  - id: gql
    title: Import Detail
    query: |
      query ImportDetail($id: ID!) {
        adminSettingsDataTransferImport(id: $id) {
          id
          _id
          code
          action
          state
          processInQueue
          validationStrategy
          allowedErrors
          processedRowsCount
          invalidRowsCount
          errorsCount
          errors
          fieldSeparator
          filePath
          imagesDirectoryPath
          errorFilePath
          summary
          startedAt
          completedAt
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/settings/data-transfer/imports/13"
      }
    response: |
      {
        "data": {
          "adminSettingsDataTransferImport": {
            "id": "/api/admin/settings/data-transfer/imports/13",
            "_id": 13,
            "code": "products",
            "action": "append",
            "state": "validated",
            "processInQueue": false,
            "validationStrategy": "stop-on-errors",
            "allowedErrors": 10,
            "processedRowsCount": 0,
            "invalidRowsCount": 0,
            "errorsCount": 2,
            "errors": [
              "Required columns not found: sku.",
              "Invalid column names: \"Name\", \"SKU\", \"Attribute Family\", \"Price\", \"Quantity\", \"ID\", \"Status\", \"Category\", \"Type\"."
            ],
            "fieldSeparator": ",",
            "filePath": "imports/695deb404dcb9_abfe03fa9c1740306b93d365d3213c217cdb1f08003dd58a400edd76729f985c.csv",
            "imagesDirectoryPath": "",
            "errorFilePath": null,
            "summary": null,
            "startedAt": null,
            "completedAt": null,
            "createdAt": "2026-01-07T16:11:21+05:30",
            "updatedAt": "2026-01-07T16:12:33+05:30"
          }
        }
      }
---

# Import Detail (GraphQL)

Returns a single import job with the full set of fields — including the heavy `errors[]` list and `summary` object that the listing leaves null.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsDataTransferImport(id:)` | Query | Fetch one import with every field |

## Field meanings

- `code` — the entity being imported (`products`, `customers`, `tax_rates`, …).
- `action` — `append` (insert/update rows) or `delete` (remove rows).
- `state` — where the job sits in its lifecycle (`pending`, `validated`, `processing`, `processed`, `linked`, `indexed`, `completed`, `cancelled`, …).
- `validationStrategy` — `stop-on-errors` or `skip-errors`; `allowedErrors` is the error budget for `skip-errors`.
- `processedRowsCount` / `invalidRowsCount` / `errorsCount` — progress and validation counters.
- `errors` — the list of validation messages (null until validation has run).
- `summary` — created/updated/deleted counts after a run (null until the run completes).
- `filePath` / `errorFilePath` / `imagesDirectoryPath` — storage paths; the source file and error report are downloadable over REST only.
- `startedAt` / `completedAt` / `createdAt` / `updatedAt` — lifecycle timestamps.

## Quirks

- `errors` and `summary` are returned as raw JSON values — query them bare (no sub-selection).
- `errorFilePath` and `summary` stay null until a run has actually produced output.

The example uses an illustrative `id`. Replace it with the id of an import that exists in your store — use the [`adminSettingsDataTransferImports`](./list.md) query to discover valid ids.

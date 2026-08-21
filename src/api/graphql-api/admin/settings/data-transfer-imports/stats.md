---
outline: false
examples:
  - id: gql
    title: Import Stats
    query: |
      query ImportStats($id: ID!) {
        adminSettingsDataTransferImportStats(id: $id) {
          _id
          code
          action
          state
          processedRowsCount
          invalidRowsCount
          errorsCount
          stats
        }
      }
    variables: |
      {
        "id": "/api/admin/settings/data-transfer/imports/13/stats"
      }
    response: |
      {
        "data": {
          "adminSettingsDataTransferImportStats": {
            "_id": 13,
            "code": "products",
            "action": "append",
            "state": "validated",
            "processedRowsCount": 0,
            "invalidRowsCount": 0,
            "errorsCount": 2,
            "stats": {
              "batches": {
                "total": 0,
                "completed": 0,
                "remaining": 0
              },
              "progress": 0,
              "summary": {
                "created": 0,
                "updated": 0,
                "deleted": 0
              }
            }
          }
        }
      }
---

# Import Stats (GraphQL)

Returns the current progress of an import **without advancing it**. Poll this between [start](./start.md) / [link](./link.md) / [index](./index.md) calls to drive a progress bar.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsDataTransferImportStats(id:)` | Query | Read progress without running a stage |

## Field meanings

- `processedRowsCount` / `invalidRowsCount` / `errorsCount` — running counters.
- `stats.batches` — `total` / `completed` / `remaining` batch counts; `remaining` reaching `0` means the current stage has finished.
- `stats.progress` — percentage (0–100) of batches completed.
- `stats.summary` — created/updated/deleted record counts so far.

## Quirks

- The `id` argument is the **stats IRI** — append `/stats` to the import's resource path.
- `stats` is returned as a raw JSON object — query it bare (no sub-selection).
- The job's entity is exposed as `code` (e.g. `products`), not `type`.

The example uses an illustrative `id`. Replace it with the stats IRI of an import that exists in your store — use the [`adminSettingsDataTransferImports`](./list.md) query to discover valid ids.

Permission: `settings.data_transfer.imports.view`.

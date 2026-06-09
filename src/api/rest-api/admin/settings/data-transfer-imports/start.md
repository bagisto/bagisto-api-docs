---
outline: false
apiType: rest
examples:
  - id: rest
    title: Start Import
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/data-transfer/imports/12/start" -H "Authorization: Bearer <token>"
    response: |
      { "stats": { "processed": 10, "total": 12, "invalid": 0 }, "import": { "id": 12, "type": "products", "action": "append", "state": "processing", "processedRowsCount": 10, "invalidRowsCount": 0, "errorsCount": 0, "createdAt": "2026-06-08 09:00:00" } }
---

# Start Import

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports/{id}/start` | POST |

Processes the next pending batch of rows. Call this repeatedly until there are no pending batches left — each call advances the import and returns progress in the `stats` object. The `{id}` is the import id.

```json
{ "stats": { "processed": 10, "total": 12, "invalid": 0 }, "import": { /* ... */ } }
```

The `stats` values above are illustrative.

## Import lifecycle

A full import runs through these stages, in order:

1. **Create** the import (uploads the file).
2. **Validate** the file.
3. **Start** — processes one batch per call; repeat until no pending batch remains.
4. **Link** — runs the post-process linking stage.
5. **Index** — runs the indexing stage.

## Errors

| Condition | Status |
|-----------|--------|
| Nothing left to import | `400` |
| Import has not been validated / is not valid | `400` |
| `process_in_queue` requested but the queue is not configured | `400` |

Permission: `settings.data_transfer.imports.edit`.

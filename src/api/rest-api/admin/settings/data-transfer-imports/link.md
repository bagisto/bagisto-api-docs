---
outline: false
apiType: rest
examples:
  - id: rest
    title: Link Import
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/data-transfer/imports/12/link" -H "Authorization: Bearer <token>"
    response: |
      { "stats": { "processed": 12, "total": 12, "invalid": 0 }, "import": { "id": 12, "type": "products", "action": "append", "state": "linked", "processedRowsCount": 12, "invalidRowsCount": 0, "errorsCount": 0, "createdAt": "2026-06-08 09:00:00" } }
---

# Link Import

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports/{id}/link` | POST |

Runs the post-process linking stage of the import. This follows the processing stage (see [Start](./start.md)) and resolves relationships between the imported records. The `{id}` is the import id.

```json
{ "stats": { "processed": 12, "total": 12, "invalid": 0 }, "import": { /* ... */ } }
```

The `stats` values above are illustrative.

Permission: `settings.data_transfer.imports.edit`.

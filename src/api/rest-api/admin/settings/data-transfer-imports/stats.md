---
outline: false
apiType: rest
examples:
  - id: rest
    title: Import Stats
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/data-transfer/imports/12/stats?state=processed" -H "Authorization: Bearer <token>"
    response: |
      { "stats": { "processed": 12, "total": 12, "invalid": 0 }, "import": { "id": 12, "type": "products", "action": "append", "state": "processed", "processedRowsCount": 12, "invalidRowsCount": 0, "errorsCount": 0, "createdAt": "2026-06-08 09:00:00" } }
---

# Import Stats

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports/{id}/stats` | GET |

Returns the current progress of an import without advancing it. Use the optional `state` query parameter (e.g. `processed`) to scope the counts to a particular processing state. The `{id}` is the import id.

```json
{ "stats": { "processed": 12, "total": 12, "invalid": 0 }, "import": { /* ... */ } }
```

The `stats` values above are illustrative.

Permission: `settings.data_transfer.imports.view`.

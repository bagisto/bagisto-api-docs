---
outline: false
apiType: rest
examples:
  - id: rest
    title: Index Import
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/data-transfer/imports/12/index" -H "Authorization: Bearer <token>"
    response: |
      { "stats": { "processed": 12, "total": 12, "invalid": 0 }, "import": { "id": 12, "type": "products", "action": "append", "state": "indexed", "processedRowsCount": 12, "invalidRowsCount": 0, "errorsCount": 0, "createdAt": "2026-06-08 09:00:00" } }
---

# Index Import

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports/{id}/index` | POST |

Runs the indexing stage of the import. This is the final stage, following the linking stage (see [Link](./link.md)), and makes the imported records searchable and visible on the storefront. The `{id}` is the import id.

```json
{ "stats": { "processed": 12, "total": 12, "invalid": 0 }, "import": { /* ... */ } }
```

The `stats` values above are illustrative.

Permission: `settings.data_transfer.imports.edit`.

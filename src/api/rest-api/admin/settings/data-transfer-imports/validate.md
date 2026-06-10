---
outline: false
apiType: rest
examples:
  - id: rest
    title: Validate Import
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/data-transfer/imports/12/validate" -H "Authorization: Bearer <token>"
    response: |
      { "is_valid": true, "import": { "id": 12, "type": "products", "action": "append", "state": "validated", "validationStrategy": "stop-on-errors", "allowedErrors": 0, "processedRowsCount": 0, "invalidRowsCount": 0, "errorsCount": 0, "createdAt": "2026-06-08 09:00:00" } }
---

# Validate Import

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports/{id}/validate` | POST |

Runs validation over the uploaded file without importing any data. This is the second step of the import lifecycle (after the import is created). The `{id}` is the import id.

The response carries an `is_valid` flag and the refreshed import object:

```json
{ "is_valid": true, "import": { /* ... */ } }
```

When `is_valid` is `false`, inspect the import's error counts and download the error report to see which rows failed.

Permission: `settings.data_transfer.imports.edit`.

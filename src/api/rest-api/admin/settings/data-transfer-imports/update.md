---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Import
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/data-transfer/imports/12" \
        -H "Authorization: Bearer <token>" \
        -F "type=products" \
        -F "action=append" \
        -F "validation_strategy=skip-errors" \
        -F "allowed_errors=10" \
        -F "field_separator=," \
        -F "file=@products-revised.csv"
    response: |
      { "id": 12, "type": "products", "action": "append", "state": "pending", "validationStrategy": "skip-errors", "allowedErrors": 10, "fieldSeparator": ",", "processedRowsCount": 0, "invalidRowsCount": 0, "errorsCount": 0, "filePath": "imports/products-revised.csv", "createdAt": "2026-06-08 09:00:00" }
---

# Update Import

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports/{id}` | PUT |

Re-saves an import's configuration. The import is reset back to `pending` and any earlier processing counts and error report are cleared. The `{id}` is the import id.

Send the request as `multipart/form-data`. The `file` field is optional — when a new file is sent it replaces the previous source file; when omitted the existing file is kept.

| Field | Required | Description |
|-------|----------|-------------|
| `type` | yes | The importer to use, e.g. `products`, `customers`, `tax_rates`. |
| `action` | yes | `append` or `delete`. |
| `validation_strategy` | yes | `stop-on-errors` or `skip-errors`. |
| `allowed_errors` | yes | Integer `≥ 0`. |
| `field_separator` | yes | The column delimiter, e.g. `,`. |
| `process_in_queue` | no | When `true`, large imports are processed asynchronously. |
| `images_directory_path` | no | Folder containing referenced product images. |
| `file` | no | A replacement import file (`csv`, `xls`, `xlsx`, or `xml`). |

Returns the updated import detail.

Permission: `settings.data_transfer.imports.edit`.

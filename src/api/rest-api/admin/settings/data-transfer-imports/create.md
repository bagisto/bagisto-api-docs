---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Import
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/data-transfer/imports" \
        -H "Authorization: Bearer <token>" \
        -F "type=products" \
        -F "action=append" \
        -F "validation_strategy=stop-on-errors" \
        -F "allowed_errors=0" \
        -F "field_separator=," \
        -F "process_in_queue=false" \
        -F "file=@products.csv"
    response: |
      { "id": 12, "type": "products", "action": "append", "state": "pending", "validationStrategy": "stop-on-errors", "allowedErrors": 0, "fieldSeparator": ",", "processedRowsCount": 0, "invalidRowsCount": 0, "errorsCount": 0, "filePath": "imports/products.csv", "createdAt": "2026-06-08 09:00:00" }
---

# Create Import

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports` | POST |

Uploads a source file and creates a new import. The import is created in the `pending` state, ready to be validated and processed.

Send the request as `multipart/form-data`.

| Field | Required | Description |
|-------|----------|-------------|
| `type` | yes | The importer to use, e.g. `products`, `customers`, `tax_rates`. |
| `action` | yes | `append` (add / update rows) or `delete` (remove rows). |
| `validation_strategy` | yes | `stop-on-errors` (abort the run on the first invalid row) or `skip-errors` (skip invalid rows and continue). |
| `allowed_errors` | yes | Integer `≥ 0`. Maximum number of errors tolerated before the run stops. |
| `field_separator` | yes | The column delimiter used in the file, e.g. `,`. |
| `process_in_queue` | no | When `true`, large imports are processed asynchronously. |
| `images_directory_path` | no | Folder containing referenced product images. |
| `file` | yes | The import file (`csv`, `xls`, `xlsx`, or `xml`). |

Returns the created import detail with HTTP `201`.

### File upload is REST only

Creating an import requires uploading a file, which cannot be done over GraphQL. Use this REST endpoint to create imports.

Permission: `settings.data_transfer.imports.create`.

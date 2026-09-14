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
        -F "image_source=upload" \
        -F "upload_images=@images.zip" \
        -F "file=@products.csv"
    response: |
      { "id": 12, "type": "products", "action": "append", "state": "pending", "validationStrategy": "stop-on-errors", "allowedErrors": 0, "fieldSeparator": ",", "processedRowsCount": 0, "invalidRowsCount": 0, "errorsCount": 0, "filePath": "imports/12/products.csv", "imageSource": "upload", "imagesArchiveName": "images.zip", "imagesDirectoryPath": null, "createdAt": "2026-06-08 09:00:00" }
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
| `image_source` | no | Where a product import reads the images its rows name: `directory` (default), `upload` or `url`. |
| `upload_images` | with `upload` | A ZIP of the images, up to 100 MB. It is unpacked for this import, and a replacement archive starts from an empty folder. |
| `images_directory_path` | with `directory` | Folder under `storage/app/import` holding the images. |
| `file` | yes | The import file (`csv`, `xls`, `xlsx`, or `xml`). |

Returns the created import detail with HTTP `201`.

### Where a product import gets its images

A product row names its images by file name or URL, and `image_source` decides how those names are resolved:

- **`directory`** — images were placed on the server by hand under `storage/app/import/{images_directory_path}`. This is the default, and the path is required.
- **`upload`** — the images come with the import as a ZIP in `upload_images`, unpacked into the import's own folder. The archive is required unless one has already been uploaded for this import.
- **`url`** — each row carries a full URL, downloaded during the run.

The image fields apply only to importers that handle images; a customer or tax-rate import ignores them.

### File upload is REST only

Creating an import requires uploading a file, which cannot be done over GraphQL. Use this REST endpoint to create imports.

Permission: `settings.data_transfer.imports.create`.

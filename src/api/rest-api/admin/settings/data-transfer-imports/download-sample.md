---
outline: false
apiType: rest
examples:
  - id: rest
    title: Download Sample Template
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/data-transfer/imports/sample/products/csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/octet-stream" \
        -o products-sample.csv
    response: |
      (binary file download — a sample import template for the requested type)
---

# Download Sample Template

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports/sample/{type}/{format}` | GET |

Downloads a ready-made sample template for an importer type, so you can see the expected columns before preparing your own file.

| Path part | Description |
|-----------|-------------|
| `{type}` | The importer type, e.g. `products`, `customers`, `tax_rates`. |
| `{format}` | The file format, e.g. `csv`, `xls`, `xlsx`, `xml`. |

For example, `/sample/products/csv` returns a CSV product template. The response is a binary attachment — send `Accept: application/octet-stream` and write the body to disk with `-o`.

Returns `422` or `404` for an unknown type or format.

### REST only

Binary file downloads are not available over GraphQL.

Permission: `settings.data_transfer.imports.view`.

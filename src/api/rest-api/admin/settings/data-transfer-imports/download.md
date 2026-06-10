---
outline: false
apiType: rest
examples:
  - id: rest
    title: Download Source File
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/data-transfer/imports/12/download" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/octet-stream" \
        -o products.csv
    response: |
      (binary file download — the uploaded source file)
---

# Download Source File

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports/{id}/download` | GET |

Downloads the source file that was uploaded for this import. The response is the raw file as a binary attachment — send `Accept: application/octet-stream` and write the body to disk with `-o`. The `{id}` is the import id.

Returns `404` when the import has no associated file.

::: tip REST only
Binary file downloads are not available over GraphQL.
:::

Permission: `settings.data_transfer.imports.view`.

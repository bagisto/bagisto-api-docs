---
outline: false
apiType: rest
examples:
  - id: admin-catalog-downloadable-link-upload
    title: Upload a Downloadable Link File
    description: Multipart upload of the binary file for a file-type downloadable link. Returns the stored path to use on the product update.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products/12/downloadable-links/upload" \
        -H "Authorization: Bearer <token>" \
        -F "file=@/path/to/user-manual.zip"
    variables: |
      multipart/form-data:
        file: <binary file>
    response: |
      {
        "type": "link",
        "path": "product_downloadable_links/12/abc123.zip",
        "name": "user-manual.zip",
        "url": "/storage/product_downloadable_links/12/abc123.zip"
      }
  - id: admin-catalog-downloadable-sample-upload
    title: Upload a Downloadable Sample File
    description: Multipart upload of the binary file for a file-type downloadable sample. Returns the stored path to use on the product update.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products/12/downloadable-samples/upload" \
        -H "Authorization: Bearer <token>" \
        -F "file=@/path/to/preview.zip"
    variables: |
      multipart/form-data:
        file: <binary file>
    response: |
      {
        "type": "sample",
        "path": "product_downloadable_samples/12/def456.zip",
        "name": "preview.zip",
        "url": "/storage/product_downloadable_samples/12/def456.zip"
      }
---

# Downloadable Products — Upload Link / Sample File

Uploads the binary file for a **file-type** downloadable link or sample and returns its stored `path`.

::: tip How the two-step flow works
This endpoint only **stores the file** and returns its `path`. You then attach that path to the link/sample on the [product update](/api/rest-api/admin/catalog/products/update): set `downloadable_links[link_x][file] = <path>` and `type = file` (or `downloadable_samples[sample_x][file]`). URL-type links/samples don't need this — set their `url` directly on the update.
:::

::: warning REST only
Binary file parts are not transportable over JSON GraphQL — these endpoints are REST-only.
:::

## Endpoints

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/downloadable-links/upload` | POST |
| `/api/admin/catalog/products/{productId}/downloadable-samples/upload` | POST |

## Content type

`multipart/form-data` — required.

## Form fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `file` | file | yes | The binary file to store (max 128 MB). |

## Response

`201 Created`

| Field | Type | Notes |
|-------|------|-------|
| `type` | string | `link` or `sample`. |
| `path` | string | Storage-relative file path — use this on the product update. |
| `name` | string | Original file name. |
| `url` | string \| null | URL if the storage disk exposes one, otherwise `null`. |

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.edit`. |
| `404 Not Found` | Product not found. |
| `422 Unprocessable Entity` | Missing file, or file too large. |

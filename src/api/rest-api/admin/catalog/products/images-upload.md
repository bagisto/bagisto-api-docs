---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-image-upload
    title: Upload a Product Image
    description: Multipart upload of a single product image. Allowed mime types — bmp, jpeg, jpg, png, webp.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products/12/images" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -F "image=@/path/to/photo.webp" \
        -F "position=1"
    variables: |
      multipart/form-data:
        image: <binary file>
        position: 1
    response: |
      {
        "id": 47,
        "productId": 12,
        "path": "product/12/abc123.webp",
        "position": 1,
        "url": "/storage/product/12/abc123.webp"
      }
    commonErrors:
      - error: Validation (422)
        cause: Missing file, invalid mime type, or file too large
        solution: Send a valid image under the configured size limit
      - error: Not Found (404)
        cause: Parent product not found
        solution: Verify `{productId}` exists
---

# Product Images — Upload

Uploads a new image for the given product.

::: warning REST only — GraphQL upload not supported
Binary file parts are **not transportable over JSON GraphQL.** The GraphQL
`createAdminCatalogProductImage` mutation exists as a placeholder only and
will not accept a file. Use this REST endpoint for image upload.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/images` | POST |

## Content type

`multipart/form-data` — required.

## Form fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `image` | file | yes | One of bmp, jpeg, jpg, png, webp. |
| `position` | integer | no | Sort position; appended to the end if omitted. |

## Response

`201 Created`

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | New `product_images.id`. |
| `productId` | integer | Parent product ID (echoed). |
| `path` | string | Storage-relative file path. |
| `position` | integer | Sort position. |
| `url` | string | Public URL. |

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.edit`. |
| `404 Not Found` | Product not found. |
| `422 Unprocessable Entity` | Missing file, invalid mime, or oversized payload. |

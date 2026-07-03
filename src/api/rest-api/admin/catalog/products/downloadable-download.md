---
outline: false
apiType: rest
examples:
  - id: admin-catalog-downloadable-download
    title: Download a Stored Downloadable File
    description: Streams the stored file for a product attribute (a downloadable product's file/sample attribute) as a binary attachment.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/products/12/downloadable/26/download" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/octet-stream" \
        -o downloaded-file.zip
    response: |
      (binary file stream — application/octet-stream attachment)
---

# Downloadable Products — Download File

Streams the stored file for a given product attribute (the file behind a downloadable product's file/sample attribute) as a binary attachment.

::: warning REST only — binary
Returns a binary stream, not JSON. Send `Accept: application/octet-stream`. No GraphQL counterpart (binary streams aren't expressible over GraphQL).
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/downloadable/{attributeId}/download` | GET |

## Path parameters

| Parameter | Type | Notes |
|-----------|------|-------|
| `productId` | integer | Product ID. |
| `attributeId` | integer | Attribute ID whose stored file path should be streamed. |

## Response

`200 OK` — the file as an `application/octet-stream` attachment.

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.view`. |
| `404 Not Found` | No stored file for the given product / attribute. |

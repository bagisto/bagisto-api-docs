---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-image-delete
    title: Delete a Product Image
    description: Deletes the DB row and removes the file from public storage.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/catalog/products/12/images/47" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "success": true,
        "message": "Product image deleted successfully."
      }
    commonErrors:
      - error: Not Found (404)
        cause: Image or its parent product not found
        solution: Verify both `{productId}` and `{id}` exist and `{id}` belongs to `{productId}`
---

# Product Images — Delete

Removes a single product image — both the DB row and the file on storage.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/images/{id}` | DELETE |

## Path parameters

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `productId` | integer | yes | Parent product ID. |
| `id` | integer | yes | Image ID — must belong to `{productId}`. |

## Response

`200 OK`

| Field | Type | Notes |
|-------|------|-------|
| `success` | bool | |
| `message` | string | |

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.edit`. |
| `404 Not Found` | Image or its parent product not found. |

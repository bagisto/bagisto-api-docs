---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-image-reorder
    title: Reorder Product Images
    description: Updates the position of one or more existing images for a product. Each image ID must belong to the product or the request is rejected.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/12/images/reorder" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "order": [
            { "id": 47, "position": 2 },
            { "id": 48, "position": 1 }
          ]
        }'
    variables: |
      {
        "order": [
          { "id": 47, "position": 2 },
          { "id": 48, "position": 1 }
        ]
      }
    response: |
      {
        "success": true,
        "message": "Product images reordered successfully.",
        "images": [
          { "id": 48, "productId": 12, "path": "product/12/xyz.webp", "position": 1, "url": "/storage/product/12/xyz.webp" },
          { "id": 47, "productId": 12, "path": "product/12/abc.webp", "position": 2, "url": "/storage/product/12/abc.webp" }
        ]
      }
    commonErrors:
      - error: Validation (422)
        cause: An image ID does not belong to the product, or the order payload is malformed
        solution: Send only image IDs that belong to `{productId}`
---

# Product Images — Reorder

Reorders the existing images of a product.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/images/reorder` | PUT |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `order` | array of `{ id, position }` | yes | Each `id` must belong to `{productId}`. |

## Response

`200 OK` — returns the full updated list of images, ordered by position.

| Field | Type | Notes |
|-------|------|-------|
| `success` | bool | |
| `message` | string | |
| `images` | array | One row per image — `id`, `productId`, `path`, `position`, `url`. |

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.edit`. |
| `422 Unprocessable Entity` | Image ID doesn't belong to the product, or `order` is malformed. |

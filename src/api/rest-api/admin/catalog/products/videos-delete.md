---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-video-delete
    title: Delete a Product Video
    description: Removes the video's DB row and its file from public storage.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/catalog/products/12/videos/8" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "id": 8,
        "success": true,
        "message": "Product video deleted successfully."
      }
---

# Product Videos — Delete

Deletes the DB row and removes the file from public storage. Also available over GraphQL as `deleteAdminCatalogProductVideo`.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/videos/{id}` | DELETE |

## Path parameters

| Parameter | Type | Notes |
|-----------|------|-------|
| `productId` | integer | Parent product ID. |
| `id` | integer | Video ID (must belong to the product). |

## Response

`200 OK` — `{ id, success, message }`.

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.edit`. |
| `404 Not Found` | Video (or its parent product) not found, or the video does not belong to the product. |

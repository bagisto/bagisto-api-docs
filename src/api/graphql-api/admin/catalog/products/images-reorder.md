---
outline: false
examples:
  - id: admin-catalog-product-image-reorder
    title: Reorder Product Images
    description: Update positions of one or more existing images for a product. Each image ID must belong to the product.
    query: |
      mutation ReorderImages($input: reorderAdminCatalogProductImageInput!) {
        reorderAdminCatalogProductImage(input: $input) {
          adminCatalogProductImage { id success message }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/12/images/reorder",
          "productId": 12,
          "order": [
            {"id": 47, "position": 2},
            {"id": 48, "position": 1}
          ]
        }
      }
    response: |
      {
        "data": {
          "reorderAdminCatalogProductImage": {
            "adminCatalogProductImage": {
              "id": "/api/admin/catalog_product_images/0",
              "success": true,
              "message": "Product images reordered successfully."
            }
          }
        }
      }
---

# Product Images — Reorder

Equivalent to [`PUT /api/admin/catalog/products/{productId}/images/reorder`](/api/rest-api/admin/catalog/products/images-reorder).

## Operation

| Operation | Type |
|-----------|------|
| `reorderAdminCatalogProductImage` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `productId` | `Int!` | yes | Parent product ID. |
| `order` | `[{ id: Int!, position: Int! }]!` | yes | Each `id` must belong to the product. |

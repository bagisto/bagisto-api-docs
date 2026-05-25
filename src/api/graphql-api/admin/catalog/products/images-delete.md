---
outline: false
examples:
  - id: admin-catalog-product-image-delete
    title: Delete a Product Image
    description: Removes the DB row and the file on storage.
    query: |
      mutation DeleteImage($input: deleteAdminCatalogProductImageInput!) {
        deleteAdminCatalogProductImage(input: $input) {
          adminCatalogProductImage { id success message }
        }
      }
    variables: |
      {
        "input": { "productId": 12, "id": "/api/admin/catalog_product_images/47" }
      }
    response: |
      {
        "data": {
          "deleteAdminCatalogProductImage": {
            "adminCatalogProductImage": {
              "id": "/api/admin/catalog_product_images/47",
              "success": true,
              "message": "Product image deleted successfully."
            }
          }
        }
      }
---

# Product Images — Delete

Equivalent to [`DELETE /api/admin/catalog/products/{productId}/images/{id}`](/api/rest-api/admin/catalog/products/images-delete).

## Operation

| Operation | Type |
|-----------|------|
| `deleteAdminCatalogProductImage` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `productId` | `Int!` | yes | Parent product ID. |
| `id` | `ID!` | yes | Image resource IRI. |

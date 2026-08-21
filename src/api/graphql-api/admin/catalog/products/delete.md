---
outline: false
examples:
  - id: admin-catalog-product-delete
    title: Delete a Catalog Product
    description: GraphQL counterpart of DELETE /api/admin/catalog/products/{id}. For configurable products, variants cascade.
    query: |
      mutation DeleteCatalogProduct($input: deleteAdminCatalogProductInput!) {
        deleteAdminCatalogProduct(input: $input) {
          adminCatalogProduct { _id }
        }
      }
    variables: |
      {
        "input": { "id": "/api/admin/catalog_products/42" }
      }
    response: |
      {
        "data": {
          "deleteAdminCatalogProduct": {
            "adminCatalogProduct": { "_id": 42 }
          }
        }
      }
---

# Catalog Product — Delete

Equivalent to [`DELETE /api/admin/catalog/products/{id}`](/api/rest-api/admin/catalog/products/delete).

The example uses an illustrative id. Replace it with a product that exists in your store — [`adminCatalogProducts`](/api/graphql-api/admin/catalog/products) lists valid ids.

## Operation

| Operation | Type |
|-----------|------|
| `deleteAdminCatalogProduct` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID! | Yes | Resource IRI of the product, `/api/admin/catalog/products/<id>`. |

## Reading the Payload

Select **only `_id`** on the delete payload. The row is already gone by the time the response serialises, so any other field — `sku`, `name`, `status` — fails to resolve and turns the whole payload into `Internal server error` in `errors[]`, even though the delete itself succeeded. Capture whatever you need with a query before deleting.

## What Deletion Does

- **Configurable variants cascade.** Deleting the parent removes its variants; there is no separate call.
- **Orders are unaffected.** Order items keep their snapshot of the product, so historic orders still render after the product is gone.
- **No in-order guard.** A product that appears in open orders deletes without complaint, matching the admin panel. If you need referential integrity, enforce it before calling.

## Errors

| Message | Cause |
|---------|-------|
| `Product not found.` | Unknown or already-deleted id |
| `You do not have permission to manage products.` | Token lacks `catalog.products.delete` |

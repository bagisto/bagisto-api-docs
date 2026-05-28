---
outline: false
examples:
  - id: admin-catalog-product-delete
    title: Delete a Catalog Product
    description: GraphQL counterpart of DELETE /api/admin/catalog/products/{id}. For configurable products, variants cascade.
    query: |
      mutation DeleteCatalogProduct($input: deleteAdminCatalogProductInput!) {
        deleteAdminCatalogProduct(input: $input) {
          adminCatalogProduct { id }
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
            "adminCatalogProduct": { "id": "/api/admin/catalog_products/42" }
          }
        }
      }
---

# Catalog Product — Delete

Equivalent to [`DELETE /api/admin/catalog/products/{id}`](/api/rest-api/admin/catalog/products/delete).

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a product that exists in your store — use the [`adminCatalogProducts`](./list.md) query to discover valid ids.
:::

## Operation

| Operation | Type |
|-----------|------|
| `deleteAdminCatalogProduct` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | `ID!` | yes | Resource IRI of the product to delete. |

::: warning No "in-order" guard (parity with monolith)
Bagisto admin does not refuse to delete products that appear in non-completed
orders — neither does this mutation.
:::

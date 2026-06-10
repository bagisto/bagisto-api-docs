---
outline: false
examples:
  - id: admin-catalog-product-copy
    title: Copy a Catalog Product
    description: Duplicates an existing product across all sub-resources. Refuses configurable variants.
    query: |
      mutation CopyProduct($input: createAdminCatalogProductCopyInput!) {
        createAdminCatalogProductCopy(input: $input) {
          adminCatalogProductCopy { id sourceId sku type name success message }
        }
      }
    variables: |
      {
        "input": { "sourceId": 12 }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProductCopy": {
            "adminCatalogProductCopy": {
              "id": "/api/admin/catalog_product_copies/43",
              "sourceId": 12,
              "sku": "SKU-001-copy-1",
              "type": "simple",
              "name": "Test SKU-001 (Copy)",
              "success": true,
              "message": "Product copied successfully."
            }
          }
        }
      }
---

# Catalog Product — Copy

Equivalent to [`POST /api/admin/catalog/products/{sourceId}/copy`](/api/rest-api/admin/catalog/products/copy).

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a product that exists in your store — use the [`adminCatalogProducts`](./list.md) query to discover valid ids.
:::

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCatalogProductCopy` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `sourceId` | `Int!` | yes | ID of the product to duplicate. |

## Notes

- Refuses variants (parent_id != null) — surfaces in `errors[]`.
- Fires `catalog.product.create.before` / `.after` on the copy.

---
outline: false
examples:
  - id: admin-catalog-product-inventories-list
    title: List Per-Source Inventory Rows
    description: Cursor connection of per-source inventory rows for a product.
    query: |
      query Inventories($productId: Int!) {
        adminCatalogProductInventories(productId: $productId) {
          id
          sourceId
          sourceCode
          sourceName
          qty
        }
      }
    variables: |
      {
        "productId": 12
      }
    response: |
      { "data": { "adminCatalogProductInventories": [ { "id": 14, "sourceId": 1, "sourceCode": "default", "sourceName": "Default", "qty": 25 } ] } }

---

# Product Inventories — List

Equivalent to [`GET /api/admin/catalog/products/{productId}/inventories`](/api/rest-api/admin/catalog/products/inventories-list).

## Operation

| Operation | Type |
|-----------|------|
| `adminCatalogProductInventories(productId: Int!)` | Query (cursor) |

## Arguments

| Arg | Type | Notes |
|-----|------|-------|
| `productId` | `Int!` | Required. |
| `first`, `after` | cursor pagination | |

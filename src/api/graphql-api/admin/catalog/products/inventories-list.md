---
outline: false
examples:
  - id: admin-catalog-product-inventories-list
    title: List Per-Source Inventory Rows
    description: Cursor connection of per-source inventory rows for a product.
    query: |
      query Inventories($productId: Int!, $first: Int) {
        adminCatalogProductInventories(productId: $productId, first: $first) {
          edges {
            node { id sourceId sourceCode sourceName qty }
          }
          totalCount
        }
      }
    variables: |
      {
        "productId": 12,
        "first": 25
      }
    response: |
      {
        "data": {
          "adminCatalogProductInventories": {
            "edges": [
              { "node": { "id": 14, "sourceId": 1, "sourceCode": "default", "sourceName": "Default", "qty": 25 } }
            ],
            "totalCount": 1
          }
        }
      }
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

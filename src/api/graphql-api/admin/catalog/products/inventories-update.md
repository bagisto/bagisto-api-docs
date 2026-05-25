---
outline: false
examples:
  - id: admin-catalog-product-inventories-update
    title: Bulk-Update Per-Source Inventory
    description: Sources with qty=0 are kept but zeroed-out; sources NOT in the payload are left untouched.
    query: |
      mutation UpdateInventories($input: updateAdminCatalogProductInventoryInput!) {
        updateAdminCatalogProductInventories(input: $input) {
          adminCatalogProductInventory { id sourceId qty }
        }
      }
    variables: |
      {
        "input": {
          "productId": 12,
          "inventories": { "1": 25, "2": 0 }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProductInventories": {
            "adminCatalogProductInventory": { "id": "/api/admin/catalog_product_inventories/14", "sourceId": 1, "qty": 25 }
          }
        }
      }
---

# Product Inventories — Bulk Update

Equivalent to [`PUT /api/admin/catalog/products/{productId}/inventories`](/api/rest-api/admin/catalog/products/inventories-update).

## Operation

| Operation | Type |
|-----------|------|
| `updateAdminCatalogProductInventories` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `productId` | `Int!` | yes | Parent product. |
| `inventories` | `Object!` | yes | Map of `inventory_source_id` → integer quantity (≥ 0). |

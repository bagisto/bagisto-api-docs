---
outline: false
examples:
  - id: admin-catalog-product-inventories-update
    title: Bulk-Update Per-Source Inventory
    description: Parent-scoped mutation. Pass a source id with a positive qty to set it, qty 0 to zero it out; sources not in the payload are left untouched. The mutation returns the updated source as a single node.
    query: |
      mutation UpdateInventories($input: updateAdminCatalogProductInventoryInput!) {
        updateAdminCatalogProductInventory(input: $input) {
          adminCatalogProductInventory {
            _id
            sourceId
            sourceCode
            sourceName
            qty
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/1/inventories",
          "productId": 1,
          "inventories": {
            "1": 33
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProductInventory": {
            "adminCatalogProductInventory": {
              "_id": 1,
              "sourceId": 1,
              "sourceCode": "default",
              "sourceName": "Default",
              "qty": 33
            }
          }
        }
      }
---

# Product Inventories — Bulk Update (GraphQL)

Sets the on-hand quantity per inventory source for a product. This is a parent-scoped mutation — pass the product as `productId` inside the input. A source id with a positive quantity is set to that value, a source id with `0` is zeroed out, and any source you leave out of the map is untouched.

The `inventories` field is a map of `inventory_source_id` (as a string key) to integer quantity. The `id` field must be a placeholder IRI (`/api/admin/catalog/products/{productId}/inventories`) — it is ignored; the product is resolved from `productId`. Select `_id` on the returned node (not `id`, since this is a parent-scoped resource with no standalone route).

The mutation returns the updated source as a single node. To read the full per-source list together with the aggregate `totalQty`, query [`adminCatalogProductInventories(productId:)`](/api/graphql-api/admin/catalog/products/inventories-list) (a connection — `edges { node { _id sourceId sourceCode sourceName qty } }`); `totalQty` is not available on the mutation result.

::: tip
See the [Products overview](/api/graphql-api/admin/catalog/products/) for how the catalog product menu fits together.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `productId` | `Int!` | yes | Parent product. |
| `inventories` | `Object!` | yes | Map of `inventory_source_id` (string key) to integer quantity (greater than or equal to 0). |
| `id` | `ID!` | yes | Placeholder IRI; ignored by the server. |

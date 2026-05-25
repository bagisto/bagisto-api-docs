---
outline: false
examples:
  - id: admin-catalog-product-mass-update-status
    title: Mass Update Catalog Product Status
    description: GraphQL counterpart of POST /api/admin/catalog/products/mass-update-status. Fires catalog.product.update.{before,after} per ID.
    query: |
      mutation MassUpdateStatus($input: createAdminCatalogProductMassUpdateStatusInput!) {
        createAdminCatalogProductMassUpdateStatus(input: $input) {
          adminCatalogProductMassUpdateStatus { id updated message }
        }
      }
    variables: |
      {
        "input": { "indices": [12, 18], "value": 1 }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProductMassUpdateStatus": {
            "adminCatalogProductMassUpdateStatus": {
              "id": "/api/admin/catalog_product_mass_update_statuses/1",
              "updated": [12, 18],
              "message": "Products status updated successfully."
            }
          }
        }
      }
---

# Catalog Products — Mass Update Status

Equivalent to [`POST /api/admin/catalog/products/mass-update-status`](/api/rest-api/admin/catalog/products/mass-update-status).

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCatalogProductMassUpdateStatus` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | `[Int!]!` | yes | Product IDs. |
| `value` | `Int!` | yes | `0` (disabled) or `1` (enabled). |

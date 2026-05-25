---
outline: false
examples:
  - id: admin-catalog-product-mass-delete
    title: Mass Delete Catalog Products
    description: GraphQL counterpart of POST /api/admin/catalog/products/mass-delete. Mirrors monolith best-effort semantics — non-existent IDs are silently skipped.
    query: |
      mutation MassDeleteProducts($input: createAdminCatalogProductMassDeleteInput!) {
        createAdminCatalogProductMassDelete(input: $input) {
          adminCatalogProductMassDelete { id deleted message }
        }
      }
    variables: |
      {
        "input": { "indices": [12, 18] }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProductMassDelete": {
            "adminCatalogProductMassDelete": {
              "id": "/api/admin/catalog_product_mass_deletes/1",
              "deleted": [12, 18],
              "message": "Products deleted successfully."
            }
          }
        }
      }
---

# Catalog Products — Mass Delete

Equivalent to [`POST /api/admin/catalog/products/mass-delete`](/api/rest-api/admin/catalog/products/mass-delete).

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCatalogProductMassDelete` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | `[Int!]!` | yes | Non-empty array of product IDs. |

## Errors

Surfaced in GraphQL `errors[]`. Underlying delete exceptions become errors that mirror the REST 500 path.

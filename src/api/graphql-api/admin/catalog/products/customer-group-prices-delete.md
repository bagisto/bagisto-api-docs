---
outline: false
examples:
  - id: admin-catalog-product-cgp-delete
    title: Delete a Customer-Group Price
    description: Deletes a single tier-price row and echoes a snapshot of the row as it was just before deletion. Pass the product as productId and the row IRI as input.id.
    query: |
      mutation DeleteCGP($input: deleteAdminCatalogProductCustomerGroupPriceInput!, $productId: Int!) {
        deleteAdminCatalogProductCustomerGroupPrice(input: $input, productId: $productId) {
          adminCatalogProductCustomerGroupPrice {
            _id
            productId
            qty
            valueType
            value
            customerGroupId
            customerGroupName
          }
        }
      }
    variables: |
      {
        "productId": 1,
        "input": {
          "id": "/api/admin/catalog/products/1/customer-group-prices/12"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminCatalogProductCustomerGroupPrice": {
            "adminCatalogProductCustomerGroupPrice": {
              "_id": 12,
              "productId": 1,
              "qty": 5,
              "valueType": "fixed",
              "value": 90.0,
              "customerGroupId": 2,
              "customerGroupName": "Wholesale"
            }
          }
        }
      }
---

# Product Customer-Group Prices — Delete (GraphQL)

Removes one customer-group (tier) price row from a product. This is a parent-scoped mutation — pass the product as the `productId` argument and the row IRI as `input.id`. The row must belong to the named product. The mutation echoes a snapshot of the row as it was just before deletion — select `_id` (not `id`, since this is a parent-scoped resource with no standalone route).

::: tip
See the [Products overview](/api/graphql-api/admin/catalog/products/) for how the catalog product menu fits together.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `productId` | `Int!` | yes | Argument — parent product. |
| `id` | `ID!` | yes | Tier-price row IRI. |

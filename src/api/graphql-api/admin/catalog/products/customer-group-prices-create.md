---
outline: false
examples:
  - id: admin-catalog-product-cgp-create
    title: Add a Customer-Group Price
    description: "Adds a new tier-price row to a product. A null customerGroupId makes the price apply to every group."
    query: |
      mutation AddCGP($input: createAdminCatalogProductCustomerGroupPriceInput!, $productId: Int!) {
        createAdminCatalogProductCustomerGroupPrice(input: $input, productId: $productId) {
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
          "qty": 5,
          "valueType": "fixed",
          "value": 90.0,
          "customerGroupId": 2
        }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProductCustomerGroupPrice": {
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

# Product Customer-Group Prices — Create (GraphQL)

Adds a new customer-group (tier) price to a product. This is a parent-scoped mutation — pass the product as the `productId` argument alongside the input. The combination of `qty` and `customerGroupId` must be unique for the product. A `null` `customerGroupId` makes the price apply to every customer group.

`valueType` is `fixed` (a flat price at that quantity) or `discount` (a discount off the base price).

::: tip
See the [Products overview](/api/graphql-api/admin/catalog/products/) for how the catalog product menu fits together.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `productId` | `Int!` | yes | Argument — parent product. |
| `qty` | `Int!` | yes | Quantity threshold (greater than or equal to 1). |
| `valueType` | `String!` | yes | `fixed` or `discount`. |
| `value` | `Float!` | yes | Price or discount value. |
| `customerGroupId` | `Int` | no | `null` applies the price to every group. |

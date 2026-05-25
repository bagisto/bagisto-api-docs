---
outline: false
examples:
  - id: admin-catalog-product-cgp-create
    title: Add a Customer-Group Price
    description: "Adds a new tier-price row to a product. `customer_group_id: null` makes it apply to every group."
    query: |
      mutation AddCGP($input: createAdminCatalogProductCustomerGroupPriceInput!, $productId: Int!) {
        createAdminCatalogProductCustomerGroupPrice(input: $input, productId: $productId) {
          adminCatalogProductCustomerGroupPrice { id qty valueType value customerGroupId productId }
        }
      }
    variables: |
      {
        "productId": 1,
        "input": { "qty": 10, "value_type": "discount", "value": 15.0, "customer_group_id": 2 }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProductCustomerGroupPrice": {
            "adminCatalogProductCustomerGroupPrice": {
              "id": "/api/admin/catalog_product_customer_group_prices/12",
              "qty": 10, "valueType": "discount", "value": 15.0, "customerGroupId": 2, "productId": 1
            }
          }
        }
      }
---

# Product Customer-Group Prices — Create

Equivalent to [`POST /api/admin/catalog/products/{productId}/customer-group-prices`](/api/rest-api/admin/catalog/products/customer-group-prices-create).

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCatalogProductCustomerGroupPrice` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `productId` | `Int!` | yes | Extra arg — parent product. |
| `qty` | `Int!` | yes | ≥ 1. |
| `value_type` | `String!` | yes | `fixed` or `discount`. |
| `value` | `Float!` | yes | |
| `customer_group_id` | `Int` | no | `null` = applies to every group. |

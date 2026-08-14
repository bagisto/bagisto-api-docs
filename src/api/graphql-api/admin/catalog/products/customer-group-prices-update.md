---
outline: false
examples:
  - id: admin-catalog-product-cgp-update
    title: Update a Customer-Group Price
    description: Partially updates a tier-price row. Pass only the fields you change.
    query: |
      mutation UpdateCGP($input: updateAdminCatalogProductCustomerGroupPriceInput!, $productId: Int!) {
        updateAdminCatalogProductCustomerGroupPrice(input: $input, productId: $productId) {
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
          "id": "/api/admin/catalog/products/1/customer-group-prices/12",
          "qty": 5,
          "value": 17.5,
          "valueType": "fixed",
          "customerGroupId": null
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProductCustomerGroupPrice": {
            "adminCatalogProductCustomerGroupPrice": {
              "_id": 12,
              "productId": 1,
              "qty": 5,
              "valueType": "fixed",
              "value": 17.5,
              "customerGroupId": null,
              "customerGroupName": null
            }
          }
        }
      }
---

# Product Customer-Group Prices — Update (GraphQL)

Updates an existing customer-group (tier) price row. This is a parent-scoped mutation — pass the product as the `productId` argument and the row IRI as `input.id`. Send only the fields you want to change. The new `qty` / `customerGroupId` combination must remain unique for the product. A `null` `customerGroupId` makes the price apply to every customer group.

See the [Products overview](/api/graphql-api/admin/catalog/products/) for how the catalog product menu fits together.

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `productId` | `Int!` | yes | Argument — parent product. |
| `id` | `ID!` | yes | Tier-price row IRI. |
| `qty` | `Int` | no | Quantity threshold (greater than or equal to 1). |
| `valueType` | `String` | no | `fixed` or `discount`. |
| `value` | `Float` | no | Price or discount value. |
| `customerGroupId` | `Int` | no | `null` applies the price to every group. |

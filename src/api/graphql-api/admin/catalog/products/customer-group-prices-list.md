---
outline: false
examples:
  - id: admin-catalog-product-cgp-list
    title: List Customer-Group (Tier) Prices
    description: Plain list of the tier-price rows attached to a product.
    query: |
      query CGP($productId: Int!) {
        adminCatalogProductCustomerGroupPrices(productId: $productId) {
          _id
          productId
          qty
          valueType
          value
          customerGroupId
          customerGroupName
        }
      }
    variables: |
      {
        "productId": 1
      }
    response: |
      {
        "data": {
          "adminCatalogProductCustomerGroupPrices": [
            {
              "_id": 12,
              "productId": 1,
              "qty": 5,
              "valueType": "fixed",
              "value": 90.0,
              "customerGroupId": 2,
              "customerGroupName": "Wholesale"
            },
            {
              "_id": 13,
              "productId": 1,
              "qty": 20,
              "valueType": "discount",
              "value": 15.0,
              "customerGroupId": null,
              "customerGroupName": null
            }
          ]
        }
      }
---

# Product Customer-Group Prices — List (GraphQL)

Returns every customer-group (tier) price attached to a product as a plain list — select the fields you need directly on each row (no `edges { node { … } }` wrapping). Each row carries the quantity threshold, the discount kind (`valueType`), the discount value, and the customer group it targets. A row with a `null` `customerGroupId` (and `null` `customerGroupName`) applies to every group.

The `productId` argument is the parent product.

::: tip
See the [Products overview](/api/graphql-api/admin/catalog/products/) for how the catalog product menu fits together.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

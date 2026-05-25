---
outline: false
examples:
  - id: admin-catalog-product-cgp-list
    title: List Customer-Group (Tier) Prices
    description: Cursor connection of tier-price rows attached to a product.
    query: |
      query CGP($productId: Int!) {
        adminCatalogProductCustomerGroupPrices(productId: $productId) {
          edges {
            node { id qty valueType value customerGroupId customerGroupName productId }
          }
          totalCount
        }
      }
    variables: |
      {
        "productId": 1
      }
    response: |
      {
        "data": {
          "adminCatalogProductCustomerGroupPrices": {
            "edges": [
              { "node": { "id": 12, "qty": 1, "valueType": "fixed", "value": 19.99, "customerGroupId": 2, "customerGroupName": "Wholesale", "productId": 1 } }
            ],
            "totalCount": 1
          }
        }
      }
---

# Product Customer-Group Prices — List

Equivalent to [`GET /api/admin/catalog/products/{productId}/customer-group-prices`](/api/rest-api/admin/catalog/products/customer-group-prices-list).

## Operation

| Operation | Type |
|-----------|------|
| `adminCatalogProductCustomerGroupPrices(productId: Int!)` | Query |

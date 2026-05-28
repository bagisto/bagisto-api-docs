---
outline: false
examples:
  - id: admin-catalog-product-cgp-list
    title: List Customer-Group (Tier) Prices
    description: Cursor connection of tier-price rows attached to a product.
    query: |
      query CGP($productId: Int!) {
        adminCatalogProductCustomerGroupPrices(productId: $productId) {
          id
          qty
          valueType
          value
          customerGroupId
          customerGroupName
          productId
        }
      }
    variables: |
      {
        "productId": 1
      }
    response: |
      { "data": { "adminCatalogProductCustomerGroupPrices": [ { "id": 12, "qty": 5, "valueType": "discount", "value": 10, "customerGroupId": 2, "customerGroupName": "Wholesale", "productId": 1 } ] } }

---

# Product Customer-Group Prices — List

Equivalent to [`GET /api/admin/catalog/products/{productId}/customer-group-prices`](/api/rest-api/admin/catalog/products/customer-group-prices-list).

## Operation

| Operation | Type |
|-----------|------|
| `adminCatalogProductCustomerGroupPrices(productId: Int!)` | Query |

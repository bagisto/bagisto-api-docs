---
outline: false
examples:
  - id: admin-catalog-product-cgp-update
    title: Update a Customer-Group Price
    description: Partially updates a tier-price row.
    query: |
      mutation UpdateCGP($input: updateAdminCatalogProductCustomerGroupPriceInput!, $productId: Int!) {
        updateAdminCatalogProductCustomerGroupPrice(input: $input, productId: $productId) {
          adminCatalogProductCustomerGroupPrice { id qty valueType value customerGroupId }
        }
      }
    variables: |
      {
        "productId": 1,
        "input": { "id": "/api/admin/catalog_product_customer_group_prices/12", "qty": 5, "value": 17.5, "value_type": "fixed" }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProductCustomerGroupPrice": {
            "adminCatalogProductCustomerGroupPrice": {
              "id": "/api/admin/catalog_product_customer_group_prices/12",
              "qty": 5, "valueType": "fixed", "value": 17.5, "customerGroupId": null
            }
          }
        }
      }
---

# Product Customer-Group Prices — Update

Equivalent to [`PUT …/customer-group-prices/{id}`](/api/rest-api/admin/catalog/products/customer-group-prices-update).

## Operation

| Operation | Type |
|-----------|------|
| `updateAdminCatalogProductCustomerGroupPrice` | Mutation |

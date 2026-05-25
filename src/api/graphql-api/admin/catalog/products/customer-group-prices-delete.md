---
outline: false
examples:
  - id: admin-catalog-product-cgp-delete
    title: Delete a Customer-Group Price
    description: Deletes a single tier-price row.
    query: |
      mutation DeleteCGP($input: deleteAdminCatalogProductCustomerGroupPriceInput!, $productId: Int!) {
        deleteAdminCatalogProductCustomerGroupPrice(input: $input, productId: $productId) {
          adminCatalogProductCustomerGroupPrice { id }
        }
      }
    variables: |
      {
        "productId": 1,
        "input": { "id": "/api/admin/catalog_product_customer_group_prices/12" }
      }
    response: |
      {
        "data": {
          "deleteAdminCatalogProductCustomerGroupPrice": {
            "adminCatalogProductCustomerGroupPrice": { "id": "/api/admin/catalog_product_customer_group_prices/12" }
          }
        }
      }
---

# Product Customer-Group Prices — Delete

Equivalent to [`DELETE …/customer-group-prices/{id}`](/api/rest-api/admin/catalog/products/customer-group-prices-delete).

## Operation

| Operation | Type |
|-----------|------|
| `deleteAdminCatalogProductCustomerGroupPrice` | Mutation |

---
outline: false
examples:
  - id: gql
    title: Reporting — Products
    query: |
      query AdminReportingProducts($type: String) {
        statsAdminReportingProducts(type: $type) {
          edges { node { entity type dateRange statistics } }
        }
      }
    variables: |
      { "type": "top-selling-products-by-revenue" }
    response: |
      { "data": { "statsAdminReportingProducts": { "edges": [{ "node": { "entity": "products", "type": "top-selling-products-by-revenue", "dateRange": "25 Apr - 25 May", "statistics": {} } }] } } }
---

# Reporting — Products (GraphQL)

Query: `statsAdminReportingProducts`.

`type` values: `total-sold-quantities` (default), `total-products-added-to-wishlist`, `top-selling-products-by-revenue`, `top-selling-products-by-quantity`, `products-with-most-reviews`, `products-with-most-visits`, `last-search-terms`, `top-search-terms`.

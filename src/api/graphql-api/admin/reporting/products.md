---
outline: false
examples:
  - id: gql
    title: Reporting — Products
    query: |
      query AdminReportingProducts($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingProducts(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "total-sold-quantities" }
    response: |
      {
        "data": {
          "statsAdminReportingProducts": {
            "entity": "products",
            "type": "total-sold-quantities",
            "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
            "statistics": {
              "quantities": { "previous": 82, "current": 13, "progress": -84.15 },
              "over_time": {
                "previous": [ { "label": "10 Apr", "total": 21 } ],
                "current": [ { "label": "10 May", "total": 5 } ]
              }
            }
          }
        }
      }
  - id: gql-filtered
    title: Reporting — Products (Filtered by date + channel)
    query: |
      query AdminReportingProducts($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingProducts(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "total-sold-quantities", "start": "2026-05-10", "end": "2026-06-09", "channel": "default" }
    response: |
      {
        "data": {
          "statsAdminReportingProducts": {
            "entity": "products",
            "type": "total-sold-quantities",
            "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
            "statistics": {
              "quantities": { "previous": 82, "current": 13, "progress": -84.15 },
              "over_time": {
                "previous": [ { "label": "10 Apr", "total": 21 } ],
                "current": [ { "label": "10 May", "total": 5 } ]
              }
            }
          }
        }
      }
  - id: gql-view
    title: Reporting — Products (View Details)
    query: |
      query AdminReportingProductsView($type: String, $start: String, $end: String, $channel: String) {
        viewStatsAdminReportingProducts(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "top-selling-products-by-revenue" }
    response: |
      { "data": { "viewStatsAdminReportingProducts": { "entity": "products", "type": "top-selling-products-by-revenue", "dateRange": { "previous": "25 Mar - 24 Apr", "current": "25 Apr - 25 May" }, "statistics": { "columns": [{ "key": "name", "label": "Product" }, { "key": "sku", "label": "SKU" }, { "key": "revenue", "label": "Revenue" }], "records": [{ "name": "Wireless Headphones", "sku": "WH-100", "revenue": "$6,420.00" }, { "name": "Cotton T-Shirt", "sku": "CT-220", "revenue": "$3,980.50" }] } } } }

---

# Reporting — Products (GraphQL)

Query: `statsAdminReportingProducts`.

`type` values: `total-sold-quantities` (default), `total-products-added-to-wishlist`, `top-selling-products-by-revenue`, `top-selling-products-by-quantity`, `products-with-most-reviews`, `products-with-most-visits`, `last-search-terms`, `top-search-terms`.

## View Details

`viewStatsAdminReportingProducts` is the detailed table form of the matching `statsAdminReportingProducts` query — its `statistics` carries `columns` (`{ key, label }`) and `records` (the row data behind a panel's **View Details** link), rather than the rolled-up headline figures.

The CSV **Export** is REST only (a binary `text/csv` download); there is no GraphQL equivalent.

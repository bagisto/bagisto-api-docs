---
outline: false
examples:
  - id: gql
    title: Reporting — Customers
    query: |
      query AdminReportingCustomers($type: String) {
        statsAdminReportingCustomers(type: $type) {
          edges { node { entity type dateRange statistics } }
        }
      }
    variables: |
      { "type": "total-customers" }
    response: |
      { "data": { "statsAdminReportingCustomers": { "edges": [{ "node": { "entity": "customers", "type": "total-customers", "dateRange": "25 Apr - 25 May", "statistics": {} } }] } } }
---

# Reporting — Customers (GraphQL)

Query: `statsAdminReportingCustomers`.

`type` values: `total-customers` (default), `customers-traffic`, `customers-with-most-sales`, `customers-with-most-orders`, `customers-with-most-reviews`, `top-customer-groups`.

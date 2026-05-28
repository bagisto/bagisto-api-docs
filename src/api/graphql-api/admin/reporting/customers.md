---
outline: false
examples:
  - id: gql
    title: Reporting — Customers
    query: |
      query AdminReportingCustomers($type: String) {
        statsAdminReportingCustomers(type: $type) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "total-customers" }
    response: |
      { "data": { "statsAdminReportingCustomers": { "entity": "customers", "type": "total-customers", "dateRange": { "previous": "...", "current": "..." }, "statistics": {} } } }

---

# Reporting — Customers (GraphQL)

Query: `statsAdminReportingCustomers`.

`type` values: `total-customers` (default), `customers-traffic`, `customers-with-most-sales`, `customers-with-most-orders`, `customers-with-most-reviews`, `top-customer-groups`.

---
outline: false
examples:
  - id: gql
    title: Reporting Overview
    query: |
      query AdminReportingOverview($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingOverview(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "total-sales" }
    response: |
      { "data": { "statsAdminReportingOverview": { "entity": "customers", "type": "total-customers", "dateRange": { "previous": "...", "current": "..." }, "statistics": {} } } }

---

# Reporting — Overview (GraphQL)

Query: `statsAdminReportingOverview`.

Arguments: `type` (`total-sales` default, `total-orders`, `total-customers`, `top-selling-products-by-revenue`), `start`, `end`, `channel`.

`statistics` is a free-form scalar; its shape depends on `type`.

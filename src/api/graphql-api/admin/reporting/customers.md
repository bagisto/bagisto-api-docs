---
outline: false
examples:
  - id: gql
    title: Reporting — Customers
    query: |
      query AdminReportingCustomers($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingCustomers(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "total-customers" }
    response: |
      {
        "data": {
          "statsAdminReportingCustomers": {
            "entity": "customers",
            "type": "total-customers",
            "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
            "statistics": {
              "customers": { "previous": 1, "current": 9, "progress": 800 },
              "over_time": {
                "previous": [ { "label": "23 May", "total": 1 } ],
                "current": [ { "label": "26 May", "total": 9 } ]
              }
            }
          }
        }
      }
  - id: gql-filtered
    title: Reporting — Customers (Filtered by date + channel)
    query: |
      query AdminReportingCustomers($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingCustomers(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "total-customers", "start": "2026-05-10", "end": "2026-06-09", "channel": "default" }
    response: |
      {
        "data": {
          "statsAdminReportingCustomers": {
            "entity": "customers",
            "type": "total-customers",
            "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
            "statistics": {
              "customers": { "previous": 1, "current": 9, "progress": 800 },
              "over_time": {
                "previous": [ { "label": "23 May", "total": 1 } ],
                "current": [ { "label": "26 May", "total": 9 } ]
              }
            }
          }
        }
      }
  - id: gql-view
    title: Reporting — Customers (View Details)
    query: |
      query AdminReportingCustomersView($type: String, $start: String, $end: String, $channel: String) {
        viewStatsAdminReportingCustomers(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "customers-with-most-sales" }
    response: |
      { "data": { "viewStatsAdminReportingCustomers": { "entity": "customers", "type": "customers-with-most-sales", "dateRange": { "previous": "25 Mar - 24 Apr", "current": "25 Apr - 25 May" }, "statistics": { "columns": [{ "key": "name", "label": "Customer" }, { "key": "email", "label": "Email" }, { "key": "total", "label": "Total Sales" }], "records": [{ "name": "Jane Cooper", "email": "jane@example.com", "total": "$4,820.00" }, { "name": "Devon Lane", "email": "devon@example.com", "total": "$3,150.50" }] } } } }

---

# Reporting — Customers (GraphQL)

Query: `statsAdminReportingCustomers`.

`type` values: `total-customers` (default), `customers-traffic`, `customers-with-most-sales`, `customers-with-most-orders`, `customers-with-most-reviews`, `top-customer-groups`.

## View Details

`viewStatsAdminReportingCustomers` is the detailed table form of the matching `statsAdminReportingCustomers` query — its `statistics` carries `columns` (`{ key, label }`) and `records` (the row data behind a panel's **View Details** link), rather than the rolled-up headline figures.

The CSV **Export** is REST only (a binary `text/csv` download); there is no GraphQL equivalent.

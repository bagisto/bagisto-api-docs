---
outline: false
examples:
  - id: gql
    title: Reporting — Sales
    query: |
      query AdminReportingSales($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingSales(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "total-sales" }
    response: |
      {
        "data": {
          "statsAdminReportingSales": {
            "entity": "sales",
            "type": "total-sales",
            "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
            "statistics": {
              "sales": { "previous": 27243.5, "current": 9697.53, "formatted_total": "$9,697.53", "progress": -64.32 },
              "over_time": {
                "previous": [ { "label": "10 Apr", "total": 4200, "count": 6 } ],
                "current": [ { "label": "10 May", "total": 8500, "count": 12 } ]
              }
            }
          }
        }
      }
  - id: gql-filtered
    title: Reporting — Sales (Filtered by date + channel)
    query: |
      query AdminReportingSales($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingSales(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "total-sales", "start": "2026-05-10", "end": "2026-06-09", "channel": "default" }
    response: |
      {
        "data": {
          "statsAdminReportingSales": {
            "entity": "sales",
            "type": "total-sales",
            "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
            "statistics": {
              "sales": { "previous": 27243.5, "current": 9697.53, "formatted_total": "$9,697.53", "progress": -64.32 },
              "over_time": {
                "previous": [ { "label": "10 Apr", "total": 4200, "count": 6 } ],
                "current": [ { "label": "10 May", "total": 8500, "count": 12 } ]
              }
            }
          }
        }
      }
  - id: gql-view
    title: Reporting — Sales (View Details)
    query: |
      query AdminReportingSalesView($type: String, $start: String, $end: String, $channel: String) {
        viewStatsAdminReportingSales(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "total-sales" }
    response: |
      { "data": { "viewStatsAdminReportingSales": { "entity": "sales", "type": "total-sales", "dateRange": { "previous": "25 Mar - 24 Apr", "current": "25 Apr - 25 May" }, "statistics": { "columns": [{ "key": "date", "label": "Date" }, { "key": "total", "label": "Total" }], "records": [{ "date": "2026-04-25", "total": "$1,240.00" }, { "date": "2026-04-26", "total": "$980.50" }] } } } }

---

# Reporting — Sales (GraphQL)

Query: `statsAdminReportingSales`.

`type` values: `total-sales` (default), `average-sales`, `total-orders`, `purchase-funnel`, `abandoned-carts`, `refunds`, `tax-collected`, `shipping-collected`, `top-payment-methods`.

## View Details

`viewStatsAdminReportingSales` is the detailed table form of the matching `statsAdminReportingSales` query — its `statistics` carries `columns` (`{ key, label }`) and `records` (the row data behind a panel's **View Details** link), rather than the rolled-up headline figures.

The CSV **Export** is REST only (a binary `text/csv` download); there is no GraphQL equivalent.

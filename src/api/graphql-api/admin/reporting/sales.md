---
outline: false
examples:
  - id: gql
    title: Reporting — Sales
    query: |
      query AdminReportingSales($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingSales(type: $type, start: $start, end: $end, channel: $channel) {
          edges { node { entity type dateRange statistics } }
        }
      }
    variables: |
      { "type": "total-sales" }
    response: |
      { "data": { "statsAdminReportingSales": { "edges": [{ "node": { "entity": "sales", "type": "total-sales", "dateRange": "25 Apr - 25 May", "statistics": {} } }] } } }
---

# Reporting — Sales (GraphQL)

Query: `statsAdminReportingSales`.

`type` values: `total-sales` (default), `average-sales`, `total-orders`, `purchase-funnel`, `abandoned-carts`, `refunds`, `tax-collected`, `shipping-collected`, `top-payment-methods`.

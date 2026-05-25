---
outline: false
examples:
  - id: gql
    title: Dashboard Statistics
    query: |
      query AdminDashboard($type: String, $start: String, $end: String, $channel: String) {
        statsAdminDashboard(type: $type, start: $start, end: $end, channel: $channel) {
          edges { node { type dateRange statistics } }
        }
      }
    variables: |
      { "type": "over-all", "start": "2026-04-25", "end": "2026-05-25" }
    response: |
      { "data": { "statsAdminDashboard": { "edges": [{ "node": { "type": "over-all", "dateRange": "25 Apr - 25 May", "statistics": { "total_customers": { "previous": 12, "current": 18, "progress": 50 }, "total_orders": { "previous": 32, "current": 41, "progress": 28.13 } } } }] } } }
---

# Dashboard Statistics (GraphQL)

Query: `statsAdminDashboard`.

Arguments: `type` (String), `start` (String YYYY-MM-DD), `end` (String YYYY-MM-DD), `channel` (String).

The `statistics` payload is a free-form scalar — its shape depends on the chosen `type`. Mirrors `Webkul\Admin\Helpers\Dashboard` helper-method output.

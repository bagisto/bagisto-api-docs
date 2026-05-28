---
outline: false
examples:
  - id: gql
    title: Dashboard Statistics
    query: |
      query AdminDashboard($type: String, $start: String, $end: String, $channel: String) {
        statsAdminDashboard(type: $type, start: $start, end: $end, channel: $channel) {
          type
          dateRange
          statistics
        }
      }
    variables: |
      { "type": "over-all", "start": "2026-04-25", "end": "2026-05-25" }
    response: |
      { "data": { "statsAdminDashboard": { "type": "over-all", "dateRange": "25 Apr - 25 May", "statistics": {} } } }

---

# Dashboard Statistics (GraphQL)

Query: `statsAdminDashboard`.

Arguments: `type` (String), `start` (String YYYY-MM-DD), `end` (String YYYY-MM-DD), `channel` (String).

The `statistics` payload is a free-form scalar — its shape depends on the chosen `type`. Mirrors `Webkul\Admin\Helpers\Dashboard` helper-method output.

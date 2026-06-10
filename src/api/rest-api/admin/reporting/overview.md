---
outline: false
apiType: rest
examples:
  - id: admin-reporting-overview
    title: Reporting Overview
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/stats?type=total-sales&start=2026-04-01&end=2026-04-30" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "entity": "overview",
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
      ]
  - id: admin-reporting-overview-filtered
    title: Reporting Overview (Filtered by date + channel)
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/stats?type=total-sales&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "entity": "overview",
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
      ]
---

# Reporting — Overview

| Endpoint | Method |
|----------|--------|
| `/api/admin/reporting/stats` | GET |

The Overview endpoint returns a single headline figure across the whole store for the chosen `type`. It is an API convenience aggregation — there is **no** matching "Overview" screen in the admin panel (the admin Reporting menu goes straight to Sales / Customers / Products). Use it to fetch one top-line number without having to call the per-section endpoints.

The `type` argument picks which headline you get back:

- `total-sales` (default) — total revenue for the period.
- `total-orders` — number of orders placed.
- `total-customers` — number of new customers.
- `top-selling-products-by-revenue` — the best-selling product by revenue.

The `statistics` object carries a previous-vs-current comparison plus a `progress` percentage (how the current window compares to the previous one), and for time-based types an `over_time` series of per-day data points for charting. `dateRange` reports the two comparison windows — `current` is the window you asked for, `previous` is the equal-length window immediately before it.

Unlike the Sales / Customers / Products pages, the Overview endpoint has **no View Details and no Export** — it is a top-line summary only.

## Query Parameters

| Param | Type | Notes |
|-------|------|-------|
| `type` | enum | `total-sales` (default), `total-orders`, `total-customers`, `top-selling-products-by-revenue`. |
| `start` | date | Start of the reporting window (`YYYY-MM-DD`). |
| `end` | date | End of the reporting window (`YYYY-MM-DD`). |
| `channel` | string | Channel code (e.g. `default`) — scopes the figures to one storefront channel. |

Reporting requires only authentication; there is no permission gate.

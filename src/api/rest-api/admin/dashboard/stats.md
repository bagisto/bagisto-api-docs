---
outline: false
apiType: rest
examples:
  - id: admin-dashboard-stats
    title: Dashboard Statistics
    query: |
      curl -X GET "https://your-domain.com/api/admin/dashboard/stats?type=over-all&start=2026-04-25&end=2026-05-25" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      [{ "type": "over-all", "dateRange": "25 Apr - 25 May", "statistics": { "total_customers": { "previous": 12, "current": 18, "progress": 50 }, "total_orders": { "previous": 32, "current": 41, "progress": 28.13 }, "total_sales": { "previous": { "price": 1200 }, "current": { "price": 1900 }, "progress": 58.33 }, "avg_sales": { "previous": { "price": 37.5 }, "current": { "price": 46.3 }, "progress": 23.46 }, "total_unpaid_invoices": { "total": 250, "formatted_total": "$250.00" } } }]
---

# Dashboard Statistics

| Endpoint | Method |
|----------|--------|
| `/api/admin/dashboard/stats` | GET |

Returns aggregate stats from `Webkul\Admin\Helpers\Dashboard`. The `?type=` query param selects the stat group; the helper's aggregate output is returned verbatim.

## Query Parameters

| Param | Type | Notes |
|-------|------|-------|
| `type` | enum | `over-all` (default), `today`, `stock-threshold-products`, `total-sales`, `total-visitors`, `top-selling-products`, `top-customers`. |
| `start` | date (YYYY-MM-DD) | Lower bound. Defaults to 30 days ago. |
| `end` | date | Upper bound. Defaults to today. |
| `channel` | string | Channel code filter. |

## Response Shape

Each row carries `type`, `dateRange`, and `statistics` — a free-form object whose keys depend on `type`. The example above shows the `over-all` payload.

::: warning Helper-method output
The `statistics` object is the aggregate output of the `Dashboard` helper. Field names depend on the chosen `type`; refer to the helper methods for exhaustive shapes.
:::

---
outline: false
apiType: rest
examples:
  - id: admin-reporting-overview
    title: Reporting Overview
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/stats?type=total-sales&start=2026-04-01&end=2026-04-30" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      [{ "entity": "overview", "type": "total-sales", "dateRange": "01 Apr - 30 Apr", "statistics": {} }]
---

# Reporting — Overview

| Endpoint | Method |
|----------|--------|
| `/api/admin/reporting/stats` | GET |

Mirrors `Reporting\Controller::stats()`. Aggregate headline stats across sales/customers/products.

## Query Parameters

| Param | Type | Notes |
|-------|------|-------|
| `type` | enum | `total-sales` (default), `total-orders`, `total-customers`, `top-selling-products-by-revenue`. |
| `start` | date | Start date. |
| `end` | date | End date. |
| `channel` | string | Channel code. |

::: warning Helper-method output
The `statistics` object is the raw aggregate output of the reporting helper; its shape depends on `type`.
:::

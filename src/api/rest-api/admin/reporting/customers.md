---
outline: false
apiType: rest
examples:
  - id: admin-reporting-customers
    title: Reporting — Customers
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/customers?type=total-customers" \
        -H "Authorization: Bearer <token>"
    response: |
      [{ "entity": "customers", "type": "total-customers", "dateRange": "25 Apr - 25 May", "statistics": {} }]
---

# Reporting — Customers

| Endpoint | Method |
|----------|--------|
| `/api/admin/reporting/customers` | GET |

Mirrors `Reporting\CustomerController::stats()`.

## Query Parameters

| Param | Type | Notes |
|-------|------|-------|
| `type` | enum | `total-customers` (default), `customers-traffic`, `customers-with-most-sales`, `customers-with-most-orders`, `customers-with-most-reviews`, `top-customer-groups`. |
| `start` | date | Start date. |
| `end` | date | End date. |
| `channel` | string | Channel code. |

::: warning Helper-method output
`statistics` shape depends on the chosen `type`.
:::

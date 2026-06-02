---
outline: false
apiType: rest
examples:
  - id: admin-reporting-sales
    title: Reporting — Sales
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=total-sales" \
        -H "Authorization: Bearer <token>"
    response: |
      [{ "entity": "sales", "type": "total-sales", "dateRange": "25 Apr - 25 May", "statistics": {} }]
---

# Reporting — Sales

| Endpoint | Method |
|----------|--------|
| `/api/admin/reporting/sales` | GET |

Mirrors `Reporting\SaleController::stats()`.

## Query Parameters

| Param | Type | Notes |
|-------|------|-------|
| `type` | enum | `total-sales` (default), `average-sales`, `total-orders`, `purchase-funnel`, `abandoned-carts`, `refunds`, `tax-collected`, `shipping-collected`, `top-payment-methods`. |
| `start` | date | Start date. |
| `end` | date | End date. |
| `channel` | string | Channel code. |

::: warning Helper-method output
`statistics` payload is the raw helper aggregate keyed to the chosen `type`.
:::

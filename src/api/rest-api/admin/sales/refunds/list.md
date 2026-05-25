---
outline: false
apiType: rest
examples:
  - id: admin-refunds-list
    title: List Refunds (Datagrid)
    description: DataGrid-parity listing of every refund across all orders.
    query: |
      curl -X GET "https://your-domain.com/api/admin/refunds?per_page=10" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 3,
            "orderId": 8,
            "orderIncrementId": "00000000008",
            "state": "refunded",
            "baseGrandTotal": 49.50,
            "formattedBaseGrandTotal": "$49.50",
            "billedTo": "John Doe",
            "createdAt": "2026-05-20 14:00:00"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Refunds (Datagrid)

Mirrors the admin **Sales → Refunds** datagrid.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/refunds` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination (default `per_page=10`, cap `50`). |
| `id` | string | Filter by refund id (int or comma-list). |
| `order_id` | string | Partial match on `orders.increment_id`. |
| `state` | string | Refund state. |
| `base_grand_total_from` / `_to` | number | Refund amount range. |
| `billed_to` | string | Partial billing-address full-name match. |
| `created_at_from` / `_to` | date | Created range. |
| `sort` | string | `id`, `order_id`, `state`, `base_grand_total`, `billed_to`, `created_at`. |
| `order` | string | `asc`, `desc`. |

## Permission

`sales.refunds.view`

::: info
Refund **detail**, **create**, and **preview** live under [Orders](/api/rest-api/admin/sales/orders/get-refund).
:::

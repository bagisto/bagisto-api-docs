---
outline: false
apiType: rest
examples:
  - id: admin-invoices-list
    title: List Invoices (Datagrid)
    description: Paginated invoices listing mirroring the admin Sales → Invoices datagrid. Returns a `{ data, meta }` envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/invoices?per_page=10&state=paid" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "data": [
          {
            "id": 12,
            "incrementId": "12",
            "orderId": 8,
            "orderIncrementId": "00000000008",
            "state": "paid",
            "baseGrandTotal": 99.99,
            "formattedBaseGrandTotal": "$99.99",
            "createdAt": "2026-05-20 12:34:56"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Invoices (Datagrid)

DataGrid-parity listing of every invoice across all orders. Mirrors the admin
**Sales → Invoices** screen.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/invoices` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (1-based). |
| `per_page` | integer | Items per page (default `10`, cap `50`). |
| `id` | string | Filter by invoice id (integer or comma-separated list). |
| `order_id` | string | Partial match on `orders.increment_id`. |
| `state` | string | `pending`, `pending_payment`, `paid`, `overdue`, `refunded`. |
| `base_grand_total_from` | number | Min grand total. |
| `base_grand_total_to` | number | Max grand total. |
| `created_at_from` | date | Created after (ISO date). |
| `created_at_to` | date | Created before (ISO date). |
| `sort` | string | `id` (default desc), `increment_id`, `order_id`, `base_grand_total`, `state`, `created_at`. |
| `order` | string | `asc` or `desc`. |

## Row Shape

| Field | Type |
|-------|------|
| `id`, `incrementId` | integer / string |
| `orderId`, `orderIncrementId` | integer / string |
| `state` | string |
| `baseGrandTotal`, `formattedBaseGrandTotal` | number / string |
| `createdAt` | datetime string |

## Permission

`sales.invoices.view`

::: info
For invoice **detail** + **PDF** + **create**, see the per-order endpoints
under [Orders](/api/rest-api/admin/sales/orders/get-invoice).
:::

---
outline: false
apiType: rest
examples:
  - id: admin-bookings-list
    title: List Bookings (Datagrid)
    description: One row per `bookings` table entry (a booking line on an order). `from`/`to` are unix timestamps plus formatted variants.
    query: |
      curl -X GET "https://your-domain.com/api/admin/bookings?per_page=10" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 1,
            "orderId": 8,
            "orderIncrementId": "00000000008",
            "orderItemId": 42,
            "productId": 99,
            "productSku": "BK-EVENT-01",
            "productName": null,
            "qty": 2,
            "from": 1716220800,
            "to": 1716224400,
            "fromFormatted": "20 May, 2026 12:00PM",
            "toFormatted": "20 May, 2026 13:00PM",
            "createdAt": "2026-05-20 10:00:00"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Bookings (Datagrid)

Mirrors the admin **Sales → Bookings** datagrid.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/bookings` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination (default `10`, cap `50`). |
| `id` | string | Filter by booking id (int or comma-list). |
| `order_id` | string | Partial `orders.increment_id`. |
| `qty` | integer | Exact quantity. |
| `product_id` | integer | Filter by product id. |
| `from_from`, `from_to` | date | Slot-start range. |
| `to_from`, `to_to` | date | Slot-end range. |
| `created_at_from` / `_to` | date | Order created range. |
| `sort` | string | `id`, `order_id`, `qty`, `from`, `to`, `created_at`. |
| `order` | string | `asc`, `desc`. |

`from` and `to` are emitted as both **raw unix timestamps** (`from`, `to`) and
pre-formatted strings (`fromFormatted`, `toFormatted`, `d M, Y H:iA`).

## Permission

`sales.bookings.view`

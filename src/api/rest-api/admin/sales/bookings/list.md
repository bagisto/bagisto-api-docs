---
outline: false
apiType: rest
examples:
  - id: admin-bookings-list
    title: List Bookings (Datagrid)
    description: One row per booking line. Every booking column plus the linked order / order-item summary is populated on each row.
    query: |
      curl -X GET "https://your-domain.com/api/admin/bookings?per_page=10" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
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
            "productName": "Concert Ticket",
            "bookingType": "event",
            "qty": 2,
            "from": 1716220800,
            "to": 1716224400,
            "fromFormatted": "20 May, 2026 12:00PM",
            "toFormatted": "20 May, 2026 13:00PM",
            "bookingProductEventTicketId": 5,
            "order": {
              "id": 8,
              "incrementId": "00000000008",
              "status": "processing",
              "customerName": "John Doe",
              "customerEmail": "john.doe@example.com",
              "grandTotal": 240,
              "orderCurrencyCode": "USD"
            },
            "orderItem": {
              "id": 42,
              "sku": "BK-EVENT-01",
              "name": "Concert Ticket",
              "qtyOrdered": 2
            },
            "createdAt": "2026-05-20 10:00:00"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Bookings

Mirrors the admin **Sales → Bookings** datagrid. Every booking **column** plus the linked `order` and `orderItem` summaries are populated on each row — the field set is identical to [Booking Detail](/api/rest-api/admin/sales/bookings/detail).

::: tip How this menu works
For what a booking row is, the booking sub-types, and the time-window fields, see the [Bookings overview](/api/rest-api/admin/sales/bookings/).
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/bookings` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination (default `10`, cap `50`). |
| `id` | string | Filter by booking id (int or comma-list). |
| `order_id` | string | Partial order increment number. |
| `qty` | integer | Exact quantity. |
| `product_id` | integer | Filter by product id. |
| `from_from`, `from_to` | date | Slot-start range. |
| `to_from`, `to_to` | date | Slot-end range. |
| `created_at_from` / `_to` | date | Order created range. |
| `sort` | string | `id`, `order_id`, `qty`, `from`, `to`, `created_at`. |
| `order` | string | `asc`, `desc`. |

`from` and `to` are emitted as both **raw unix timestamps** (`from`, `to`) and pre-formatted strings (`fromFormatted`, `toFormatted`). For non-time-based booking types they may be `null`.

## Permission

`sales.bookings.view`

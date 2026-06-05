---
outline: false
apiType: rest
examples:
  - id: admin-booking-detail
    title: Booking Detail
    description: A single booking with its booking sub-type, time window, and the linked order / order-item summaries.
    query: |
      curl -X GET "https://your-domain.com/api/admin/bookings/1" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
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
---

# Booking Detail

Returns a single booking with its booking sub-type, the booked time window, and the linked order / order-item summaries — no follow-up calls required. Requires the `sales.bookings.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/bookings/{id}` | GET |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Booking id. |
| `orderId` / `orderIncrementId` | Integer / String | Parent order id and human-facing number. |
| `orderItemId` | Integer | The order line this booking belongs to. |
| `productId` / `productSku` / `productName` | — | The booked product. |
| `bookingType` | String | Booking sub-type: `default`, `appointment`, `event`, `rental`, `table`. |
| `qty` | Integer | Booked quantity. |
| `from` / `to` | Integer | Booked time window as **unix timestamps** (may be `null` for non-time-based types). |
| `fromFormatted` / `toFormatted` | String | The same window as readable strings. |
| `bookingProductEventTicketId` | Integer | Linked event-ticket id (set when `bookingType` is `event`). |
| `order` | Object | Slim order summary — `id`, `incrementId`, `status`, `customerName`, `customerEmail`, `grandTotal`, `orderCurrencyCode`. |
| `orderItem` | Object | Slim order-item summary — `id`, `sku`, `name`, `qtyOrdered`. |
| `createdAt` | String | When the order was created. |

## Permission

`sales.bookings.view`

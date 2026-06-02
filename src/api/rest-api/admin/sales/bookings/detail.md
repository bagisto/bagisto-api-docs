---
outline: false
apiType: rest
examples:
  - id: admin-booking-detail
    title: Booking Detail
    description: Single booking + booking-product sub-type + order/orderItem summaries inlined.
    query: |
      curl -X GET "https://your-domain.com/api/admin/bookings/1" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 1,
        "orderId": 8,
        "orderItemId": 42,
        "productId": 99,
        "productSku": "BK-EVENT-01",
        "qty": 2,
        "from": 1716220800,
        "to": 1716224400,
        "bookingProductType": "event",
        "order": { "id": 8, "incrementId": "00000000008", "status": "complete" },
        "orderItem": { "id": 42, "name": "Concert Ticket", "qtyOrdered": 2 },
        "createdAt": "2026-05-20 10:00:00"
      }
---

# Booking Detail

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/bookings/{id}` | GET |

## Response Notes

- `bookingProductType` comes from `booking_products.type`: `default`, `appointment`, `event`, `rental`, `table`.
- `order` + `orderItem` are slim summaries inlined as plain objects.

## Permission

`sales.bookings.view`

---
outline: false
examples:
  - id: admin-booking-detail-gql
    title: Booking Detail
    description: Single booking with sub-type + order/orderItem summaries.
    query: |
      query AdminBooking($id: ID!) {
        adminBooking(id: $id) {
          id _id
          orderId
          orderItemId
          productId
          productSku
          qty
          from
          to
          bookingType
          order { id incrementId status }
          orderItem { id name qtyOrdered }
          createdAt
        }
      }
    variables: |
      { "id": "/api/admin/bookings/1" }
    response: |
      {
        "data": {
          "adminBooking": {
            "id": "/api/admin/bookings/1",
            "_id": 1,
            "orderId": 8,
            "orderItemId": 42,
            "productId": 99,
            "productSku": "BK-EVENT-01",
            "qty": 2,
            "from": 1716220800,
            "to": 1716224400,
            "bookingType": "event",
            "order": { "id": 8, "incrementId": "00000000008", "status": "complete" },
            "orderItem": { "id": 42, "name": "Concert Ticket", "qtyOrdered": 2 },
            "createdAt": "2026-05-20 10:00:00"
          }
        }
      }
---

# Booking Detail

GraphQL counterpart of `GET /api/admin/bookings/{id}`. Permission: `sales.bookings.view`.

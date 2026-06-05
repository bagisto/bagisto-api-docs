---
outline: false
examples:
  - id: admin-bookings-list-gql
    title: List Bookings (Datagrid)
    description: Cursor-paginated bookings datagrid. Every booking column plus the linked order / order-item summary is populated on each row.
    query: |
      query AdminBookings($first: Int, $after: String) {
        adminBookings(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
              orderId
              orderIncrementId
              orderItemId
              productId
              productSku
              productName
              bookingType
              qty
              from
              to
              fromFormatted
              toFormatted
              bookingProductEventTicketId
              order
              orderItem
              createdAt
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "adminBookings": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/bookings/1",
                  "_id": 1,
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
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# List Bookings (Datagrid)

GraphQL counterpart of `GET /api/admin/bookings`. Returns a cursor-paginated list of bookings — the same rows shown on the admin **Sales → Bookings** datagrid. Every booking **column** plus the linked `order` and `orderItem` summaries are populated on each row, so the field set is identical to [Booking Detail](/api/graphql-api/admin/sales/bookings/detail).

## Operation

`adminBookings(first, after, id, order_id, qty, product_id, from_from, from_to, to_from, to_to, created_at_from, created_at_to, sort, order)` — a cursor `QueryCollection`. Every REST query parameter is also exposed as a GraphQL argument; see the [REST page](/api/rest-api/admin/sales/bookings/list) for the full argument table.

## Permission

`sales.bookings.view`

::: warning Order objects are returned whole
`order` and `orderItem` are returned as JSON — **query them bare, without a sub-selection** (`order`, not `order { … }`). The whole object comes back. See [Booking Detail](/api/graphql-api/admin/sales/bookings/detail) for the keys inside each.
:::

## Fields

Every field is populated on each row (the booking columns, the booking sub-type, the two time-window representations, and the `order` / `orderItem` summary objects). The booking window is exposed two ways: `from` / `to` are raw **unix timestamps** (integers), and `fromFormatted` / `toFormatted` are the same instants pre-rendered as `d M, Y H:iA` strings (e.g. `"20 May, 2026 12:00PM"`). For non-time-based booking sub-types all four can be `null`. The full per-field reference is on the [Booking Detail](/api/graphql-api/admin/sales/bookings/detail) page.

## Listing vs. fetching one

The listing already carries the full payload — fetching a single booking by id (`adminBooking(id:)`) is only needed when you already hold a booking id and want just that record. Typical flow: list with `adminBookings`, read `_id` from the row you want, then fetch the full record with `adminBooking(id:)`.

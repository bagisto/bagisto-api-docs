---
outline: false
examples:
  - id: admin-bookings-list-gql
    title: List Bookings (Datagrid)
    description: Cursor-paginated bookings listing.
    query: |
      query AdminBookings($first: Int, $after: String) {
        adminBookings(first: $first, after: $after) {
          edges {
            cursor
            node { id _id orderId orderIncrementId orderItemId productId productSku qty from to fromFormatted toFormatted createdAt }
          }
          pageInfo { hasNextPage endCursor }
          totalCount
        }
      }
    variables: |
      { "first": 10 }
    response: |
      {
        "data": {
          "adminBookings": {
            "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/bookings/1", "_id": 1, "orderId": 8, "orderIncrementId": "00000000008", "orderItemId": 42, "productId": 99, "productSku": "BK-EVENT-01", "qty": 2, "from": 1716220800, "to": 1716224400, "fromFormatted": "20 May, 2026 12:00PM", "toFormatted": "20 May, 2026 13:00PM", "createdAt": "2026-05-20 10:00:00" } }],
            "pageInfo": { "hasNextPage": false, "endCursor": "MA==" },
            "totalCount": 1
          }
        }
      }
---

# List Bookings (Datagrid)

GraphQL counterpart of `GET /api/admin/bookings`. Same arguments — see REST page. Permission: `sales.bookings.view`.

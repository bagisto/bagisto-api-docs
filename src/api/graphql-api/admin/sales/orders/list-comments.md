---
outline: false
examples:
  - id: admin-list-order-comments
    title: List Order Comments
    description: Cursor-paginated list of one order's comments, newest first. Pass the order id as the required `orderId` argument.
    query: |
      query ListOrderComments($orderId: Int!, $first: Int) {
        adminOrderComments(orderId: $orderId, first: $first) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              id
              _id
              orderId
              comment
              customerNotified
              createdAt
              updatedAt
            }
          }
        }
      }
    variables: |
      {
          "orderId": 2392,
          "first": 10
      }
    response: |
      {
        "data": {
          "adminOrderComments": {
            "totalCount": 2,
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MQ=="
            },
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": null,
                  "_id": 18,
                  "orderId": 2392,
                  "comment": "Shipment dispatched via DHL, tracking #1234567890.",
                  "customerNotified": true,
                  "createdAt": "2026-05-21 11:02:14",
                  "updatedAt": "2026-05-21 11:02:14"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": null,
                  "_id": 17,
                  "orderId": 2392,
                  "comment": "Customer called to confirm shipping address.",
                  "customerNotified": false,
                  "createdAt": "2026-05-21 10:14:31",
                  "updatedAt": "2026-05-21 10:14:31"
                }
              }
            ]
          }
        }
      }
---

# List Order Comments

Cursor-paginated list of one order's comments, newest first — the comment
thread shown on the admin **Sales → Orders → View** screen.

## Operation

| Operation | Type |
|-----------|------|
| `adminOrderComments` | QueryCollection (cursor) |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **`orderId` is required** — it scopes the list to a single order. Omitting it
  returns an "order not found" error.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance; `pageInfo.hasNextPage` tells
  you when to stop, `totalCount` is the total for that order.
- Comments are returned **newest first**.

## Node fields

| Field | Notes |
|-------|-------|
| `id` | Always `null` — comments have no standalone endpoint. Use `_id`. |
| `_id` | The comment's integer id. |
| `orderId` | The order the comment belongs to. |
| `comment` | The comment text. |
| `customerNotified` | `true` if the customer was emailed when the comment was added. |
| `createdAt`, `updatedAt` | Timestamps. |

The REST equivalent (`GET /api/admin/orders/{orderId}/comments`) returns the
same fields in a `{ data, meta }` envelope instead of a cursor connection.

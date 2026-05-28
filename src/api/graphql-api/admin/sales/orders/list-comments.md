---
outline: false
examples:
  - id: admin-list-order-comments
    title: List Order Comments
    description: Cursor-paginated list of an order's comments, newest first.
    query: |
      query ListOrderComments($first: Int) {
        adminOrderComments(first: $first) {
          edges {
            node {
              id
            }
          }
          pageInfo { hasNextPage endCursor }
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
          "adminOrderComments": {
            "edges": [
              {
                "node": {
                  "id": "/api/admin/order-comments/17",
                  "comment": "Customer called to confirm shipping address.",
                  "customerNotified": true,
                  "createdAt": "2026-05-21 10:14:31"
                },
                "cursor": "MA=="
              }
            ],
            "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }
          }
        }
      }
---

# List Order Comments

Cursor-paginated list of an order's comments, newest first. Uses API Platform's
native cursor pagination — use `first` + `after` to page through the result.

## Operation

| Operation | Type |
|-----------|------|
| `adminOrderComments` | QueryCollection (cursor) |

---
outline: false
examples:
  - id: admin-refunds-list-gql
    title: List Refunds (Datagrid)
    description: Cursor-paginated refunds listing.
    query: |
      query AdminRefunds($first: Int, $after: String) {
        adminRefunds(first: $first, after: $after) {
          edges {
            cursor
            node { id _id orderId orderIncrementId state baseGrandTotal formattedBaseGrandTotal billedTo createdAt }
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
          "adminRefunds": {
            "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/refunds/3", "_id": 3, "orderId": 8, "orderIncrementId": "00000000008", "state": "refunded", "baseGrandTotal": 49.5, "formattedBaseGrandTotal": "$49.50", "billedTo": "John Doe", "createdAt": "2026-05-20 14:00:00" } }],
            "pageInfo": { "hasNextPage": false, "endCursor": "MA==" },
            "totalCount": 1
          }
        }
      }
---

# List Refunds (Datagrid)

GraphQL counterpart of `GET /api/admin/refunds`. Same arguments as the REST page (`id`, `order_id`, `state`, `base_grand_total_from/to`, `billed_to`, `created_at_from/to`, `sort`, `order`) plus cursor `first`/`after`.

Permission: `sales.refunds.view`.

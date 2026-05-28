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
            node {
              id
              _id
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
      { "data": { "adminRefunds": { "edges": [ { "cursor": "MA==", "node": { "id": "/api/admin/refunds/1", "_id": 1 } } ], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }

---

# List Refunds (Datagrid)

GraphQL counterpart of `GET /api/admin/refunds`. Same arguments as the REST page (`id`, `order_id`, `state`, `base_grand_total_from/to`, `billed_to`, `created_at_from/to`, `sort`, `order`) plus cursor `first`/`after`.

Permission: `sales.refunds.view`.

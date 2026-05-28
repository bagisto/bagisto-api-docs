---
outline: false
examples:
  - id: admin-shipments-list-gql
    title: List Shipments (Datagrid)
    description: Cursor-paginated shipments listing.
    query: |
      query AdminShipments($first: Int, $after: String) {
        adminShipments(first: $first, after: $after) {
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
      { "data": { "adminShipments": { "edges": [ { "cursor": "MA==", "node": { "id": "/api/admin/shipments/1", "_id": 1 } } ], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }

---

# List Shipments (Datagrid)

GraphQL counterpart of `GET /api/admin/shipments`. Same arguments as the REST page (`id`, `order_id`, `total_qty`, `inventory_source_name`, `shipped_to`, `order_date_from/to`, `created_at_from/to`, `sort`, `order`) plus cursor `first` / `after`.

Permission: `sales.shipments.view`.

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
            node { id _id orderId orderIncrementId totalQty inventorySourceName shippedTo orderDate createdAt }
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
          "adminShipments": {
            "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/shipments/7", "_id": 7, "orderId": 8, "orderIncrementId": "00000000008", "totalQty": 2, "inventorySourceName": "Default", "shippedTo": "John Doe", "orderDate": "2026-05-20 10:00:00", "createdAt": "2026-05-20 12:00:00" } }],
            "pageInfo": { "hasNextPage": false, "endCursor": "MA==" },
            "totalCount": 1
          }
        }
      }
---

# List Shipments (Datagrid)

GraphQL counterpart of `GET /api/admin/shipments`. Same arguments as the REST page (`id`, `order_id`, `total_qty`, `inventory_source_name`, `shipped_to`, `order_date_from/to`, `created_at_from/to`, `sort`, `order`) plus cursor `first` / `after`.

Permission: `sales.shipments.view`.

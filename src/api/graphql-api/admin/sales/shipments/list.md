---
outline: false
examples:
  - id: admin-shipments-list-gql
    title: List Shipments (Datagrid)
    description: Cursor-paginated shipments datagrid listing. Returns the slim datagrid columns for each shipment — query the single-shipment endpoint for line items and carrier/tracking detail.
    query: |
      query AdminShipments($first: Int, $after: String) {
        adminShipments(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
              orderId
              orderIncrementId
              totalQty
              inventorySourceName
              shippedTo
              orderDate
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
          "adminShipments": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin_shipment_list_dtos/15",
                  "_id": 15,
                  "orderId": 172,
                  "orderIncrementId": "2000000172",
                  "totalQty": 1,
                  "inventorySourceName": "Default",
                  "shippedTo": "John Doe",
                  "orderDate": "2026-05-12 10:04:55",
                  "createdAt": "2026-05-12 11:20:31"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "OQ=="
            },
            "totalCount": 15
          }
        }
      }

---

# List Shipments (Datagrid)

GraphQL counterpart of `GET /api/admin/shipments`. Returns a cursor-paginated list of shipments, one slim row per shipment — the same columns shown on the admin **Sales → Shipments** datagrid.

## Operation

`adminShipments(first, after, id, order_id, total_qty, inventory_source_name, shipped_to, order_date_from, order_date_to, created_at_from, created_at_to, sort, order)` — a cursor `QueryCollection`. Every REST query parameter is also exposed as a GraphQL argument; see the [REST page](/api/rest-api/admin/sales/shipments/list) for the full argument table.

## Permission

`sales.shipments.view`

## Fields

Every field below is part of the shipment node, so all are valid to query. The **On listing** column tells you which are populated by `adminShipments`: a ✓ field is filled on every row; a **detail** field returns `null` on the listing and is populated when you fetch the shipment by id (`adminShipment(id:)`). The example above queries only the ✓ fields, which is what you normally want for a datagrid.

| Field | Type | On listing | Description |
|-------|------|:---------:|-------------|
| `id` | `ID` | ✓ | Resource identifier (IRI form). |
| `_id` | `Int` | ✓ | Numeric shipment id — use this to fetch the full shipment. |
| `orderId` | `Int` | ✓ | Id of the order this shipment belongs to. |
| `orderIncrementId` | `String` | ✓ | Human-facing number of the parent order. |
| `totalQty` | `Int` | ✓ | Total quantity shipped in this shipment. |
| `inventorySourceName` | `String` | ✓ | Name of the inventory source (warehouse) the items shipped from. |
| `shippedTo` | `String` | ✓ | Recipient name from the order's shipping address. |
| `orderDate` | `String` | ✓ | When the parent order was placed. |
| `createdAt` | `String` | ✓ | When the shipment was created. |
| `status` | `String` | detail | Shipment status. |
| `totalWeight` | `Float` | detail | Total weight of the shipment. |
| `carrierCode` | `String` | detail | Shipping carrier code. |
| `carrierTitle` | `String` | detail | Shipping carrier display name. |
| `trackNumber` | `String` | detail | Tracking number for the shipment. |
| `emailSent` | `Boolean` | detail | Whether the shipment email was sent to the customer. |
| `inventorySourceId` | `Int` | detail | Id of the inventory source the items shipped from. |
| `updatedAt` | `String` | detail | When the shipment was last updated. |
| `items` | `[ShipmentItem]` | detail | Shipped line items (a **cursor connection** — query `items { edges { node { sku qty price formattedTotal ... } } }`). |

## Listing vs. full record

The listing is a **slim datagrid** — it returns the ✓ columns above for fast paginated browsing. The **detail** fields are not "empty data"; the values exist on the shipment record, but loading them (especially `items`) for every row of a large list would be expensive, so the listing leaves them out. Fetch them by id with the single-shipment query — see [Get Shipment](/api/graphql-api/admin/sales/orders/get-shipment). Typical flow: list with `adminShipments`, read `_id` from the row you want, then fetch the full record.

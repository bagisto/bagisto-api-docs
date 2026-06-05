---
outline: false
examples:
  - id: admin-shipments-list-gql
    title: List Shipments (Datagrid)
    description: Cursor-paginated shipments datagrid. Every shipment column plus the order/customer context and both addresses is populated on each row — only the shipped line items are detail-only.
    query: |
      query AdminShipments($first: Int, $after: String, $order_id: String) {
        adminShipments(first: $first, after: $after, order_id: $order_id) {
          edges {
            cursor
            node {
              id
              _id
              orderId
              orderIncrementId
              shippedTo
              orderDate
              orderStatus
              orderStatusLabel
              channelName
              customerName
              customerEmail
              status
              totalQty
              totalWeight
              carrierCode
              carrierTitle
              trackNumber
              emailSent
              inventorySourceId
              inventorySourceName
              billingAddress
              shippingAddress
              createdAt
              updatedAt
              items
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
        "first": 10,
        "order_id": "00000000008"
      }
    response: |
      {
        "data": {
          "adminShipments": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/shipments/7",
                  "_id": 7,
                  "orderId": 8,
                  "orderIncrementId": "00000000008",
                  "shippedTo": "John Doe",
                  "orderDate": "2026-05-20 10:00:00",
                  "orderStatus": "processing",
                  "orderStatusLabel": "Processing",
                  "channelName": "Default",
                  "customerName": "John Doe",
                  "customerEmail": "john.doe@example.com",
                  "status": null,
                  "totalQty": 2,
                  "totalWeight": null,
                  "carrierCode": null,
                  "carrierTitle": "UPS",
                  "trackNumber": "1Z999AA1",
                  "emailSent": false,
                  "inventorySourceId": 1,
                  "inventorySourceName": "Default",
                  "billingAddress": {
                    "id": 16,
                    "addressType": "order_billing",
                    "firstName": "John",
                    "lastName": "Doe",
                    "city": "Los Angeles",
                    "country": "US",
                    "postcode": "90001",
                    "email": "john.doe@example.com",
                    "phone": "5551234567"
                  },
                  "shippingAddress": {
                    "id": 15,
                    "addressType": "order_shipping",
                    "firstName": "John",
                    "lastName": "Doe",
                    "city": "Los Angeles",
                    "country": "US",
                    "postcode": "90001",
                    "email": "john.doe@example.com",
                    "phone": "5551234567"
                  },
                  "createdAt": "2026-05-20 12:00:00",
                  "updatedAt": "2026-05-20 12:00:00",
                  "items": []
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

# List Shipments (Datagrid)

GraphQL counterpart of `GET /api/admin/shipments`. Returns a cursor-paginated list of shipments — the same rows shown on the admin **Sales → Shipments** datagrid. Every shipment **column** plus the order/customer context and both the billing and shipping addresses are populated on each row, so the field set is identical to [Shipment Detail](/api/graphql-api/admin/sales/orders/get-shipment) except for the shipped line `items`, which are returned only by the detail query (`[]` on the listing).

## Operation

`adminShipments(first, after, id, order_id, total_qty, inventory_source_name, shipped_to, order_date_from, order_date_to, created_at_from, created_at_to, sort, order)` — a cursor `QueryCollection`. Every REST query parameter is also exposed as a GraphQL argument; see the [REST page](/api/rest-api/admin/sales/shipments/list) for the full argument table.

## Permission

`sales.shipments.view`

::: warning billingAddress, shippingAddress and items are returned whole
`billingAddress`, `shippingAddress` and `items` are returned as JSON — **query them bare, without a sub-selection** (`shippingAddress`, not `shippingAddress { … }`). The whole object/array comes back. See [Shipment Detail](/api/graphql-api/admin/sales/orders/get-shipment) for the keys inside each.
:::

## Fields

Every field is populated on each row — the shipment columns, the order/customer context, and both address objects. Only the shipped line `items` are left empty (`[]`) on the listing. The full per-field reference is on the [Shipment Detail](/api/graphql-api/admin/sales/orders/get-shipment) page.

## Listing vs. fetching one

The listing already carries the full payload — fetching a single shipment by id (`adminShipment(id:)`) is only needed when you want the shipped line `items`, or when you already hold a shipment id and want just that record. Typical flow: list with `adminShipments`, read `_id` from the row you want, then fetch the full record.

---
outline: false
examples:
  - id: admin-get-shipment
    title: Get Shipment
    description: Fetch a single shipment with carrier/tracking detail and embedded line items.
    query: |
      query GetShipment($id: ID!) {
        adminShipment(id: $id) {
          id
          _id
          orderId
          orderIncrementId
          status
          totalQty
          totalWeight
          carrierCode
          carrierTitle
          trackNumber
          emailSent
          inventorySourceId
          inventorySourceName
          shippedTo
          orderDate
          createdAt
          updatedAt
          items {
            edges {
              node {
                id
                orderItemId
                sku
                name
                qty
                price
                formattedPrice
                total
                formattedTotal
                productId
                productType
              }
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/shipments/55"
      }
    response: |
      {
        "data": {
          "adminShipment": {
            "id": "/api/admin/shipments/55",
            "_id": 55,
            "orderId": 2392,
            "orderIncrementId": "2000000392",
            "status": "1",
            "totalQty": 3,
            "totalWeight": null,
            "carrierCode": "ups",
            "carrierTitle": "UPS",
            "trackNumber": "1Z999AA1",
            "emailSent": true,
            "inventorySourceId": 1,
            "inventorySourceName": "Default",
            "shippedTo": "John Doe",
            "orderDate": "2026-05-19 13:11:39",
            "createdAt": "2026-05-19 13:20:02",
            "updatedAt": "2026-05-19 13:20:02",
            "items": {
              "edges": [
                {
                  "node": {
                    "id": 401,
                    "orderItemId": 1042,
                    "sku": "WS-12-S",
                    "name": "Argus All-Weather Tank-S",
                    "qty": 3,
                    "price": 29.99,
                    "formattedPrice": "$29.99",
                    "total": 89.97,
                    "formattedTotal": "$89.97",
                    "productId": 27,
                    "productType": "simple"
                  }
                }
              ]
            }
          }
        }
      }
---

# Get Shipment

GraphQL counterpart of `GET /api/admin/shipments/{id}`. Returns a single shipment with carrier/tracking detail and its embedded line items — everything the listing leaves out.

## Operation

| Operation | Type |
|-----------|------|
| `adminShipment(id: ID!)` | Query |

Pass the shipment IRI (`/api/admin/shipments/{id}`) as `id`. Permission: `sales.shipments.view`.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | Resource identifier (IRI form). |
| `_id` | `Int` | Numeric shipment id. |
| `orderId` | `Int` | Id of the parent order. |
| `orderIncrementId` | `String` | Human-facing number of the parent order. |
| `status` | `String` | Shipment status. |
| `totalQty` | `Int` | Total quantity shipped. |
| `totalWeight` | `Float` | Total weight of the shipment (null when not recorded). |
| `carrierCode` | `String` | Shipping carrier code (e.g. `ups`). |
| `carrierTitle` | `String` | Shipping carrier display name (e.g. `UPS`). |
| `trackNumber` | `String` | Tracking number for the shipment. |
| `emailSent` | `Boolean` | Whether the shipment email was sent to the customer. |
| `inventorySourceId` | `Int` | Id of the inventory source (warehouse) items shipped from. |
| `inventorySourceName` | `String` | Name of that inventory source. |
| `shippedTo` | `String` | Recipient name from the order's shipping address. |
| `orderDate` | `String` | When the parent order was placed. |
| `createdAt` | `String` | When the shipment was created. |
| `updatedAt` | `String` | When the shipment was last updated. |
| `items` | `[ShipmentItem]` | Shipped line items — see the table below. |

### Item fields (`items`)

`items` is a **cursor connection** — wrap the fields in `edges { node { … } }`, e.g. `items { edges { node { sku qty formattedTotal … } } }`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Shipment-item id. |
| `orderItemId` | `Int` | Id of the order item this line was shipped from. |
| `sku` | `String` | Product SKU. |
| `name` | `String` | Product name as ordered. |
| `qty` | `Int` | Quantity shipped for this line. |
| `price` | `Float` | Unit price (order currency). |
| `formattedPrice` | `String` | `price` formatted. |
| `basePrice` | `Float` | Unit price in the store's base currency. |
| `total` | `Float` | Line total (order currency). |
| `formattedTotal` | `String` | `total` formatted. |
| `baseTotal` | `Float` | Line total in the store's base currency. |
| `taxAmount` | `Float` | Tax for this line. |
| `formattedTaxAmount` | `String` | `taxAmount` formatted. |
| `discountAmount` | `Float` | Discount for this line. |
| `formattedDiscountAmount` | `String` | `discountAmount` formatted. |
| `productId` | `Int` | Id of the product. |
| `productType` | `String` | Product type — `simple`, `configurable`, `bundle`, etc. |
| `additional` | `JSON` | Extra item data (selected options, configurable attributes, etc.). |

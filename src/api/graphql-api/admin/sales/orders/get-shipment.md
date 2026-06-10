---
outline: false
examples:
  - id: admin-shipment-detail-gql
    title: Get Shipment
    description: Fetch a single shipment by id, with the order/customer context, both addresses, and the shipped line items inlined.
    query: |
      query AdminShipment($id: ID!) {
        adminShipment(id: $id) {
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
          paymentMethod
          paymentTitle
          orderCurrencyCode
          shippingMethod
          shippingTitle
          baseShippingAmount
          formattedBaseShippingAmount
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
    variables: |
      {
        "id": "/api/admin/shipments/7"
      }
    response: |
      {
        "data": {
          "adminShipment": {
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
            "paymentMethod": "cashondelivery",
            "paymentTitle": "Cash On Delivery",
            "orderCurrencyCode": "USD",
            "shippingMethod": "free_free",
            "shippingTitle": "Free Shipping - Free Shipping",
            "baseShippingAmount": 0,
            "formattedBaseShippingAmount": "$0.00",
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
            "items": [
              {
                "id": 11,
                "orderItemId": 42,
                "sku": "TSHIRT-RED-M",
                "name": "Red T-Shirt",
                "qty": 2
              }
            ]
          }
        }
      }
---

# Get Shipment

GraphQL counterpart of `GET /api/admin/shipments/{id}`. Returns a single shipment with the order/customer context, both addresses, and the shipped line `items` inlined — everything the listing leaves out.

## Operation

| Operation | Type |
|-----------|------|
| `adminShipment(id: ID!)` | Query |

Pass the shipment IRI (`/api/admin/shipments/{id}`) as `id`. Permission: `sales.shipments.view`.

::: warning billingAddress, shippingAddress and items are returned whole
`billingAddress`, `shippingAddress` and `items` are returned as JSON — **query them bare, without a sub-selection** (`shippingAddress`, not `shippingAddress { … }`). The whole object/array comes back. The keys inside each are listed below for reference.
:::

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | Resource identifier (IRI form). |
| `_id` | `Int` | Numeric shipment id. |
| `orderId` | `Int` | Id of the parent order. |
| `orderIncrementId` | `String` | Human-facing number of the parent order. |
| `shippedTo` | `String` | The name on the order's shipping address. |
| `orderDate` | `String` | When the order was placed. |
| `orderStatus` | `String` | Parent order status code. |
| `orderStatusLabel` | `String` | Parent order status display label. |
| `channelName` | `String` | Sales channel the order belongs to. |
| `customerName` | `String` | Name of the customer who placed the order. |
| `customerEmail` | `String` | Email of the customer who placed the order. |
| `paymentMethod` | `String` | The order's payment method code (e.g. `cashondelivery`). |
| `paymentTitle` | `String` | The payment method's display title. |
| `orderCurrencyCode` | `String` | Currency the order was placed in (e.g. `USD`). |
| `shippingMethod` | `String` | The order's shipping method code — may be `null`. |
| `shippingTitle` | `String` | The shipping method's display title — may be `null`. |
| `baseShippingAmount` | `Float` | Shipping price in the store's base currency — may be `null`. |
| `formattedBaseShippingAmount` | `String` | The same shipping price pre-formatted for display — may be `null`. |
| `status` | `String` | Shipment status — often `null`. |
| `totalQty` | `Float` | Total quantity shipped across all line items. |
| `totalWeight` | `Float` | Combined weight of the shipment — may be `null`. |
| `carrierCode` | `String` | Shipping carrier code — may be `null`. |
| `carrierTitle` | `String` | Shipping carrier display name — may be `null`. |
| `trackNumber` | `String` | Carrier tracking number — may be `null`. |
| `emailSent` | `Boolean` | Whether the shipment notification email was sent. |
| `inventorySourceId` | `Int` | Id of the inventory source the items shipped from. |
| `inventorySourceName` | `String` | Name of the inventory source (warehouse) the items shipped from. |
| `billingAddress` | `JSON` | The order's billing address — see below. |
| `shippingAddress` | `JSON` | The order's shipping address — see below. |
| `createdAt` | `String` | When the shipment was created. |
| `updatedAt` | `String` | When the shipment was last updated. |
| `items` | `JSON` | The shipped line items — see below. |

### Payment and Shipping

Mirrors the "Payment and Shipping" panel on the admin Shipment view — the order's payment and shipping details carried alongside the shipment. These are flat scalar fields and resolve normally (select them directly, no sub-selection). `shippingMethod`, `shippingTitle`, `baseShippingAmount` and `formattedBaseShippingAmount` are `null` when the order had no shipping method (e.g. virtual/free).

| Field | Type | Description |
|-------|------|-------------|
| `paymentMethod` | `String` | The order's payment method code (e.g. `cashondelivery`). |
| `paymentTitle` | `String` | The payment method's display title (e.g. `Cash On Delivery`). |
| `orderCurrencyCode` | `String` | Currency the order was placed in (e.g. `USD`). |
| `shippingMethod` | `String` | The order's shipping method code (e.g. `free_free`) — may be `null`. |
| `shippingTitle` | `String` | The shipping method's display title — may be `null`. |
| `baseShippingAmount` | `Float` | Shipping price in the store's base currency — may be `null`. |
| `formattedBaseShippingAmount` | `String` | The same shipping price pre-formatted for display — may be `null`. |

### Address objects (`billingAddress`, `shippingAddress`)

Each is returned as a whole JSON object — query it as a bare field (`shippingAddress`), you cannot sub-select its keys in the query. The keys below are returned inside each object.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Address row id. |
| `addressType` | `String` | `order_billing` or `order_shipping`. |
| `firstName` / `lastName` | `String` | Recipient name. |
| `city` | `String` | City. |
| `country` | `String` | Country code (e.g. `US`). |
| `postcode` | `String` | Postal code. |
| `email` | `String` | Contact email. |
| `phone` | `String` | Contact phone. |

### Shipped items (`items`)

`items` is returned as a whole JSON array — query it as a bare field (`items`), you cannot sub-select its keys in the query. Each entry has the keys below.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Shipment-item row id. |
| `orderItemId` | `Int` | The order line this shipped item maps to. |
| `sku` | `String` | Product SKU. |
| `name` | `String` | Product name. |
| `qty` | `Float` | Quantity shipped for this line. |

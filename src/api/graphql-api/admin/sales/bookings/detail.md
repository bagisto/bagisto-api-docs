---
outline: false
examples:
  - id: admin-booking-detail-gql
    title: Booking Detail
    description: Fetch a single booking with its sub-type, full booking window, and embedded order / order-item summaries.
    query: |
      query AdminBooking($id: ID!) {
        adminBooking(id: $id) {
          id
          _id
          orderId
          orderIncrementId
          orderItemId
          productId
          productSku
          productName
          bookingType
          qty
          from
          to
          fromFormatted
          toFormatted
          bookingProductEventTicketId
          createdAt
          order
          orderItem
          paymentMethod
          paymentTitle
          shippingMethod
          shippingTitle
          billingAddress
          shippingAddress
          invoices
          shipments
          refunds
        }
      }
    variables: |
      {
        "id": "/api/admin/bookings/1"
      }
    response: |
      {
        "data": {
          "adminBooking": {
            "id": "/api/admin/bookings/1",
            "_id": 1,
            "orderId": 8,
            "orderIncrementId": "2000000008",
            "orderItemId": 42,
            "productId": 99,
            "productSku": "BK-EVENT-01",
            "productName": "Concert Ticket",
            "bookingType": "event",
            "qty": 2,
            "from": 1716220800,
            "to": 1716224400,
            "fromFormatted": "20 May, 2026 12:00PM",
            "toFormatted": "20 May, 2026 13:00PM",
            "bookingProductEventTicketId": 5,
            "createdAt": "2026-05-20 10:00:00",
            "order": {
              "id": 8,
              "incrementId": "00000000008",
              "status": "processing",
              "customerName": "John Doe",
              "customerEmail": "john.doe@example.com",
              "grandTotal": 240,
              "orderCurrencyCode": "USD"
            },
            "orderItem": {
              "id": 42,
              "sku": "BK-EVENT-01",
              "name": "Concert Ticket",
              "qtyOrdered": 2
            },
            "paymentMethod": "moneytransfer",
            "paymentTitle": "Money Transfer",
            "shippingMethod": null,
            "shippingTitle": null,
            "billingAddress": {
              "id": 4939,
              "addressType": "order_billing",
              "firstName": "John",
              "lastName": "Doe",
              "companyName": "Acme Inc.",
              "address": "123 Main St\nApt 4B",
              "city": "New York",
              "state": "NY",
              "country": "US",
              "postcode": "10001",
              "email": "john@example.com",
              "phone": "1234567890"
            },
            "shippingAddress": null,
            "invoices": [
              {
                "id": 559,
                "incrementId": "559",
                "state": "paid",
                "baseGrandTotal": 204,
                "formattedBaseGrandTotal": "$204.00",
                "createdAt": "2026-05-19 13:11:39"
              }
            ],
            "shipments": [],
            "refunds": []
          }
        }
      }
---

# Booking Detail

GraphQL counterpart of `GET /api/admin/bookings/{id}`. Returns a single booking with everything the listing leaves out — the booking sub-type, the linked event-ticket id, embedded summaries of the parent order and order line item, and the underlying order's billing/shipping address, payment & shipping info, and its invoices / shipments / refunds — so you can render the booking view (and the order it opens) without any follow-up fetch.

## Operation

| Operation | Type |
|-----------|------|
| `adminBooking(id: ID!)` | Query |

Pass the booking IRI (`/api/admin/bookings/{id}`) as `id`. Permission: `sales.bookings.view`.

::: warning order, orderItem, billingAddress, shippingAddress, invoices, shipments and refunds are returned whole
`order`, `orderItem`, `billingAddress`, `shippingAddress`, `invoices`, `shipments` and `refunds` are returned as whole JSON objects/arrays — **query them bare, without a sub-selection** (`billingAddress`, not `billingAddress { … }`; `invoices`, not `invoices { edges { node { … } } }`). The complete object/array comes back. The keys inside each are listed below for reference.
:::

## Fields

The booking window is exposed two ways: `from` / `to` are raw **unix timestamps** (integers), and `fromFormatted` / `toFormatted` are the same instants pre-rendered as human-readable `d M, Y H:iA` strings (e.g. `"20 May, 2026 12:00PM"`). For booking sub-types with no time window all four can be `null`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | Resource identifier (IRI form). |
| `_id` | `Int` | Numeric booking id. |
| `orderId` | `Int` | Id of the parent order. |
| `orderIncrementId` | `String` | Human-facing number of the parent order. |
| `orderItemId` | `Int` | Id of the order line item this booking was created from. |
| `productId` | `Int` | Id of the booked product. |
| `productSku` | `String` | SKU of the booked product. |
| `productName` | `String` | Product name as ordered. |
| `bookingType` | `String` | Booking sub-type — one of `default`, `appointment`, `event`, `rental`, `table`. |
| `qty` | `Int` | Quantity booked on this line. |
| `from` | `Int` | Start of the booking window as a **unix timestamp** (null for non-time-based bookings). |
| `to` | `Int` | End of the booking window as a **unix timestamp** (null for non-time-based bookings). |
| `fromFormatted` | `String` | `from` pre-rendered as a `d M, Y H:iA` string. |
| `toFormatted` | `String` | `to` pre-rendered as a `d M, Y H:iA` string. |
| `bookingProductEventTicketId` | `Int` | Linked event-ticket id (set only when `bookingType` is `event`). |
| `createdAt` | `String` | When the parent order was created. |
| `order` | `Object` | Summary of the parent order — see the table below. |
| `orderItem` | `Object` | Summary of the parent order line item — see the table below. |
| `paymentMethod` | `String` | The order's payment method code (e.g. `moneytransfer`). |
| `paymentTitle` | `String` | The payment method's display title. |
| `shippingMethod` | `String` | The order's shipping method code — `null` when the order had no shipping method. |
| `shippingTitle` | `String` | The shipping method's display title — `null` when there was no shipping method. |
| `billingAddress` | `JSON` | The order's billing address object, or `null` — see below. |
| `shippingAddress` | `JSON` | The order's shipping address object, or `null` — see below. |
| `invoices` | `JSON` | Array of the order's invoice summaries — empty when none. See below. |
| `shipments` | `JSON` | Array of the order's shipment summaries — empty when none. See below. |
| `refunds` | `JSON` | Array of the order's refund summaries — empty when none. See below. |

### Order fields (`order`)

A slim summary of the order this booking belongs to, so you can render the booking view without a separate order fetch. `order` is returned as a whole JSON object — query it as a bare field (`order`), you cannot sub-select its keys in the query. The keys below are returned inside that object for reference.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Order id. |
| `incrementId` | `String` | Human-facing order number. |
| `status` | `String` | Order status — e.g. `complete`, `processing`, `pending`. |
| `customerName` | `String` | Name of the customer who placed the order. |
| `customerEmail` | `String` | Email of the customer who placed the order. |
| `grandTotal` | `Float` | Order grand total (order currency). |
| `orderCurrencyCode` | `String` | Currency the order was placed in (e.g. `USD`). |

### Order item fields (`orderItem`)

A slim summary of the order line item this booking was created from. `orderItem` is returned as a whole JSON object — query it as a bare field (`orderItem`), you cannot sub-select its keys in the query. The keys below are returned inside that object for reference.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Order-item id. |
| `sku` | `String` | SKU of the ordered item. |
| `name` | `String` | Product name as ordered. |
| `qtyOrdered` | `Float` | Quantity ordered for this line item. |

### Address objects (`billingAddress`, `shippingAddress`)

The order's billing and shipping addresses, mirroring the admin order view's address panel. Each is returned as a whole JSON object (or `null` when the order has none) — query it as a bare field (`billingAddress`), you cannot sub-select its keys in the query. The keys below are returned inside each object.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Address row id. |
| `addressType` | `String` | `order_billing` or `order_shipping`. |
| `firstName` / `lastName` | `String` | Recipient name. |
| `companyName` | `String` | Company name — may be `null`. |
| `address` | `String` | Street address (may span multiple lines). |
| `city` | `String` | City. |
| `state` | `String` | State / province. |
| `country` | `String` | Country code (e.g. `US`). |
| `postcode` | `String` | Postal code. |
| `email` | `String` | Contact email. |
| `phone` | `String` | Contact phone. |

### Invoices (`invoices`)

Slim summaries of the order's invoices, returned as a whole JSON array (empty when none) — query it as a bare field (`invoices`), you cannot sub-select its keys in the query. Each entry has the keys below.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Invoice id. |
| `incrementId` | `String` | Human-facing invoice number. |
| `state` | `String` | Invoice state — e.g. `paid`, `pending`. |
| `baseGrandTotal` | `Float` | Invoice grand total in the store's base currency. |
| `formattedBaseGrandTotal` | `String` | The same total pre-formatted for display. |
| `createdAt` | `String` | When the invoice was created. |

### Shipments (`shipments`)

Slim summaries of the order's shipments, returned as a whole JSON array (empty when none) — query it as a bare field (`shipments`), you cannot sub-select its keys in the query. Each entry has the keys below.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Shipment id. |
| `totalQty` | `Float` | Total quantity shipped. |
| `carrierTitle` | `String` | Shipping carrier title — may be `null`. |
| `trackNumber` | `String` | Carrier tracking number — may be `null`. |
| `createdAt` | `String` | When the shipment was created. |

### Refunds (`refunds`)

Slim summaries of the order's refunds, returned as a whole JSON array (empty when none) — query it as a bare field (`refunds`), you cannot sub-select its keys in the query. Each entry has the keys below.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Refund id. |
| `state` | `String` | Refund state. |
| `baseGrandTotal` | `Float` | Refund grand total in the store's base currency. |
| `formattedBaseGrandTotal` | `String` | The same total pre-formatted for display. |
| `createdAt` | `String` | When the refund was created. |

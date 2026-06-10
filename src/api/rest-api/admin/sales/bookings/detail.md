---
outline: false
apiType: rest
examples:
  - id: admin-booking-detail
    title: Booking Detail
    description: A single booking with its booking sub-type, time window, and the linked order / order-item summaries.
    query: |
      curl -X GET "https://your-domain.com/api/admin/bookings/1" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "id": 1,
        "orderId": 8,
        "orderIncrementId": "00000000008",
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
        "refunds": [],
        "createdAt": "2026-05-20 10:00:00"
      }
---

# Booking Detail

Returns a single booking with its booking sub-type, the booked time window, the linked order / order-item summaries, and the underlying order's billing/shipping address, payment & shipping info, and its invoices / shipments / refunds — everything the admin Booking view shows when it opens the order, with no follow-up calls required. Requires the `sales.bookings.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/bookings/{id}` | GET |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Booking id. |
| `orderId` / `orderIncrementId` | Integer / String | Parent order id and human-facing number. |
| `orderItemId` | Integer | The order line this booking belongs to. |
| `productId` / `productSku` / `productName` | — | The booked product. |
| `bookingType` | String | Booking sub-type: `default`, `appointment`, `event`, `rental`, `table`. |
| `qty` | Integer | Booked quantity. |
| `from` / `to` | Integer | Booked time window as **unix timestamps** (may be `null` for non-time-based types). |
| `fromFormatted` / `toFormatted` | String | The same window as readable strings. |
| `bookingProductEventTicketId` | Integer | Linked event-ticket id (set when `bookingType` is `event`). |
| `order` | Object | Slim order summary — `id`, `incrementId`, `status`, `customerName`, `customerEmail`, `grandTotal`, `orderCurrencyCode`. |
| `orderItem` | Object | Slim order-item summary — `id`, `sku`, `name`, `qtyOrdered`. |
| `paymentMethod` / `paymentTitle` | String | The order's payment method code and its display title. |
| `shippingMethod` / `shippingTitle` | String | The order's shipping method code and its display title — `null` when the order had no shipping method. |
| `billingAddress` | Object | The order's billing address, or `null` when the order has none — see below. |
| `shippingAddress` | Object | The order's shipping address, or `null` when the order has none — see below. |
| `invoices` | Array | Slim summaries of the order's invoices — empty when none. See below. |
| `shipments` | Array | Slim summaries of the order's shipments — empty when none. See below. |
| `refunds` | Array | Slim summaries of the order's refunds — empty when none. See below. |
| `createdAt` | String | When the order was created. |

### Address objects (`billingAddress`, `shippingAddress`)

The order's billing and shipping addresses, mirroring the admin order view's address panel. Each is an object (or `null` when the order has none) carrying `id`, `addressType`, `firstName`, `lastName`, `companyName`, `address`, `city`, `state`, `country`, `postcode`, `email`, and `phone`.

### Invoices (`invoices`)

Slim summaries of the order's invoices — an empty array when the order has none.

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Invoice id. |
| `incrementId` | String | Human-facing invoice number. |
| `state` | String | Invoice state — e.g. `paid`, `pending`. |
| `baseGrandTotal` | Number | Invoice grand total in the store's base currency. |
| `formattedBaseGrandTotal` | String | The same total pre-formatted for display. |
| `createdAt` | String | When the invoice was created. |

### Shipments (`shipments`)

Slim summaries of the order's shipments — an empty array when the order has none.

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Shipment id. |
| `totalQty` | Number | Total quantity shipped. |
| `carrierTitle` | String | Shipping carrier title — may be `null`. |
| `trackNumber` | String | Carrier tracking number — may be `null`. |
| `createdAt` | String | When the shipment was created. |

### Refunds (`refunds`)

Slim summaries of the order's refunds — an empty array when the order has none.

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Refund id. |
| `state` | String | Refund state. |
| `baseGrandTotal` | Number | Refund grand total in the store's base currency. |
| `formattedBaseGrandTotal` | String | The same total pre-formatted for display. |
| `createdAt` | String | When the refund was created. |

## Permission

`sales.bookings.view`

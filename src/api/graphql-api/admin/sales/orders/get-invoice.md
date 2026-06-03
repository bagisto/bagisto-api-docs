---
outline: false
examples:
  - id: admin-get-invoice
    title: Get Invoice
    description: Fetch a single invoice with the full totals breakdown and embedded line items.
    query: |
      query GetInvoice($id: ID!) {
        adminInvoice(id: $id) {
          id
          _id
          incrementId
          orderId
          orderIncrementId
          state
          orderCurrencyCode
          totalQty
          subTotal
          formattedSubTotal
          grandTotal
          formattedGrandTotal
          baseGrandTotal
          formattedBaseGrandTotal
          taxAmount
          formattedTaxAmount
          discountAmount
          formattedDiscountAmount
          shippingAmount
          formattedShippingAmount
          emailSent
          transactionId
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
                taxAmount
                discountAmount
                productId
                productType
              }
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/invoices/88"
      }
    response: |
      {
        "data": {
          "adminInvoice": {
            "id": "/api/admin/invoices/88",
            "_id": 88,
            "incrementId": "100000088",
            "orderId": 2392,
            "orderIncrementId": "2000000392",
            "state": "paid",
            "orderCurrencyCode": "USD",
            "totalQty": 4,
            "subTotal": 119.96,
            "formattedSubTotal": "$119.96",
            "grandTotal": 129.96,
            "formattedGrandTotal": "$129.96",
            "baseGrandTotal": 129.96,
            "formattedBaseGrandTotal": "$129.96",
            "taxAmount": 0,
            "formattedTaxAmount": "$0.00",
            "discountAmount": 0,
            "formattedDiscountAmount": "$0.00",
            "shippingAmount": 10,
            "formattedShippingAmount": "$10.00",
            "emailSent": true,
            "transactionId": "ch_3Q1aBcD",
            "createdAt": "2026-05-19 13:13:30",
            "updatedAt": "2026-05-19 13:13:30",
            "items": {
              "edges": [
                {
                  "node": {
                    "id": 901,
                    "orderItemId": 1042,
                    "sku": "WS-12-S",
                    "name": "Argus All-Weather Tank-S",
                    "qty": 3,
                    "price": 29.99,
                    "formattedPrice": "$29.99",
                    "total": 89.97,
                    "formattedTotal": "$89.97",
                    "taxAmount": 0,
                    "discountAmount": 0,
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

# Get Invoice

GraphQL counterpart of `GET /api/admin/invoices/{id}`. Returns a single invoice with the full totals breakdown and its embedded line items — everything the listing leaves out.

## Operation

| Operation | Type |
|-----------|------|
| `adminInvoice(id: ID!)` | Query |

Pass the invoice IRI (`/api/admin/invoices/{id}`) as `id`. Permission: `sales.invoices.view`.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | Resource identifier (IRI form). |
| `_id` | `Int` | Numeric invoice id. |
| `incrementId` | `String` | Human-facing invoice number. |
| `orderId` | `Int` | Id of the parent order. |
| `orderIncrementId` | `String` | Human-facing number of the parent order. |
| `state` | `String` | Invoice state — e.g. `paid`, `pending`, `refunded`. |
| `orderCurrencyCode` | `String` | Currency the order/invoice was placed in (e.g. `USD`). |
| `totalQty` | `Int` | Total quantity invoiced. |
| `subTotal` | `Float` | Line-items subtotal (order currency). |
| `formattedSubTotal` | `String` | `subTotal` with the currency symbol. |
| `grandTotal` | `Float` | Invoice total in the **order's** currency. |
| `formattedGrandTotal` | `String` | `grandTotal` with the currency symbol. |
| `baseGrandTotal` | `Float` | Invoice total in the **store's base** currency. |
| `formattedBaseGrandTotal` | `String` | `baseGrandTotal` with the base-currency symbol. |
| `taxAmount` | `Float` | Tax total (order currency). |
| `formattedTaxAmount` | `String` | `taxAmount` formatted. |
| `discountAmount` | `Float` | Discount total (order currency). |
| `formattedDiscountAmount` | `String` | `discountAmount` formatted. |
| `shippingAmount` | `Float` | Shipping total (order currency). |
| `formattedShippingAmount` | `String` | `shippingAmount` formatted. |
| `emailSent` | `Boolean` | Whether the invoice email was sent to the customer. |
| `transactionId` | `String` | Payment transaction reference (null until captured). |
| `createdAt` | `String` | When the invoice was created. |
| `updatedAt` | `String` | When the invoice was last updated. |
| `items` | `[InvoiceItem]` | Invoiced line items — see the table below. |

### Item fields (`items`)

`items` is a **cursor connection** — wrap the fields in `edges { node { … } }`, e.g. `items { edges { node { sku qty formattedTotal … } } }`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Invoice-item id. |
| `orderItemId` | `Int` | Id of the order item this line was invoiced from. |
| `sku` | `String` | Product SKU. |
| `name` | `String` | Product name as ordered. |
| `qty` | `Int` | Quantity invoiced for this line. |
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

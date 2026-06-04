---
outline: false
examples:
  - id: admin-get-invoice
    title: Get Invoice
    description: Fetch a single invoice with the full totals breakdown, order/customer context, billing & shipping addresses, and embedded line items.
    query: |
      query GetInvoice($id: ID!) {
        adminInvoice(id: $id) {
          id
          _id
          incrementId
          orderId
          orderIncrementId
          state
          emailSent
          totalQty

          orderCurrencyCode
          baseCurrencyCode
          channelCurrencyCode

          subTotal
          formattedSubTotal
          baseSubTotal
          formattedBaseSubTotal
          subTotalInclTax
          formattedSubTotalInclTax
          baseSubTotalInclTax
          formattedBaseSubTotalInclTax

          grandTotal
          formattedGrandTotal
          baseGrandTotal
          formattedBaseGrandTotal

          taxAmount
          formattedTaxAmount
          baseTaxAmount
          formattedBaseTaxAmount

          discountAmount
          formattedDiscountAmount
          baseDiscountAmount
          formattedBaseDiscountAmount

          shippingAmount
          formattedShippingAmount
          baseShippingAmount
          formattedBaseShippingAmount
          shippingAmountInclTax
          formattedShippingAmountInclTax
          baseShippingAmountInclTax
          formattedBaseShippingAmountInclTax
          shippingTaxAmount
          formattedShippingTaxAmount
          baseShippingTaxAmount
          formattedBaseShippingTaxAmount

          transactionId
          reminders
          nextReminderAt
          createdAt
          updatedAt

          orderStatus
          orderStatusLabel
          orderDate
          channelName
          customerName
          customerEmail

          billingAddress
          shippingAddress
          items
        }
      }
    variables: |
      {
        "id": "/api/admin/invoices/1"
      }
    response: |
      {
        "data": {
          "adminInvoice": {
            "id": "/api/admin/invoices/1",
            "_id": 1,
            "incrementId": "1",
            "orderId": 58,
            "orderIncrementId": "58",
            "state": "paid",
            "emailSent": true,
            "totalQty": 2,

            "orderCurrencyCode": "USD",
            "baseCurrencyCode": "USD",
            "channelCurrencyCode": "USD",

            "subTotal": 8000,
            "formattedSubTotal": "$8,000.00",
            "baseSubTotal": 8000,
            "formattedBaseSubTotal": "$8,000.00",
            "subTotalInclTax": 8000,
            "formattedSubTotalInclTax": "$8,000.00",
            "baseSubTotalInclTax": 8000,
            "formattedBaseSubTotalInclTax": "$8,000.00",

            "grandTotal": 8000,
            "formattedGrandTotal": "$8,000.00",
            "baseGrandTotal": 8000,
            "formattedBaseGrandTotal": "$8,000.00",

            "taxAmount": 0,
            "formattedTaxAmount": "$0.00",
            "baseTaxAmount": 0,
            "formattedBaseTaxAmount": "$0.00",

            "discountAmount": 0,
            "formattedDiscountAmount": "$0.00",
            "baseDiscountAmount": 0,
            "formattedBaseDiscountAmount": "$0.00",

            "shippingAmount": 0,
            "formattedShippingAmount": "$0.00",
            "baseShippingAmount": 0,
            "formattedBaseShippingAmount": "$0.00",
            "shippingAmountInclTax": 0,
            "formattedShippingAmountInclTax": "$0.00",
            "baseShippingAmountInclTax": 0,
            "formattedBaseShippingAmountInclTax": "$0.00",
            "shippingTaxAmount": 0,
            "formattedShippingTaxAmount": "$0.00",
            "baseShippingTaxAmount": 0,
            "formattedBaseShippingTaxAmount": "$0.00",

            "transactionId": null,
            "reminders": 0,
            "nextReminderAt": null,
            "createdAt": "2024-07-01 06:41:14",
            "updatedAt": "2026-05-29 13:30:32",

            "orderStatus": "processing",
            "orderStatusLabel": "Processing",
            "orderDate": "2024-07-01 06:41:14",
            "channelName": "bagisto store",
            "customerName": "John Doe",
            "customerEmail": "john.doe@example.com",

            "billingAddress": {
              "id": 268,
              "addressType": "order_billing",
              "firstName": "John",
              "lastName": "Doe",
              "companyName": "Acme Trades",
              "address": "21 Market Street",
              "city": "Los Angeles",
              "state": "CA",
              "country": "US",
              "postcode": "90001",
              "email": "john.doe@example.com",
              "phone": "5551234567"
            },
            "shippingAddress": {
              "id": 267,
              "addressType": "order_shipping",
              "firstName": "John",
              "lastName": "Doe",
              "companyName": "Acme Trades",
              "address": "21 Market Street",
              "city": "Los Angeles",
              "state": "CA",
              "country": "US",
              "postcode": "90001",
              "email": "john.doe@example.com",
              "phone": "5551234567"
            },
            "items": [
              {
                "id": 1,
                "orderItemId": 70,
                "sku": "Head13",
                "name": "Bagisto Cowboy Hat",
                "qty": 2,
                "price": 4000,
                "formattedPrice": "$4,000.00",
                "basePrice": 4000,
                "basePriceInclTax": 4000,
                "total": 8000,
                "formattedTotal": "$8,000.00",
                "baseTotal": 8000,
                "baseTotalInclTax": 8000,
                "taxAmount": 0,
                "formattedTaxAmount": "$0.00",
                "discountAmount": 0,
                "formattedDiscountAmount": "$0.00",
                "productId": 122,
                "productType": "simple",
                "baseImageUrl": "https://example.com/storage/product/122/cowboy-hat.webp",
                "additional": {
                  "locale": "en",
                  "quantity": 2,
                  "product_id": "122"
                }
              }
            ]
          }
        }
      }
---

# Get Invoice

GraphQL counterpart of `GET /api/admin/invoices/{id}`. Returns a single invoice with the full totals breakdown, the order/customer context, the billing & shipping addresses, and the invoiced line items — everything the listing leaves out.

## Operation

| Operation | Type |
|-----------|------|
| `adminInvoice(id: ID!)` | Query |

Pass the invoice IRI (`/api/admin/invoices/{id}`) as `id`. Requires the `sales.invoices.view` permission. All admin endpoints require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

::: tip Identifier vs IRI
`id` is the resource IRI (`/api/admin/invoices/1`); `_id` is the plain numeric id (`1`). Use the IRI for the `id` argument.
:::

::: warning Objects & lists are returned whole
`billingAddress`, `shippingAddress`, and `items` are returned as JSON — **query them bare, without a sub-selection** (`items`, not `items { … }`). The whole object/array comes back with all the keys documented below. (`items` is **not** a cursor connection — there is no `edges { node { … } }` wrapper.)
:::

## Invoice fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | Resource identifier (IRI form). |
| `_id` | `Int` | Numeric invoice id. |
| `incrementId` | `String` | Human-facing invoice number. |
| `orderId` | `Int` | Id of the parent order. |
| `orderIncrementId` | `String` | Human-facing number of the parent order. |
| `state` | `String` | Invoice state — `pending`, `pending_payment`, `paid`, `overdue`, `refunded`. |
| `emailSent` | `Boolean` | Whether the invoice email was sent to the customer. |
| `totalQty` | `Int` | Total quantity invoiced. |

### Currency codes

| Field | Type | Description |
|-------|------|-------------|
| `orderCurrencyCode` | `String` | Currency the order/invoice was placed in (e.g. `USD`). |
| `baseCurrencyCode` | `String` | The store's base currency. |
| `channelCurrencyCode` | `String` | The sales channel's currency. |

### Totals

Every money total is provided in the **order** currency and the store's **base** currency, each with a `formatted*` string carrying the currency symbol. Sub-total and shipping additionally expose an **incl-tax** variant.

| Field | Type | Description |
|-------|------|-------------|
| `subTotal` / `formattedSubTotal` | `Float` / `String` | Line-items subtotal (order currency). |
| `baseSubTotal` / `formattedBaseSubTotal` | `Float` / `String` | Subtotal (base currency). |
| `subTotalInclTax` / `formattedSubTotalInclTax` | `Float` / `String` | Subtotal including tax (order currency). |
| `baseSubTotalInclTax` / `formattedBaseSubTotalInclTax` | `Float` / `String` | Subtotal including tax (base currency). |
| `grandTotal` / `formattedGrandTotal` | `Float` / `String` | Invoice total (order currency). |
| `baseGrandTotal` / `formattedBaseGrandTotal` | `Float` / `String` | Invoice total (base currency). |
| `taxAmount` / `formattedTaxAmount` | `Float` / `String` | Tax total (order currency). |
| `baseTaxAmount` / `formattedBaseTaxAmount` | `Float` / `String` | Tax total (base currency). |
| `discountAmount` / `formattedDiscountAmount` | `Float` / `String` | Discount total (order currency). |
| `baseDiscountAmount` / `formattedBaseDiscountAmount` | `Float` / `String` | Discount total (base currency). |
| `shippingAmount` / `formattedShippingAmount` | `Float` / `String` | Shipping total (order currency). |
| `baseShippingAmount` / `formattedBaseShippingAmount` | `Float` / `String` | Shipping total (base currency). |
| `shippingAmountInclTax` / `formattedShippingAmountInclTax` | `Float` / `String` | Shipping incl. tax (order currency). |
| `baseShippingAmountInclTax` / `formattedBaseShippingAmountInclTax` | `Float` / `String` | Shipping incl. tax (base currency). |
| `shippingTaxAmount` / `formattedShippingTaxAmount` | `Float` / `String` | Tax on shipping (order currency). |
| `baseShippingTaxAmount` / `formattedBaseShippingTaxAmount` | `Float` / `String` | Tax on shipping (base currency). |

### Status & timestamps

| Field | Type | Description |
|-------|------|-------------|
| `transactionId` | `String` | Payment transaction reference (null until captured). |
| `reminders` | `Int` | Number of payment reminders sent (for pending invoices). |
| `nextReminderAt` | `String` | When the next payment reminder is scheduled (null if none). |
| `createdAt` | `String` | When the invoice was created. |
| `updatedAt` | `String` | When the invoice was last updated. |

### Order & customer context

Resolved from the parent order so the invoice can be rendered without a second call.

| Field | Type | Description |
|-------|------|-------------|
| `orderStatus` | `String` | Parent order status code (e.g. `processing`). |
| `orderStatusLabel` | `String` | Human-readable order status. |
| `orderDate` | `String` | When the parent order was placed. |
| `channelName` | `String` | Sales channel the order belongs to. |
| `customerName` | `String` | Customer's full name. |
| `customerEmail` | `String` | Customer's email. |

### Addresses (`billingAddress`, `shippingAddress`)

JSON objects (query bare). Each contains:

| Key | Type | Description |
|-----|------|-------------|
| `id` | `Int` | Address id. |
| `addressType` | `String` | `order_billing` or `order_shipping`. |
| `firstName` / `lastName` | `String` | Recipient name. |
| `companyName` | `String` | Company (nullable). |
| `address` | `String` | Street address. |
| `city` / `state` / `country` / `postcode` | `String` | Location. |
| `email` / `phone` | `String` | Contact details. |

### Line items (`items`)

JSON array (query bare). Each element contains:

| Key | Type | Description |
|-----|------|-------------|
| `id` | `Int` | Invoice-item id. |
| `orderItemId` | `Int` | Id of the order item this line was invoiced from. |
| `sku` | `String` | Product SKU. |
| `name` | `String` | Product name as ordered. |
| `qty` | `Int` | Quantity invoiced for this line. |
| `price` / `formattedPrice` | `Float` / `String` | Unit price (order currency). |
| `basePrice` | `Float` | Unit price (base currency). |
| `basePriceInclTax` | `Float` | Unit price incl. tax (base currency). |
| `total` / `formattedTotal` | `Float` / `String` | Line total (order currency). |
| `baseTotal` | `Float` | Line total (base currency). |
| `baseTotalInclTax` | `Float` | Line total incl. tax (base currency). |
| `taxAmount` / `formattedTaxAmount` | `Float` / `String` | Tax for this line. |
| `discountAmount` / `formattedDiscountAmount` | `Float` / `String` | Discount for this line. |
| `productId` | `Int` | Id of the product. |
| `productType` | `String` | Product type — `simple`, `configurable`, `bundle`, etc. |
| `baseImageUrl` | `String` | URL of the product's base image (null if none). |
| `additional` | `JSON` | Extra item data (selected options, configurable attributes, etc.). |

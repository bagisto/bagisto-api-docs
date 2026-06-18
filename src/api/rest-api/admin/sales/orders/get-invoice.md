---
outline: false
apiType: rest
examples:
  - id: admin-get-invoice
    title: Get Invoice
    description: Fetch a single invoice with the full totals breakdown, order/customer context, billing & shipping addresses, and embedded line items.
    query: |
      curl -X GET "https://your-domain.com/api/admin/invoices/1" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      {}
    response: |
      {
        "id": 1,
        "incrementId": "1",
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

        "order": {
          "id": 58,
          "addresses": [
            {
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
            {
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
            }
          ]
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
    commonErrors:
      - error: Not Found (404)
        cause: Unknown invoice ID
        solution: Verify the invoice ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Get Invoice

Returns a single invoice with the full totals breakdown, the order/customer context, the billing & shipping addresses, and the invoiced line items — no follow-up calls required. Requires the `sales.invoices.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/invoices/{id}` | GET |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Numeric invoice id. |
| `incrementId` | String | Human-facing invoice number. |
| `orderIncrementId` | String | Human-facing number of the parent order. (Numeric order id is `order.id`.) |
| `state` | String | Invoice state — `pending`, `pending_payment`, `paid`, `overdue`. |
| `emailSent` | Boolean | Whether the invoice email was sent to the customer. |
| `totalQty` | Integer | Total quantity invoiced. |

### Currency codes

| Field | Type | Description |
|-------|------|-------------|
| `orderCurrencyCode` | String | Currency the order/invoice was placed in. |
| `baseCurrencyCode` | String | The store's base currency. |
| `channelCurrencyCode` | String | The sales channel's currency. |

### Totals

Each money total is provided in the **order** currency and the store's **base** currency, with a `formatted*` string carrying the currency symbol. Sub-total and shipping additionally expose an **incl-tax** variant.

| Field | Type | Description |
|-------|------|-------------|
| `subTotal` / `formattedSubTotal` | Number / String | Line-items subtotal (order currency). |
| `baseSubTotal` / `formattedBaseSubTotal` | Number / String | Subtotal (base currency). |
| `subTotalInclTax` / `formattedSubTotalInclTax` | Number / String | Subtotal incl. tax (order currency). |
| `baseSubTotalInclTax` / `formattedBaseSubTotalInclTax` | Number / String | Subtotal incl. tax (base currency). |
| `grandTotal` / `formattedGrandTotal` | Number / String | Invoice total (order currency). |
| `baseGrandTotal` / `formattedBaseGrandTotal` | Number / String | Invoice total (base currency). |
| `taxAmount` / `formattedTaxAmount` | Number / String | Tax total (order currency). |
| `baseTaxAmount` / `formattedBaseTaxAmount` | Number / String | Tax total (base currency). |
| `discountAmount` / `formattedDiscountAmount` | Number / String | Discount total (order currency). |
| `baseDiscountAmount` / `formattedBaseDiscountAmount` | Number / String | Discount total (base currency). |
| `shippingAmount` / `formattedShippingAmount` | Number / String | Shipping total (order currency). |
| `baseShippingAmount` / `formattedBaseShippingAmount` | Number / String | Shipping total (base currency). |
| `shippingAmountInclTax` / `formattedShippingAmountInclTax` | Number / String | Shipping incl. tax (order currency). |
| `baseShippingAmountInclTax` / `formattedBaseShippingAmountInclTax` | Number / String | Shipping incl. tax (base currency). |
| `shippingTaxAmount` / `formattedShippingTaxAmount` | Number / String | Tax on shipping (order currency). |
| `baseShippingTaxAmount` / `formattedBaseShippingTaxAmount` | Number / String | Tax on shipping (base currency). |

### Status & timestamps

| Field | Type | Description |
|-------|------|-------------|
| `transactionId` | String | Payment transaction reference (null until captured). |
| `reminders` | Integer | Number of payment reminders sent (for pending invoices). |
| `nextReminderAt` | String | When the next payment reminder is scheduled (null if none). |
| `createdAt` | String | When the invoice was created. |
| `updatedAt` | String | When the invoice was last updated. |

### Order & customer context

Resolved from the parent order so the invoice can be rendered without a second call.

| Field | Type | Description |
|-------|------|-------------|
| `orderStatus` | String | Parent order status code. |
| `orderStatusLabel` | String | Human-readable order status. |
| `orderDate` | String | When the parent order was placed. |
| `channelName` | String | Sales channel the order belongs to. |
| `customerName` | String | Customer's full name. |
| `customerEmail` | String | Customer's email. |

### Order & addresses (`order`)

The invoice's billing & shipping addresses live on the order: `order` is `{ id, addresses: [...] }`. Each entry in `order.addresses` has: `id`, `addressType` (`order_billing` / `order_shipping` — distinguishes billing vs shipping), `firstName`, `lastName`, `companyName` (nullable), `address`, `city`, `state`, `country`, `postcode`, `email`, `phone`.

### Line items (`items`)

Array of objects, each with:

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Invoice-item id. |
| `orderItemId` | Integer | Id of the order item this line was invoiced from. |
| `sku` | String | Product SKU. |
| `name` | String | Product name as ordered. |
| `qty` | Integer | Quantity invoiced for this line. |
| `price` / `formattedPrice` | Number / String | Unit price (order currency). |
| `basePrice` | Number | Unit price (base currency). |
| `basePriceInclTax` | Number | Unit price incl. tax (base currency). |
| `total` / `formattedTotal` | Number / String | Line total (order currency). |
| `baseTotal` | Number | Line total (base currency). |
| `baseTotalInclTax` | Number | Line total incl. tax (base currency). |
| `taxAmount` / `formattedTaxAmount` | Number / String | Tax for this line. |
| `discountAmount` / `formattedDiscountAmount` | Number / String | Discount for this line. |
| `productId` | Integer | Id of the product. |
| `productType` | String | Product type — `simple`, `configurable`, `bundle`, etc. |
| `baseImageUrl` | String | URL of the product's base image (null if none). |
| `additional` | Object | Extra item data (selected options, configurable attributes, etc.). |

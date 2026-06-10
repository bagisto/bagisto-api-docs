---
outline: false
apiType: rest
examples:
  - id: admin-get-refund
    title: Get Refund
    description: Fetch a single refund with the full totals breakdown (incl. adjustments), order/customer context, payment info, billing & shipping addresses, and embedded line items.
    query: |
      curl -X GET "https://your-domain.com/api/admin/refunds/1" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      {}
    response: |
      {
        "id": 1,
        "orderId": 105,
        "orderIncrementId": "105",
        "state": "refunded",
        "emailSent": true,
        "totalQty": 3,

        "orderCurrencyCode": "USD",
        "baseCurrencyCode": "USD",
        "channelCurrencyCode": "USD",

        "subTotal": 4203,
        "formattedSubTotal": "$4,203.00",
        "baseSubTotal": 4203,
        "formattedBaseSubTotal": "$4,203.00",
        "subTotalInclTax": 4203,
        "formattedSubTotalInclTax": "$4,203.00",
        "baseSubTotalInclTax": 4203,
        "formattedBaseSubTotalInclTax": "$4,203.00",

        "grandTotal": 4233,
        "formattedGrandTotal": "$4,233.00",
        "baseGrandTotal": 4233,
        "formattedBaseGrandTotal": "$4,233.00",

        "taxAmount": 0,
        "formattedTaxAmount": "$0.00",
        "baseTaxAmount": 0,
        "formattedBaseTaxAmount": "$0.00",

        "discountAmount": 0,
        "formattedDiscountAmount": "$0.00",
        "baseDiscountAmount": 0,
        "formattedBaseDiscountAmount": "$0.00",

        "shippingAmount": 30,
        "formattedShippingAmount": "$30.00",
        "baseShippingAmount": 30,
        "formattedBaseShippingAmount": "$30.00",
        "shippingAmountInclTax": 30,
        "formattedShippingAmountInclTax": "$30.00",
        "baseShippingAmountInclTax": 30,
        "formattedBaseShippingAmountInclTax": "$30.00",
        "shippingTaxAmount": 0,
        "formattedShippingTaxAmount": "$0.00",
        "baseShippingTaxAmount": 0,
        "formattedBaseShippingTaxAmount": "$0.00",

        "adjustmentRefund": 0,
        "formattedAdjustmentRefund": "$0.00",
        "baseAdjustmentRefund": 0,
        "formattedBaseAdjustmentRefund": "$0.00",
        "adjustmentFee": 0,
        "formattedAdjustmentFee": "$0.00",
        "baseAdjustmentFee": 0,
        "formattedBaseAdjustmentFee": "$0.00",

        "createdAt": "2026-05-20 14:00:00",
        "updatedAt": "2026-05-20 14:00:02",

        "billedTo": "John Doe",
        "orderStatus": "closed",
        "orderStatusLabel": "Closed",
        "orderDate": "2026-05-19 16:47:17",
        "channelName": "bagisto store",
        "customerName": "John Doe",
        "customerEmail": "john.doe@example.com",

        "paymentMethod": "cashondelivery",
        "paymentTitle": "Cash On Delivery",
        "shippingMethod": "flatrate_flatrate",
        "shippingTitle": "Flat Rate - Flat Rate",

        "billingAddress": {
          "id": 493,
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
          "id": 492,
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
            "orderItemId": 119,
            "sku": "Nike-Shoes",
            "name": "Nike Shoes",
            "qty": 1,
            "price": 123,
            "formattedPrice": "$123.00",
            "basePrice": 123,
            "basePriceInclTax": 123,
            "total": 123,
            "formattedTotal": "$123.00",
            "baseTotal": 123,
            "baseTotalInclTax": 123,
            "taxAmount": 0,
            "formattedTaxAmount": "$0.00",
            "discountAmount": 0,
            "formattedDiscountAmount": "$0.00",
            "productId": 114,
            "productType": "simple",
            "baseImageUrl": "https://example.com/storage/product/114/nike-shoes.webp",
            "additional": { "locale": "en", "quantity": 1, "product_id": "114" }
          }
        ]
      }
    commonErrors:
      - error: Not Found (404)
        cause: Unknown refund ID
        solution: Verify the refund ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token in the Authorization header. See the Authentication page.
---

# Get Refund

Returns a single refund with the full totals breakdown (including the adjustment refund/fee), the order/customer context, payment info, the billing & shipping addresses, and the refunded line items — no follow-up calls required. Requires the `sales.refunds.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/refunds/{id}` | GET |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Refund id. |
| `orderId` | Integer | Parent order id. |
| `orderIncrementId` | String | Human-facing order number. |
| `state` | String | Refund state (e.g. `refunded`). |
| `emailSent` | Boolean | Whether the refund email was sent. |
| `totalQty` | Integer | Total quantity refunded. |

### Currency codes

`orderCurrencyCode`, `baseCurrencyCode`, `channelCurrencyCode`.

### Totals

Each money total is provided in the **order** currency and the store's **base** currency with a `formatted*` string; sub-total and shipping also expose **incl-tax** variants.

| Field | Type | Description |
|-------|------|-------------|
| `subTotal` / `formattedSubTotal` (+ `base*`, `*InclTax`, `base*InclTax`) | Number / String | Refunded line-items subtotal. |
| `grandTotal` / `formattedGrandTotal` (+ `base*`) | Number / String | Refund grand total. |
| `taxAmount` (+ `base*`, `formatted*`) | Number / String | Tax refunded. |
| `discountAmount` (+ `base*`, `formatted*`) | Number / String | Discount refunded. |
| `shippingAmount` (+ `base*`, `*InclTax`, `base*InclTax`, `formatted*`) | Number / String | Shipping refunded. |
| `shippingTaxAmount` (+ `base*`, `formatted*`) | Number / String | Tax on refunded shipping. |
| `adjustmentRefund` (+ `base*`, `formatted*`) | Number / String | Extra amount refunded beyond line items. |
| `adjustmentFee` (+ `base*`, `formatted*`) | Number / String | Amount withheld from the refund. |

### Status, timestamps & order/customer context

`createdAt`, `updatedAt`, `billedTo`, `orderStatus`, `orderStatusLabel`, `orderDate`, `channelName`, `customerName`, `customerEmail`.

### Payment info

| Field | Type | Description |
|-------|------|-------------|
| `paymentMethod` | String | Payment method code of the order. |
| `paymentTitle` | String | Human-readable payment method title. |
| `shippingMethod` | String | Shipping method code. |
| `shippingTitle` | String | Human-readable shipping method title. |

### Addresses (`billingAddress`, `shippingAddress`)

Objects with: `id`, `addressType`, `firstName`, `lastName`, `companyName` (nullable), `address`, `city`, `state`, `country`, `postcode`, `email`, `phone`.

### Line items (`items`)

Array of objects, each with: `id`, `orderItemId`, `sku`, `name`, `qty`, `price`/`formattedPrice`, `basePrice`, `basePriceInclTax`, `total`/`formattedTotal`, `baseTotal`, `baseTotalInclTax`, `taxAmount`/`formattedTaxAmount`, `discountAmount`/`formattedDiscountAmount`, `productId`, `productType`, `baseImageUrl`, `additional`.

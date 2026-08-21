---
outline: false
examples:
  - id: admin-get-refund
    title: Get Refund
    description: Fetch a single refund with the full totals/adjustment breakdown, order/customer context, payment info, billing & shipping addresses, and embedded line items.
    query: |
      query GetRefund($id: ID!) {
        adminRefund(id: $id) {
          id
          _id
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
          baseSubTotalInclTax

          grandTotal
          formattedGrandTotal
          baseGrandTotal
          formattedBaseGrandTotal

          taxAmount
          baseTaxAmount
          discountAmount
          baseDiscountAmount

          shippingAmount
          baseShippingAmount
          shippingAmountInclTax
          shippingTaxAmount

          adjustmentRefund
          formattedAdjustmentRefund
          baseAdjustmentRefund
          adjustmentFee
          formattedAdjustmentFee
          baseAdjustmentFee

          createdAt
          updatedAt
          billedTo
          orderStatus
          orderStatusLabel
          orderDate
          channelName
          customerName
          customerEmail

          paymentMethod
          paymentTitle
          shippingMethod
          shippingTitle

          billingAddress
          shippingAddress
          items
        }
      }
    variables: |
      {
        "id": "/api/admin/refunds/1"
      }
    response: |
      {
        "data": {
          "adminRefund": {
            "id": "/api/admin/refunds/1",
            "_id": 1,
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
            "baseSubTotalInclTax": 4203,

            "grandTotal": 4233,
            "formattedGrandTotal": "$4,233.00",
            "baseGrandTotal": 4233,
            "formattedBaseGrandTotal": "$4,233.00",

            "taxAmount": 0,
            "baseTaxAmount": 0,
            "discountAmount": 0,
            "baseDiscountAmount": 0,

            "shippingAmount": 30,
            "baseShippingAmount": 30,
            "shippingAmountInclTax": 30,
            "shippingTaxAmount": 0,

            "adjustmentRefund": 0,
            "formattedAdjustmentRefund": "$0.00",
            "baseAdjustmentRefund": 0,
            "adjustmentFee": 0,
            "formattedAdjustmentFee": "$0.00",
            "baseAdjustmentFee": 0,

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
                "discountAmount": 0,
                "productId": 114,
                "productType": "simple",
                "baseImageUrl": "https://example.com/storage/product/114/nike-shoes.webp",
                "additional": { "locale": "en", "quantity": 1, "product_id": "114" }
              }
            ]
          }
        }
      }
---

# Get Refund

GraphQL counterpart of `GET /api/admin/refunds/{id}`. Returns a single refund with the full totals/adjustment breakdown, order/customer context, payment info, billing & shipping addresses, and the refunded line items. Requires the `sales.refunds.view` permission.

## Operation

| Operation | Type |
|-----------|------|
| `adminRefund(id: ID!)` | Query |

Pass the refund IRI (`/api/admin/refunds/{id}`) as `id`.

### Identifier vs IRI

`id` is the resource IRI; `_id` is the plain numeric id. Use the IRI for the `id` argument.

### Objects & lists are returned whole

`billingAddress`, `shippingAddress`, and `items` are returned as JSON — **query them bare, without a sub-selection** (`items`, not `items { … }`). The whole object/array comes back. `items` is **not** a cursor connection.

## Fields

Same field set as the REST [Get Refund](/api/rest-api/admin/sales/orders/get-refund) — every refund column (in order + base currency, with `formatted*` and incl-tax variants), the adjustment refund/fee, order/customer context, payment info, the two address objects, and the line `items`.

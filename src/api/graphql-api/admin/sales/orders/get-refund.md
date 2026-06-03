---
outline: false
examples:
  - id: admin-get-refund
    title: Get Refund
    description: Fetch a single refund with the full totals/adjustment breakdown and embedded line items.
    query: |
      query GetRefund($id: ID!) {
        adminRefund(id: $id) {
          id
          _id
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
          shippingAmount
          formattedShippingAmount
          taxAmount
          formattedTaxAmount
          discountAmount
          formattedDiscountAmount
          adjustmentRefund
          formattedAdjustmentRefund
          adjustmentFee
          formattedAdjustmentFee
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
        "id": "/api/admin/refunds/12"
      }
    response: |
      {
        "data": {
          "adminRefund": {
            "id": "/api/admin/refunds/12",
            "_id": 12,
            "orderId": 2392,
            "orderIncrementId": "2000000392",
            "state": "refunded",
            "orderCurrencyCode": "USD",
            "totalQty": 1,
            "subTotal": 29.99,
            "formattedSubTotal": "$29.99",
            "grandTotal": 39.99,
            "formattedGrandTotal": "$39.99",
            "baseGrandTotal": 39.99,
            "formattedBaseGrandTotal": "$39.99",
            "shippingAmount": 10,
            "formattedShippingAmount": "$10.00",
            "taxAmount": 0,
            "formattedTaxAmount": "$0.00",
            "discountAmount": 0,
            "formattedDiscountAmount": "$0.00",
            "adjustmentRefund": 0,
            "formattedAdjustmentRefund": "$0.00",
            "adjustmentFee": 0,
            "formattedAdjustmentFee": "$0.00",
            "createdAt": "2026-05-20 09:42:11",
            "updatedAt": "2026-05-20 09:42:11",
            "items": {
              "edges": [
                {
                  "node": {
                    "id": 210,
                    "orderItemId": 1042,
                    "sku": "WS-12-S",
                    "name": "Argus All-Weather Tank-S",
                    "qty": 1,
                    "price": 29.99,
                    "formattedPrice": "$29.99",
                    "total": 29.99,
                    "formattedTotal": "$29.99",
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

# Get Refund

GraphQL counterpart of `GET /api/admin/refunds/{id}`. Returns a single refund with the full totals/adjustment breakdown and its embedded line items — everything the listing leaves out.

## Operation

| Operation | Type |
|-----------|------|
| `adminRefund(id: ID!)` | Query |

Pass the refund IRI (`/api/admin/refunds/{id}`) as `id`. Permission: `sales.refunds.view`.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | Resource identifier (IRI form). |
| `_id` | `Int` | Numeric refund id. |
| `orderId` | `Int` | Id of the parent order. |
| `orderIncrementId` | `String` | Human-facing number of the parent order. |
| `state` | `String` | Refund state — e.g. `refunded`. |
| `orderCurrencyCode` | `String` | Currency the order was placed in (e.g. `USD`). |
| `totalQty` | `Int` | Total quantity refunded. |
| `subTotal` | `Float` | Line-items subtotal refunded (order currency). |
| `formattedSubTotal` | `String` | `subTotal` formatted. |
| `grandTotal` | `Float` | Total amount refunded, in the **order's** currency. |
| `formattedGrandTotal` | `String` | `grandTotal` with the currency symbol. |
| `baseGrandTotal` | `Float` | Refund total in the **store's base** currency. |
| `formattedBaseGrandTotal` | `String` | `baseGrandTotal` with the base-currency symbol. |
| `shippingAmount` | `Float` | Shipping amount refunded (order currency). |
| `formattedShippingAmount` | `String` | `shippingAmount` formatted. |
| `taxAmount` | `Float` | Tax amount refunded. |
| `formattedTaxAmount` | `String` | `taxAmount` formatted. |
| `discountAmount` | `Float` | Discount adjustment on the refund. |
| `formattedDiscountAmount` | `String` | `discountAmount` formatted. |
| `adjustmentRefund` | `Float` | Manual "refund extra" adjustment added by the admin. |
| `formattedAdjustmentRefund` | `String` | `adjustmentRefund` formatted. |
| `adjustmentFee` | `Float` | Manual "refund fee" adjustment withheld by the admin. |
| `formattedAdjustmentFee` | `String` | `adjustmentFee` formatted. |
| `billedTo` | `String` | Name on the order's billing address. Populated on the **listing**; on this detail query read the billing name from the order instead. |
| `createdAt` | `String` | When the refund was created. |
| `updatedAt` | `String` | When the refund was last updated. |
| `items` | `[RefundItem]` | Refunded line items — see the table below. |

### Item fields (`items`)

`items` is a **cursor connection** — wrap the fields in `edges { node { … } }`, e.g. `items { edges { node { sku qty formattedTotal … } } }`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Refund-item id. |
| `orderItemId` | `Int` | Id of the order item this line was refunded from. |
| `sku` | `String` | Product SKU. |
| `name` | `String` | Product name as ordered. |
| `qty` | `Int` | Quantity refunded for this line. |
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

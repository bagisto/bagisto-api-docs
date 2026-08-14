---
outline: false
examples:
  - id: admin-create-invoice
    title: Create Invoice
    description: Create an invoice for one or more order items.
    query: |
      mutation CreateInvoice($input: createAdminInvoiceInput!) {
        createAdminInvoice(input: $input) {
          adminInvoice {
            id
            _id
            incrementId
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

            order {
              _id
              incrementId
              status
              statusLabel
              channelName
              customerEmail
              customerFirstName
              customerLastName
            }
          }
        }
      }
    variables: |
      {
          "input": {
              "orderId": 2392,
              "items": [
                  { "orderItemId": 42, "quantity": 3 },
                  { "orderItemId": 43, "quantity": 1 }
              ],
              "canCreateTransaction": true
          }
      }
    response: |
      {
        "data": {
          "createAdminInvoice": {
            "adminInvoice": {
              "id": "/api/admin/invoices/88",
              "_id": 88,
              "incrementId": "88",
              "orderIncrementId": "2392",
              "state": "paid",
              "emailSent": false,
              "totalQty": 4,

              "orderCurrencyCode": "USD",
              "baseCurrencyCode": "USD",
              "channelCurrencyCode": "USD",

              "subTotal": 14000,
              "formattedSubTotal": "$14,000.00",
              "baseSubTotal": 14000,
              "formattedBaseSubTotal": "$14,000.00",
              "subTotalInclTax": 14000,
              "formattedSubTotalInclTax": "$14,000.00",
              "baseSubTotalInclTax": 14000,
              "formattedBaseSubTotalInclTax": "$14,000.00",

              "grandTotal": 14000,
              "formattedGrandTotal": "$14,000.00",
              "baseGrandTotal": 14000,
              "formattedBaseGrandTotal": "$14,000.00",

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
              "createdAt": "2026-05-21 11:40:08",
              "updatedAt": "2026-05-21 11:40:08",

              "orderStatus": "processing",
              "orderStatusLabel": "Processing",
              "orderDate": "2026-05-19 13:13:29",
              "channelName": "bagisto store",
              "customerName": "Test User",
              "customerEmail": "admin@example.com",

              "order": {
                "_id": 2392,
                "incrementId": "2392",
                "status": "processing",
                "statusLabel": "Processing",
                "channelName": "bagisto store",
                "customerEmail": "admin@example.com",
                "customerFirstName": "Test",
                "customerLastName": "User"
              }
            }
          }
        }
      }
---

# Create Invoice

Creates an invoice for one or more order items. The same eligibility checks as
the admin Invoice screen apply (the order must not be closed, marked fraud, or
paid through PayPal Standard — those orders are hard-blocked from invoicing).
Each item's requested quantity is validated against its still-invoiceable
quantity, `qty_to_invoice`, before the invoice is created.

The mutation returns the created invoice's **scalar fields** plus the linked
**`order`** object (the full order resource — see [Get Order Detail](/api/graphql-api/admin/sales/orders/order-detail)
for every `order` sub-field). The nested **`items`** connection and the
**`order { addresses { edges { node } } }`** connection are **not** resolved on a
mutation payload — fetch them with a follow-up
[`adminInvoice(id:)`](/api/graphql-api/admin/sales/orders/get-invoice) query
(or REST `GET /api/admin/invoices/{id}`) using the returned `id` / `_id`.

**Prerequisites** — The example targets an order with invoiceable items. If your order has no items with `qty_to_invoice > 0` (already fully invoiced / closed / fraud / paypal_standard payment method) the mutation returns *"There is nothing to invoice on this order."* — pick an order with outstanding qty to invoice.

## Operation

| Operation | Type |
|-----------|------|
| `createAdminInvoice` | Mutation |

## Input

| Field | Type | Description |
|-------|------|-------------|
| `orderId` | `Int!` | The order to invoice. |
| `items` | `[{ orderItemId, quantity }]!` | One entry per order item, with the quantity to invoice. Each `quantity` must be ≤ that item's still-invoiceable `qty_to_invoice`. |
| `canCreateTransaction` | `Boolean` | Optional, default `false`. The admin **Create Transaction** checkbox — when `true`, also records an order transaction for the invoice amount against the order's payment method. |

## Response shape notes

- The mutation payload resolves the invoice's **scalar fields** + the `order`
  object's **scalar fields** (it's the full order resource — `_id`, `incrementId`,
  `status`, `statusLabel`, `channelName`, `customerEmail`, `customerFirstName`,
  `customerLastName`, totals, … — see [Get Order Detail](/api/graphql-api/admin/sales/orders/order-detail)
  for the complete list). It does **not** resolve the `items` connection or
  `order { addresses }` — those are available on the
  [`adminInvoice(id:)`](/api/graphql-api/admin/sales/orders/get-invoice) detail
  query (where `items { edges { node } }` and `order { addresses { edges { node } } }`
  resolve fully).
- There is **no top-level `orderId`** — the order id is `order { _id }`.
- `id` is the resource IRI (`/api/admin/invoices/88`); `_id` is the numeric id.

## Errors

| Condition | Message |
|-----------|---------|
| Order is `closed` | Closed orders cannot be invoiced. |
| Order is `fraud`  | Fraud orders cannot be invoiced. |
| Order paid with PayPal Standard | Invoices cannot be created for orders paid through PayPal Standard. |
| Nothing to invoice | There is nothing to invoice on this order. |
| No permission | You do not have permission to create invoices. |
| Items missing | At least one item with a positive quantity is required. |
| Qty exceeds available | Requested quantity exceeds the available quantity for the given SKU (the message names the SKU and both quantities). |
| Save failed | Could not create the invoice. |

---
outline: false
examples:
  - id: admin-invoices-list-gql
    title: List Invoices (Datagrid)
    description: Cursor-paginated invoices listing. Every invoice column is populated on each row — query whichever ones you need.
    query: |
      query AdminInvoices($first: Int, $after: String) {
        adminInvoices(first: $first, after: $after) {
          edges {
            cursor
            node {
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
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "adminInvoices": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/invoices/560",
                  "_id": 560,
                  "incrementId": "560",
                  "orderId": 2392,
                  "orderIncrementId": "2392",
                  "state": "paid",
                  "emailSent": true,
                  "totalQty": 1,

                  "orderCurrencyCode": "USD",
                  "baseCurrencyCode": "USD",
                  "channelCurrencyCode": "USD",

                  "subTotal": 4000,
                  "formattedSubTotal": "$4,000.00",
                  "baseSubTotal": 4000,
                  "formattedBaseSubTotal": "$4,000.00",
                  "subTotalInclTax": 4000,
                  "formattedSubTotalInclTax": "$4,000.00",
                  "baseSubTotalInclTax": 4000,
                  "formattedBaseSubTotalInclTax": "$4,000.00",

                  "grandTotal": 4000,
                  "formattedGrandTotal": "$4,000.00",
                  "baseGrandTotal": 4000,
                  "formattedBaseGrandTotal": "$4,000.00",

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
                  "createdAt": "2026-05-19 13:13:30",
                  "updatedAt": "2026-05-29 13:30:32",

                  "orderStatus": "processing",
                  "orderStatusLabel": "Processing",
                  "orderDate": "2026-05-19 13:13:29",
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
                  }
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "OQ=="
            },
            "totalCount": 562
          }
        }
      }
---

# List Invoices

GraphQL counterpart of `GET /api/admin/invoices`. Returns a cursor-paginated list of invoices — every invoice **column** is populated on each row, so you can query whichever fields you need without a follow-up call. Requires the `sales.invoices.view` permission. All admin endpoints require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).

## Operation

`adminInvoices(first, after, id, order_id, state, base_grand_total_from, base_grand_total_to, created_at_from, created_at_to, date_range, sort, order)` — a cursor `QueryCollection`. Every REST query parameter is also exposed as a GraphQL argument; see the [REST page](/api/rest-api/admin/sales/invoices/list) for the full argument table.

::: tip What's on the listing
Every **column** of the invoice (state, totals, currency codes, reminders, timestamps), the order/customer context (`customerName`, `customerEmail`, `orderStatus`, `orderStatusLabel`, `orderDate`, `channelName`), **and** the `billingAddress` / `shippingAddress` objects are returned on every listing row. Only `items` (the line items) is left empty (`[]`) on the listing — it's the one heavy per-row relation; fetch it with [Get Invoice](/api/graphql-api/admin/sales/orders/get-invoice). The field set is otherwise identical to the single-invoice query.
:::

## Fields

Same field set as [Get Invoice](/api/graphql-api/admin/sales/orders/get-invoice) — see that page for the full per-field reference. Summary of what the **listing** populates:

| Group | Fields | On listing |
|-------|--------|:---------:|
| Identity | `id`, `_id`, `incrementId`, `orderId`, `orderIncrementId`, `state`, `emailSent`, `totalQty` | ✓ |
| Currency codes | `orderCurrencyCode`, `baseCurrencyCode`, `channelCurrencyCode` | ✓ |
| Totals | `subTotal*`, `grandTotal*`, `taxAmount*`, `discountAmount*`, `shippingAmount*` (each in order + base currency, with `formatted*` and incl-tax variants) | ✓ |
| Status & timestamps | `transactionId`, `reminders`, `nextReminderAt`, `createdAt`, `updatedAt` | ✓ |
| Order & customer | `orderStatus`, `orderStatusLabel`, `orderDate`, `channelName`, `customerName`, `customerEmail` | ✓ |
| Addresses | `billingAddress`, `shippingAddress` (JSON objects — query bare) | ✓ |
| Line items | `items` | **detail only** (`[]` on listing) |

::: warning A `null` here means the DB is genuinely empty
Listing rows return the actual stored value for every column. If a field comes back `null` (e.g. `baseCurrencyCode`, `transactionId`, `customerName`), that row has no value stored for it — it is **not** the listing withholding data. Only `items` is deliberately omitted on the listing.
:::

**Amounts — which one to show.** Use `formattedGrandTotal` for a viewer working in the order's currency, and `baseGrandTotal` / `formattedBaseGrandTotal` for reporting in the store's base currency. For a single-currency store the two are identical.

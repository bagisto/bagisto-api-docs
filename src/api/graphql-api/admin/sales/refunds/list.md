---
outline: false
examples:
  - id: admin-refunds-list-gql
    title: List Refunds (Datagrid)
    description: Cursor-paginated refunds datagrid. Every refund column plus the billing/shipping addresses are populated on each row — only line items and payment info are detail-only.
    query: |
      query AdminRefunds($first: Int, $after: String) {
        adminRefunds(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
              orderId
              orderIncrementId
              state
              emailSent
              totalQty
              orderCurrencyCode
              baseCurrencyCode
              subTotal
              formattedSubTotal
              baseSubTotal
              grandTotal
              formattedGrandTotal
              baseGrandTotal
              formattedBaseGrandTotal
              taxAmount
              discountAmount
              shippingAmount
              adjustmentRefund
              adjustmentFee
              billedTo
              orderStatus
              orderStatusLabel
              channelName
              customerName
              customerEmail
              billingAddress
              shippingAddress
              createdAt
              updatedAt
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
          "adminRefunds": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/refunds/1",
                  "_id": 1,
                  "orderId": 105,
                  "orderIncrementId": "105",
                  "state": "refunded",
                  "emailSent": true,
                  "totalQty": 3,
                  "orderCurrencyCode": "USD",
                  "baseCurrencyCode": "USD",
                  "subTotal": 4203,
                  "formattedSubTotal": "$4,203.00",
                  "baseSubTotal": 4203,
                  "grandTotal": 4233,
                  "formattedGrandTotal": "$4,233.00",
                  "baseGrandTotal": 4233,
                  "formattedBaseGrandTotal": "$4,233.00",
                  "taxAmount": 0,
                  "discountAmount": 0,
                  "shippingAmount": 30,
                  "adjustmentRefund": 0,
                  "adjustmentFee": 0,
                  "billedTo": "John Doe",
                  "orderStatus": "closed",
                  "orderStatusLabel": "Closed",
                  "channelName": "bagisto store",
                  "customerName": "John Doe",
                  "customerEmail": "john.doe@example.com",
                  "billingAddress": {
                    "id": 493,
                    "addressType": "order_billing",
                    "firstName": "John",
                    "lastName": "Doe",
                    "city": "Los Angeles",
                    "country": "US",
                    "postcode": "90001"
                  },
                  "shippingAddress": {
                    "id": 492,
                    "addressType": "order_shipping",
                    "firstName": "John",
                    "lastName": "Doe",
                    "city": "Los Angeles",
                    "country": "US",
                    "postcode": "90001"
                  },
                  "createdAt": "2026-05-20 14:00:00",
                  "updatedAt": "2026-05-20 14:00:02"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }

---

# List Refunds (Datagrid)

GraphQL counterpart of `GET /api/admin/refunds`. Returns a cursor-paginated list of refunds — the same rows shown on the admin **Sales → Refunds** datagrid. Every refund **column** plus the billing/shipping addresses are populated on each row; only the line `items` and payment info are detail-only.

## Operation

`adminRefunds(first, after, id, order_id, state, base_grand_total_from, base_grand_total_to, billed_to, created_at_from, created_at_to, sort, order)` — a cursor `QueryCollection`. Every REST query parameter is also exposed as a GraphQL argument; see the [REST page](/api/rest-api/admin/sales/refunds/list) for the full argument table.

## Permission

`sales.refunds.view`

::: warning Address objects are returned whole
`billingAddress` and `shippingAddress` are returned as JSON — **query them bare, without a sub-selection** (`billingAddress`, not `billingAddress { … }`). The whole object comes back.
:::

## Fields

Every refund column is populated on each row (currency codes, all `base_*` / `formatted*` / incl-tax variants, the adjustment refund/fee, order & customer context, and both address objects). Only `items` (the refunded line items) and the payment info (`paymentMethod`, `paymentTitle`, `shippingMethod`, `shippingTitle`) are **detail-only** — they return `null` on the listing and are filled when you fetch the refund by id with `adminRefund(id:)`. The full field reference is on the [Get Refund](/api/graphql-api/admin/sales/orders/get-refund) page.

**Amounts — which one to show.** Use `formattedGrandTotal` for a viewer working in the order's currency, and `baseGrandTotal` / `formattedBaseGrandTotal` for reporting in the store's base currency. For a single-currency store the two are identical.

## Listing vs. full record

The listing already carries every column — the only reason to fetch a single refund is to read its line `items` and payment info, which are skipped on the listing because loading items for every row of a large list would be expensive. Typical flow: list with `adminRefunds`, read `_id` from the row you want, then fetch the full record with `adminRefund(id:)`.

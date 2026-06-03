---
outline: false
examples:
  - id: admin-refunds-list-gql
    title: List Refunds (Datagrid)
    description: Cursor-paginated refunds datagrid listing. Returns the slim datagrid columns for each refund — query the single-refund endpoint for line items and the full totals breakdown.
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
              grandTotal
              formattedGrandTotal
              baseGrandTotal
              formattedBaseGrandTotal
              billedTo
              createdAt
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
                  "id": "/api/admin_refund_list_dtos/1",
                  "_id": 1,
                  "orderId": 105,
                  "orderIncrementId": "2000000105",
                  "state": "refunded",
                  "grandTotal": 4233,
                  "formattedGrandTotal": "$4,233.00",
                  "baseGrandTotal": 4233,
                  "formattedBaseGrandTotal": "$4,233.00",
                  "billedTo": "John Doe",
                  "createdAt": "2026-05-18 09:42:11"
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

GraphQL counterpart of `GET /api/admin/refunds`. Returns a cursor-paginated list of refunds, one slim row per refund — the same columns shown on the admin **Sales → Refunds** datagrid.

## Operation

`adminRefunds(first, after, id, order_id, state, base_grand_total_from, base_grand_total_to, billed_to, created_at_from, created_at_to, sort, order)` — a cursor `QueryCollection`. Every REST query parameter is also exposed as a GraphQL argument; see the [REST page](/api/rest-api/admin/sales/refunds/list) for the full argument table.

## Permission

`sales.refunds.view`

## Fields

Every field below is part of the refund node, so all are valid to query. The **On listing** column tells you which are populated by `adminRefunds`: a ✓ field is filled on every row; a **detail** field returns `null` on the listing and is populated when you fetch the refund by id (`adminRefund(id:)`). The example above queries only the ✓ fields, which is what you normally want for a datagrid.

| Field | Type | On listing | Description |
|-------|------|:---------:|-------------|
| `id` | `ID` | ✓ | Resource identifier (IRI form). |
| `_id` | `Int` | ✓ | Numeric refund id — use this to fetch the full refund. |
| `orderId` | `Int` | ✓ | Id of the order this refund belongs to. |
| `orderIncrementId` | `String` | ✓ | Human-facing number of the parent order. |
| `state` | `String` | ✓ | Refund state — e.g. `refunded`. |
| `grandTotal` | `Float` | ✓ | Total amount refunded, in the **order's** currency. |
| `formattedGrandTotal` | `String` | ✓ | `grandTotal` with the currency symbol (e.g. `"$4,233.00"`). |
| `baseGrandTotal` | `Float` | ✓ | Refund total in the **store's base** currency. |
| `formattedBaseGrandTotal` | `String` | ✓ | `baseGrandTotal` with the base-currency symbol. |
| `billedTo` | `String` | ✓ | Name on the order's billing address (who was refunded). |
| `createdAt` | `String` | ✓ | When the refund was created. |
| `orderCurrencyCode` | `String` | detail | Currency the order was placed in (e.g. `USD`). |
| `totalQty` | `Int` | detail | Total quantity refunded. |
| `subTotal` | `Float` | detail | Line-items subtotal refunded (order currency). |
| `formattedSubTotal` | `String` | detail | `subTotal` formatted. |
| `shippingAmount` | `Float` | detail | Shipping amount refunded (order currency). |
| `formattedShippingAmount` | `String` | detail | `shippingAmount` formatted. |
| `taxAmount` | `Float` | detail | Tax amount refunded. |
| `formattedTaxAmount` | `String` | detail | `taxAmount` formatted. |
| `discountAmount` | `Float` | detail | Discount adjustment on the refund. |
| `formattedDiscountAmount` | `String` | detail | `discountAmount` formatted. |
| `adjustmentRefund` | `Float` | detail | Manual "refund extra" adjustment added by the admin. |
| `formattedAdjustmentRefund` | `String` | detail | `adjustmentRefund` formatted. |
| `adjustmentFee` | `Float` | detail | Manual "refund fee" adjustment withheld by the admin. |
| `formattedAdjustmentFee` | `String` | detail | `adjustmentFee` formatted. |
| `updatedAt` | `String` | detail | When the refund was last updated. |
| `items` | `[RefundItem]` | detail | Refunded line items (a **cursor connection** — query `items { edges { node { sku qty price formattedTotal ... } } }`). |

**Amounts — which one to show.** Use `formattedGrandTotal` for a viewer working in the order's currency, and `baseGrandTotal` / `formattedBaseGrandTotal` for reporting in the store's base currency. For a single-currency store the two are identical.

## Listing vs. full record

The listing is a **slim datagrid** — it returns the ✓ columns above for fast paginated browsing. The **detail** fields are not "empty data"; the values exist on the refund record, but loading them (especially `items`) for every row of a large list would be expensive, so the listing leaves them out. Fetch them by id with the single-refund query — see [Get Refund](/api/graphql-api/admin/sales/orders/get-refund). Typical flow: list with `adminRefunds`, read `_id` from the row you want, then fetch the full record.

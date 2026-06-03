---
outline: false
examples:
  - id: admin-invoices-list-gql
    title: List Invoices (Datagrid)
    description: Cursor-paginated invoices datagrid listing. Returns the slim datagrid columns for each invoice — query the single-invoice endpoint for line items and the full totals breakdown.
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
              grandTotal
              formattedGrandTotal
              baseGrandTotal
              formattedBaseGrandTotal
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
          "adminInvoices": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin_invoice_list_dtos/566",
                  "_id": 566,
                  "incrementId": "566",
                  "orderId": 2404,
                  "orderIncrementId": "2000000460",
                  "state": "paid",
                  "grandTotal": 4010,
                  "formattedGrandTotal": "$4,010.00",
                  "baseGrandTotal": 4010,
                  "formattedBaseGrandTotal": "$4,010.00",
                  "createdAt": "2026-05-29 13:30:32"
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

# List Invoices (Datagrid)

GraphQL counterpart of `GET /api/admin/invoices`. Returns a cursor-paginated list of invoices, one slim row per invoice — the same columns shown on the admin **Sales → Invoices** datagrid.

## Operation

`adminInvoices(first, after, id, order_id, state, base_grand_total_from, base_grand_total_to, created_at_from, created_at_to, date_range, sort, order)` — a cursor `QueryCollection`. Every REST query parameter is also exposed as a GraphQL argument; see the [REST page](/api/rest-api/admin/sales/invoices/list) for the full argument table.

## Permission

`sales.invoices.view`

## Fields

Every field below is part of the invoice node, so all are valid to query. The **On listing** column tells you which are populated by `adminInvoices`: a ✓ field is filled on every row; a **detail** field returns `null` on the listing and is populated when you fetch the invoice by id (`adminInvoice(id:)`). The example above queries only the ✓ fields, which is what you normally want for a datagrid.

| Field | Type | On listing | Description |
|-------|------|:---------:|-------------|
| `id` | `ID` | ✓ | Resource identifier (IRI form). |
| `_id` | `Int` | ✓ | Numeric invoice id — use this to fetch the full invoice. |
| `incrementId` | `String` | ✓ | Human-facing invoice number. |
| `orderId` | `Int` | ✓ | Id of the order this invoice belongs to. |
| `orderIncrementId` | `String` | ✓ | Human-facing number of the parent order. |
| `state` | `String` | ✓ | Invoice state — e.g. `paid`, `pending`, `refunded`. |
| `grandTotal` | `Float` | ✓ | Invoice total in the **order's** currency. |
| `formattedGrandTotal` | `String` | ✓ | `grandTotal` with the currency symbol (e.g. `"$4,010.00"`). |
| `baseGrandTotal` | `Float` | ✓ | Invoice total in the **store's base** currency. |
| `formattedBaseGrandTotal` | `String` | ✓ | `baseGrandTotal` with the base-currency symbol. |
| `createdAt` | `String` | ✓ | When the invoice was created. |
| `orderCurrencyCode` | `String` | detail | Currency the order/invoice was placed in (e.g. `USD`). |
| `totalQty` | `Int` | detail | Total quantity invoiced. |
| `subTotal` | `Float` | detail | Line-items subtotal (order currency). |
| `formattedSubTotal` | `String` | detail | `subTotal` formatted. |
| `taxAmount` | `Float` | detail | Tax total (order currency). |
| `formattedTaxAmount` | `String` | detail | `taxAmount` formatted. |
| `discountAmount` | `Float` | detail | Discount total (order currency). |
| `formattedDiscountAmount` | `String` | detail | `discountAmount` formatted. |
| `shippingAmount` | `Float` | detail | Shipping total (order currency). |
| `formattedShippingAmount` | `String` | detail | `shippingAmount` formatted. |
| `emailSent` | `Boolean` | detail | Whether the invoice email was sent to the customer. |
| `transactionId` | `String` | detail | Payment transaction reference. |
| `updatedAt` | `String` | detail | When the invoice was last updated. |
| `items` | `[InvoiceItem]` | detail | Invoiced line items (a **cursor connection** — query `items { edges { node { sku qty price formattedTotal ... } } }`). |

**Amounts — which one to show.** Use `formattedGrandTotal` for a viewer working in the order's currency, and `baseGrandTotal` / `formattedBaseGrandTotal` for reporting in the store's base currency. For a single-currency store the two are identical.

## Listing vs. full record

The listing is a **slim datagrid** — it returns the ✓ columns above for fast paginated browsing. The **detail** fields are not "empty data"; the values exist on the invoice record, but loading them (especially `items`) for every row of a large list would be expensive, so the listing leaves them out. Fetch them by id with the single-invoice query — see [Get Invoice](/api/graphql-api/admin/sales/orders/get-invoice). Typical flow: list with `adminInvoices`, read `_id` from the row you want, then fetch the full record.

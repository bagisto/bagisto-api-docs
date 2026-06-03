---
outline: false
examples:
  - id: admin-transactions-list-gql
    title: List Transactions (Datagrid)
    description: Cursor-paginated transactions datagrid listing. Returns the slim datagrid columns for each payment transaction — query the single-transaction endpoint for the gateway payload and the linked order summary.
    query: |
      query AdminTransactions($first: Int, $after: String, $status: String) {
        adminTransactions(first: $first, after: $after, status: $status) {
          edges {
            cursor
            node {
              id
              _id
              transactionId
              invoiceId
              orderId
              orderIncrementId
              amount
              formattedAmount
              status
              type
              paymentMethod
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
        "first": 10,
        "status": "paid"
      }
    response: |
      {
        "data": {
          "adminTransactions": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin_transaction_list_dtos/4",
                  "_id": 4,
                  "transactionId": "TXN-2000000460",
                  "invoiceId": 12,
                  "orderId": 8,
                  "orderIncrementId": "2000000460",
                  "amount": 99.99,
                  "formattedAmount": "$99.99",
                  "status": "paid",
                  "type": "order",
                  "paymentMethod": "cashondelivery",
                  "createdAt": "2026-05-20 12:35:00"
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

# List Transactions (Datagrid)

GraphQL counterpart of `GET /api/admin/transactions`. Returns a cursor-paginated list of payment transactions, one slim row per transaction — the same columns shown on the admin **Sales → Transactions** datagrid.

## Operation

`adminTransactions(first, after, id, transaction_id, invoice_id, order_id, status, created_at_from, created_at_to, sort, order)` — a cursor `QueryCollection`. Every REST query parameter is also exposed as a GraphQL argument; see the [REST page](/api/rest-api/admin/sales/transactions/list) for the full argument table.

## Permission

`sales.transactions.view`

## Fields

Every field the listing returns is shown below. The listing columns are a **subset** of the full transaction record, so every documented list field is populated on every row — there are no "empty until you fetch by id" fields here. The **On listing** column marks ✓ for fields the listing returns; a **detail** field is not part of the row and is only available from the single-transaction query (`adminTransaction(id:)`).

| Field | Type | On listing | Description |
|-------|------|:---------:|-------------|
| `id` | `ID` | ✓ | Resource identifier (IRI form). |
| `_id` | `Int` | ✓ | Numeric transaction id — use this to fetch the full record. |
| `transactionId` | `String` | ✓ | Gateway transaction reference. |
| `invoiceId` | `Int` | ✓ | Id of the invoice this transaction settled (null for non-invoice transactions). |
| `orderId` | `Int` | ✓ | Id of the order this transaction belongs to. |
| `orderIncrementId` | `String` | ✓ | Human-facing number of the parent order. |
| `amount` | `Float` | ✓ | Transaction amount. |
| `formattedAmount` | `String` | ✓ | `amount` with the currency symbol (e.g. `"$99.99"`). |
| `status` | `String` | ✓ | Transaction status — e.g. `paid`, `pending`. |
| `type` | `String` | ✓ | Transaction type — e.g. `order`. |
| `paymentMethod` | `String` | ✓ | Payment method used — e.g. `cashondelivery`. |
| `createdAt` | `String` | ✓ | When the transaction was recorded. |
| `paymentTitle` | `String` | detail | Human-readable payment-method title. |
| `data` | `JSON` | detail | Raw gateway response payload. |
| `updatedAt` | `String` | detail | When the transaction was last updated. |
| `order` | `Order` | detail | Slim summary of the linked order (id, increment, status, total, currency, customer email). |

## Listing vs. full record

The listing is a **slim datagrid** built for fast paginated browsing. Unlike invoices, shipments, or refunds, the transaction listing fields are not "trimmed" values — every column above is fully populated on each row. The single-transaction query simply adds a few extra fields (`paymentTitle`, the gateway `data` payload, `updatedAt`, and the nested `order` summary) that are too heavy or too specific for a datagrid row. Fetch them by id — see [Transaction Detail](/api/graphql-api/admin/sales/transactions/detail). Typical flow: list with `adminTransactions`, read `_id` from the row you want, then fetch the full record.

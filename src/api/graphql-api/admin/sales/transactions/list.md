---
outline: false
examples:
  - id: admin-transactions-list-gql
    title: List Transactions (Datagrid)
    description: Cursor-paginated transactions datagrid. Every transaction column plus the raw gateway data blob and the linked order summary is populated on each row.
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
              paymentTitle
              data
              createdAt
              updatedAt
              order
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
                  "id": "/api/admin/transactions/4",
                  "_id": 4,
                  "transactionId": "pi_3PqXyz9aBcD",
                  "invoiceId": 12,
                  "orderId": 8,
                  "orderIncrementId": "00000000008",
                  "amount": 99.99,
                  "formattedAmount": "$99.99",
                  "status": "paid",
                  "type": "capture",
                  "paymentMethod": "cashondelivery",
                  "paymentTitle": "Cash On Delivery",
                  "data": { "gateway": "offline", "captured": true },
                  "createdAt": "2026-05-20 12:35:00",
                  "updatedAt": "2026-05-20 12:35:00",
                  "order": {
                    "id": 8,
                    "incrementId": "00000000008",
                    "status": "processing",
                    "customerName": "John Doe",
                    "customerEmail": "john.doe@example.com",
                    "grandTotal": 99.99,
                    "orderCurrencyCode": "USD"
                  }
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

GraphQL counterpart of `GET /api/admin/transactions`. Returns a cursor-paginated list of payment transactions — the same rows shown on the admin **Sales → Transactions** datagrid. Every transaction **column** plus the raw gateway `data` blob and the linked `order` summary are populated on each row.

## Operation

`adminTransactions(first, after, id, transaction_id, invoice_id, order_id, status, created_at_from, created_at_to, sort, order)` — a cursor `QueryCollection`. Every REST query parameter is also exposed as a GraphQL argument; see the [REST page](/api/rest-api/admin/sales/transactions/list) for the full argument table.

## Permission

`sales.transactions.view`

### Data and order are returned whole

`data` (the gateway payload) and `order` (the order summary) are returned as JSON — **query them bare, without a sub-selection** (`data` / `order`, not `order { … }`). The whole object comes back. See the field reference below for the keys inside each.

## Fields

Every field is populated on each row — the transaction columns, the resolved `paymentTitle`, the raw gateway `data` object, and the `order` summary.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | Resource IRI of the transaction (`/api/admin/transactions/{id}`). |
| `_id` | `Int` | Transaction row id. |
| `transactionId` | `String` | Gateway transaction id. |
| `invoiceId` | `Int` | The invoice this transaction paid (if any). |
| `orderId` / `orderIncrementId` | `Int` / `String` | Parent order id and human-facing number. |
| `amount` / `formattedAmount` | `Float` / `String` | Transaction amount, raw and formatted. |
| `status` | `String` | Transaction status — e.g. `paid`, `pending`. |
| `type` | `String` | Transaction type — e.g. `capture`. |
| `paymentMethod` / `paymentTitle` | `String` | Payment method code and its human-readable title. |
| `data` | JSON | The verbatim gateway response payload — query bare; shape varies by gateway; may be `null`. |
| `createdAt` / `updatedAt` | `String` | Timestamps. |
| `order` | JSON | Slim order summary (query bare) — `id`, `incrementId`, `status`, `customerName`, `customerEmail`, `grandTotal`, `orderCurrencyCode`. |

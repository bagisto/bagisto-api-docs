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

GraphQL counterpart of `GET /api/admin/transactions`. Returns a cursor-paginated list of payment transactions — the same rows shown on the admin **Sales → Transactions** datagrid. Every transaction **column** plus the raw gateway `data` blob and the linked `order` summary are populated on each row, so the field set is identical to [Transaction Detail](/api/graphql-api/admin/sales/transactions/detail).

## Operation

`adminTransactions(first, after, id, transaction_id, invoice_id, order_id, status, created_at_from, created_at_to, sort, order)` — a cursor `QueryCollection`. Every REST query parameter is also exposed as a GraphQL argument; see the [REST page](/api/rest-api/admin/sales/transactions/list) for the full argument table.

## Permission

`sales.transactions.view`

::: warning data and order are returned whole
`data` (the gateway payload) and `order` (the order summary) are returned as JSON — **query them bare, without a sub-selection** (`data` / `order`, not `order { … }`). The whole object comes back. See [Transaction Detail](/api/graphql-api/admin/sales/transactions/detail) for the keys inside each.
:::

## Fields

Every field is populated on each row — the transaction columns, the resolved `paymentTitle`, the raw gateway `data` object, and the `order` summary. The full per-field reference is on the [Transaction Detail](/api/graphql-api/admin/sales/transactions/detail) page.

## Listing vs. fetching one

The listing already carries the full payload — fetching a single transaction by id (`adminTransaction(id:)`) is only needed when you already hold a transaction id and want just that record. Typical flow: list with `adminTransactions`, read `_id` from the row you want, then fetch the full record.

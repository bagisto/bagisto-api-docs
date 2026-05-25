---
outline: false
examples:
  - id: admin-transactions-list-gql
    title: List Transactions (Datagrid)
    description: Cursor-paginated transactions listing.
    query: |
      query AdminTransactions($first: Int, $after: String, $status: String) {
        adminTransactions(first: $first, after: $after, status: $status) {
          edges {
            cursor
            node { id _id transactionId invoiceId orderId amount status type paymentMethod createdAt }
          }
          pageInfo { hasNextPage endCursor }
          totalCount
        }
      }
    variables: |
      { "first": 10, "status": "paid" }
    response: |
      {
        "data": {
          "adminTransactions": {
            "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/transactions/4", "_id": 4, "transactionId": "pi_3PqXyz", "invoiceId": 12, "orderId": 8, "amount": 99.99, "status": "paid", "type": "capture", "paymentMethod": "cashondelivery", "createdAt": "2026-05-20 12:35:00" } }],
            "pageInfo": { "hasNextPage": false, "endCursor": "MA==" },
            "totalCount": 1
          }
        }
      }
---

# List Transactions (Datagrid)

GraphQL counterpart of `GET /api/admin/transactions`. See REST page for argument table.

Permission: `sales.transactions.view`.

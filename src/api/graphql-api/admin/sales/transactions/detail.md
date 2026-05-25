---
outline: false
examples:
  - id: admin-transaction-detail-gql
    title: Transaction Detail
    description: Get a single transaction by id with order summary inlined.
    query: |
      query AdminTransaction($id: ID!) {
        adminTransaction(id: $id) {
          id _id
          transactionId
          invoiceId
          orderId
          amount
          status
          type
          paymentMethod
          data
          order { id incrementId status grandTotal orderCurrencyCode customerEmail }
          createdAt
        }
      }
    variables: |
      { "id": "/api/admin/transactions/4" }
    response: |
      {
        "data": {
          "adminTransaction": {
            "id": "/api/admin/transactions/4",
            "_id": 4,
            "transactionId": "pi_3PqXyz",
            "invoiceId": 12,
            "orderId": 8,
            "amount": 99.99,
            "status": "paid",
            "type": "capture",
            "paymentMethod": "cashondelivery",
            "data": { "gateway_payload": "..." },
            "order": { "id": 8, "incrementId": "00000000008", "status": "complete", "grandTotal": 99.99, "orderCurrencyCode": "USD", "customerEmail": "jane@example.com" },
            "createdAt": "2026-05-20 12:35:00"
          }
        }
      }
---

# Transaction Detail

GraphQL counterpart of `GET /api/admin/transactions/{id}`. Permission: `sales.transactions.view`.

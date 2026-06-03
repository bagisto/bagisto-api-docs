---
outline: false
examples:
  - id: admin-transaction-detail-gql
    title: Transaction Detail
    description: Fetch a single payment transaction by id, with the gateway payload and a summary of the linked order inlined.
    query: |
      query AdminTransaction($id: ID!) {
        adminTransaction(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/transactions/4"
      }
    response: |
      {
        "data": {
          "adminTransaction": {
            "id": "/api/admin/transactions/4",
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
            "paymentTitle": "Cash On Delivery",
            "data": {
              "gateway": "cashondelivery",
              "captured": true,
              "reference": "TXN-2000000460"
            },
            "createdAt": "2026-05-20 12:35:00",
            "updatedAt": "2026-05-20 12:35:00",
            "order": {
              "id": 8,
              "incrementId": "2000000460",
              "status": "complete",
              "grandTotal": 99.99,
              "orderCurrencyCode": "USD",
              "customerEmail": "jane@example.com"
            }
          }
        }
      }
---

# Transaction Detail

GraphQL counterpart of `GET /api/admin/transactions/{id}`. Returns a single payment transaction with the gateway payload and a slim summary of the linked order inlined — everything the listing leaves out.

## Operation

| Operation | Type |
|-----------|------|
| `adminTransaction(id: ID!)` | Query |

Pass the transaction IRI (`/api/admin/transactions/{id}`) as `id`. Permission: `sales.transactions.view`.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | Resource identifier (IRI form). |
| `_id` | `Int` | Numeric transaction id. |
| `transactionId` | `String` | Gateway transaction reference. |
| `invoiceId` | `Int` | Id of the invoice this transaction settled (null for non-invoice transactions). |
| `orderId` | `Int` | Id of the parent order. |
| `orderIncrementId` | `String` | Human-facing number of the parent order. |
| `amount` | `Float` | Transaction amount. |
| `formattedAmount` | `String` | `amount` with the currency symbol (e.g. `"$99.99"`). |
| `status` | `String` | Transaction status — e.g. `paid`, `pending`. |
| `type` | `String` | Transaction type — e.g. `order`. |
| `paymentMethod` | `String` | Payment method used — e.g. `cashondelivery`. |
| `paymentTitle` | `String` | Human-readable payment-method title. |
| `data` | `JSON` | Raw gateway response payload — see below. |
| `createdAt` | `String` | When the transaction was recorded. |
| `updatedAt` | `String` | When the transaction was last updated. |
| `order` | `Order` | Slim summary of the order this transaction belongs to — see the table below. |

### Gateway payload (`data`)

`data` is a free-form JSON object holding the raw response the payment gateway returned for this transaction. Its shape varies by payment method, so query it as a whole (`data`) and read the keys you need on the client. For offline methods such as `cashondelivery` it may be minimal or empty.

### Order summary (`order`)

`order` is returned as a whole JSON object — query it as a bare field (`order`), you cannot sub-select its keys in the query. The keys below are returned inside that object for reference.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `Int` | Id of the linked order. |
| `incrementId` | `String` | Human-facing order number. |
| `status` | `String` | Order status — e.g. `complete`, `processing`. |
| `grandTotal` | `Float` | Order grand total (order currency). |
| `orderCurrencyCode` | `String` | Currency the order was placed in (e.g. `USD`). |
| `customerEmail` | `String` | Email of the customer who placed the order. |

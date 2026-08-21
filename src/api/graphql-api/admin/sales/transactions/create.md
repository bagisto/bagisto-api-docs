---
outline: false
examples:
  - id: admin-transactions-create-gql
    title: Create Transaction
    description: Record a full or partial payment against an invoice. Returns the created transaction. When the recorded payments reach the invoice total the invoice is marked paid and the order status advances.
    query: |
      mutation CreateAdminTransaction($input: createAdminTransactionInput!) {
        createAdminTransaction(input: $input) {
          adminTransaction {
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
      }
    variables: |
      {
        "input": {
          "invoiceId": 12,
          "paymentMethod": "cashondelivery",
          "amount": 100
        }
      }
    response: |
      {
        "data": {
          "createAdminTransaction": {
            "adminTransaction": {
              "id": "/api/admin/transactions/5",
              "_id": 5,
              "transactionId": "8f2c1a7b9d0e4f6a3c5b8d1e2f7a9c0b4d6e8f10",
              "invoiceId": 12,
              "orderId": 8,
              "orderIncrementId": "00000000008",
              "amount": 100,
              "formattedAmount": "$100.00",
              "status": "paid",
              "type": "cashondelivery",
              "paymentMethod": "cashondelivery",
              "paymentTitle": "Cash On Delivery",
              "data": { "paidAmount": 100 },
              "createdAt": "2026-06-30 10:15:00",
              "updatedAt": "2026-06-30 10:15:00",
              "order": {
                "id": 8,
                "incrementId": "00000000008",
                "status": "processing",
                "customerName": "John Doe",
                "customerEmail": "john.doe@example.com",
                "grandTotal": 100,
                "orderCurrencyCode": "USD"
              }
            }
          }
        }
      }
---

# Create Transaction

The API equivalent of the admin **Sales → Transactions → Create** ("Record Payment") action. Records a manual payment against an invoice and returns the created transaction, which then appears in the [Transactions listing](/api/graphql-api/admin/sales/transactions/list).

Partial payments are supported. Once the cumulative recorded payments for an invoice reach its grand total, the invoice is marked **paid** and the order advances to **completed** (when it already has a shipment) or **processing**.

### Two ways to create a transaction

This mutation records an **arbitrary or partial** payment you specify (invoice, method, amount). Alternatively, the **Create Transaction** checkbox on [invoice creation](/api/graphql-api/admin/sales/orders/create-invoice) captures the **full** invoice amount in one step using the order's payment method. Both result in a transaction that appears in the Transactions listing.

## Mutation

`createAdminTransaction(input: createAdminTransactionInput!)`

## Input fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `invoiceId` | Int | Yes | The invoice to record the payment against. |
| `paymentMethod` | String | Yes | Payment method code (e.g. `cashondelivery`, `moneytransfer`). |
| `amount` | Float | Yes | Amount paid. Must be greater than `0` and cannot push the invoice's cumulative payments above its grand total. |

## Response fields

The mutation returns the created transaction under `adminTransaction`:

| Field | Type | Description |
|-------|------|-------------|
| `id` / `_id` | ID / Integer | Resource identifier and numeric transaction id. |
| `transactionId` | String | Generated transaction reference. |
| `invoiceId` | Integer | The invoice this payment was recorded against. |
| `orderId` / `orderIncrementId` | Integer / String | Parent order id and human-facing number. |
| `amount` / `formattedAmount` | Number / String | Recorded amount, raw and formatted. |
| `status` | String | Always `paid` for a recorded payment. |
| `type` / `paymentMethod` | String | The payment method code used. |
| `paymentTitle` | String | Human-readable payment method title. |
| `data` | Object | Recorded payment payload — `{ "paidAmount": <amount> }`. |
| `createdAt` / `updatedAt` | String | Timestamps. |
| `order` | Object | Slim order summary — `id`, `incrementId`, `status`, `customerName`, `customerEmail`, `grandTotal`, `orderCurrencyCode`. |

## Errors

Business-rule failures are returned in the `errors` array: an unknown invoice, an already-paid invoice, an `amount` ≤ 0, or an amount that would exceed the invoice grand total. Missing or non-numeric input fields are rejected as validation errors.

## Creating a transaction while invoicing (the "Create Transaction" checkbox)

On the order detail page, the admin invoice form has a **Create Transaction** checkbox. Ticking it records the payment automatically at the moment the invoice is created — you don't call this mutation at all.

The API equivalent is **not** a separate transaction call: it's a single flag on the [Create Invoice](/api/graphql-api/admin/sales/orders/create-invoice) mutation. Pass `canCreateTransaction: true` in the invoice input and the invoice's **full** amount is recorded as a transaction against the order's payment method in the same mutation:

```graphql
mutation CreateAdminInvoice($input: createAdminInvoiceInput!) {
  createAdminInvoice(input: $input) {
    adminInvoice {
      id
      _id
      state
    }
  }
}
```

```json
{
  "input": {
    "orderId": 8,
    "items": [ { "orderItemId": 42, "quantity": 1 } ],
    "canCreateTransaction": true
  }
}
```

The resulting transaction then appears in the [Transactions listing](/api/graphql-api/admin/sales/transactions/list), exactly like one created through this mutation.

**Which to use:**

| You want to… | Use |
|---|---|
| Record the **full** invoice amount at invoice time (one step) | [Create Invoice](/api/graphql-api/admin/sales/orders/create-invoice) with `canCreateTransaction: true` |
| Record a **partial** payment, a **later** payment, or a specific **amount/method** against an existing invoice | **This mutation** (`createAdminTransaction`) |

## Permission

`sales.transactions.view`

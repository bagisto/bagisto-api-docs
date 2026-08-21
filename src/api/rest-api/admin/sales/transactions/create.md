---
outline: false
apiType: rest
examples:
  - id: admin-transactions-create
    title: Create Transaction
    description: Record a full or partial payment against an invoice. Returns the created transaction. When the recorded payments reach the invoice total the invoice is marked paid and the order status advances.
    query: |
      curl -X POST "https://your-domain.com/api/admin/transactions" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{
          "invoiceId": 12,
          "paymentMethod": "cashondelivery",
          "amount": 100
        }'
    response: |
      {
        "id": 5,
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
---

# Create Transaction

The API equivalent of the admin **Sales → Transactions → Create** ("Record Payment") action. Records a manual payment against an invoice and returns the created transaction, which then appears in the [Transactions listing](/api/rest-api/admin/sales/transactions/list).

Partial payments are supported. Once the cumulative recorded payments for an invoice reach its grand total, the invoice is marked **paid** and the order advances to **completed** (when it already has a shipment) or **processing**.

### Two ways to create a transaction

This endpoint records an **arbitrary or partial** payment you specify (invoice, method, amount). Alternatively, the **Create Transaction** checkbox on [invoice creation](/api/rest-api/admin/sales/orders/create-invoice) captures the **full** invoice amount in one step using the order's payment method. Both result in a transaction that appears in the Transactions listing.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/transactions` | POST |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `invoiceId` | integer | Yes | The invoice to record the payment against. |
| `paymentMethod` | string | Yes | Payment method code (e.g. `cashondelivery`, `moneytransfer`). |
| `amount` | number | Yes | Amount paid. Must be greater than `0` and cannot push the invoice's cumulative payments above its grand total. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | The created transaction row id. |
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

| Status | When |
|--------|------|
| `422` | `invoiceId`, `paymentMethod`, or `amount` is missing, or `amount` is not numeric. |
| `400` | Unknown invoice, the invoice is already fully paid, `amount` ≤ 0, or the amount would exceed the invoice grand total. |
| `401` | Missing or invalid admin token. |
| `403` | Admin role lacks the required permission. |

## Creating a transaction while invoicing (the "Create Transaction" checkbox)

On the order detail page, the admin invoice form has a **Create Transaction** checkbox. Ticking it records the payment automatically at the moment the invoice is created — you don't call this endpoint at all.

The API equivalent is **not** a separate transaction call: it's a single flag on [Create Invoice](/api/rest-api/admin/sales/orders/create-invoice). Send `can_create_transaction: true` in the invoice-create body and the invoice's **full** amount is recorded as a transaction against the order's payment method in the same request:

```bash
curl -X POST "https://your-domain.com/api/admin/orders/8/invoices" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "items": [ { "orderItemId": 42, "quantity": 1 } ],
    "can_create_transaction": true
  }'
```

The resulting transaction then appears in the [Transactions listing](/api/rest-api/admin/sales/transactions/list), exactly like one created through this endpoint.

**Which to use:**

| You want to… | Use |
|---|---|
| Record the **full** invoice amount at invoice time (one step) | [Create Invoice](/api/rest-api/admin/sales/orders/create-invoice) with `can_create_transaction: true` |
| Record a **partial** payment, a **later** payment, or a specific **amount/method** against an existing invoice | **This endpoint** (`POST /api/admin/transactions`) |

## Permission

`sales.transactions.view`

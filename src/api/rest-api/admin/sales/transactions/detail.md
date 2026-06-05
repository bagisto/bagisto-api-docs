---
outline: false
apiType: rest
examples:
  - id: admin-transaction-detail
    title: Transaction Detail
    description: A single payment transaction — every column, the raw gateway data blob, and a slim order summary.
    query: |
      curl -X GET "https://your-domain.com/api/admin/transactions/4" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "id": 4,
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
---

# Transaction Detail

Returns a single payment transaction by id — every column, the raw gateway `data` blob, and a slim `order` summary so clients can render without a follow-up fetch. Requires the `sales.transactions.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/transactions/{id}` | GET |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Transaction row id. |
| `transactionId` | String | Gateway transaction id. |
| `invoiceId` | Integer | The invoice this transaction paid (if any). |
| `orderId` / `orderIncrementId` | Integer / String | Parent order id and human-facing number. |
| `amount` / `formattedAmount` | Number / String | Transaction amount, raw and formatted. |
| `status` | String | Transaction status — e.g. `paid`, `pending`. |
| `type` | String | Transaction type — e.g. `capture`. |
| `paymentMethod` / `paymentTitle` | String | Payment method code and its human-readable title. |
| `data` | Object | The verbatim gateway response payload (shape varies by gateway; may be `null`). |
| `createdAt` / `updatedAt` | String | Timestamps. |
| `order` | Object | Slim order summary — `id`, `incrementId`, `status`, `customerName`, `customerEmail`, `grandTotal`, `orderCurrencyCode`. |

## Permission

`sales.transactions.view`

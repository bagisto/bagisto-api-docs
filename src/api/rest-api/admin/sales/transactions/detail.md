---
outline: false
apiType: rest
examples:
  - id: admin-transaction-detail
    title: Transaction Detail
    description: Full transaction row + slim order summary inlined.
    query: |
      curl -X GET "https://your-domain.com/api/admin/transactions/4" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 4,
        "transactionId": "pi_3PqXyz",
        "invoiceId": 12,
        "orderId": 8,
        "amount": 99.99,
        "status": "paid",
        "type": "capture",
        "paymentMethod": "cashondelivery",
        "data": { "gateway_payload": "..." },
        "order": {
          "id": 8,
          "incrementId": "00000000008",
          "status": "complete",
          "grandTotal": 99.99,
          "orderCurrencyCode": "USD",
          "customerEmail": "jane@example.com"
        },
        "createdAt": "2026-05-20 12:35:00"
      }
---

# Transaction Detail

Get a single transaction by id. Returns the full row including the gateway
`data` JSON blob, plus a slim `order` summary so clients can render without a
follow-up fetch.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/transactions/{id}` | GET |

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Transaction row ID |

## Response Notes

- `data` carries the verbatim gateway response payload (varies by gateway).
- `order` is a 6-field summary (`id`, `incrementId`, `status`, `grandTotal`, `orderCurrencyCode`, `customerEmail`).

## Permission

`sales.transactions.view`

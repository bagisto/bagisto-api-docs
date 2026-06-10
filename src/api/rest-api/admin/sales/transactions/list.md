---
outline: false
apiType: rest
examples:
  - id: admin-transactions-list
    title: List Transactions (Datagrid)
    description: One row per payment transaction. Every column plus the raw gateway data blob and the linked order summary is populated on each row.
    query: |
      curl -X GET "https://your-domain.com/api/admin/transactions?per_page=10" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "data": [
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
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Transactions

Mirrors the admin **Sales → Transactions** datagrid. Every transaction **column** plus the raw gateway `data` blob and the linked `order` summary are populated on each row.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/transactions` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination (default `10`, cap `50`). |
| `id` | string | Filter by transaction row id (int or comma-list). |
| `transaction_id` | string | Partial gateway transaction id. |
| `invoice_id` | integer | Filter by invoice id. |
| `order_id` | string | Partial order increment number. |
| `status` | string | `paid`, `pending`, `COMPLETED`. |
| `created_at_from` / `_to` | date | Range. |
| `sort` | string | `id`, `transaction_id`, `amount`, `invoice_id`, `order_id`, `status`, `created_at`. |
| `order` | string | `asc`, `desc`. |

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

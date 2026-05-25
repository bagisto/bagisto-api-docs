---
outline: false
apiType: rest
examples:
  - id: admin-transactions-list
    title: List Transactions (Datagrid)
    description: DataGrid-parity listing of every order transaction.
    query: |
      curl -X GET "https://your-domain.com/api/admin/transactions?per_page=10" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 4,
            "transactionId": "pi_3PqXyz...",
            "invoiceId": 12,
            "orderId": 8,
            "orderIncrementId": "00000000008",
            "amount": 99.99,
            "formattedAmount": "$99.99",
            "status": "paid",
            "type": "capture",
            "paymentMethod": "cashondelivery",
            "createdAt": "2026-05-20 12:35:00"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Transactions (Datagrid)

Mirrors the admin **Sales → Transactions** datagrid.

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
| `order_id` | string | Partial match on `orders.increment_id`. |
| `status` | string | `paid`, `pending`, `COMPLETED`. |
| `created_at_from` / `_to` | date | Range. |
| `sort` | string | `id`, `transaction_id`, `amount`, `invoice_id`, `order_id`, `status`, `created_at`. |
| `order` | string | `asc`, `desc`. |

## Permission

`sales.transactions.view`

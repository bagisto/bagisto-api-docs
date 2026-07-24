---
outline: false
apiType: rest
---

# List EU Withdrawals

Mirrors the admin **Sales → EU Withdrawal** datagrid — a paginated list of every right-of-withdrawal declaration filed across all orders. The response is wrapped in a `{ data, meta }` envelope.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/eu-withdrawals` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination (default `per_page=10`, cap `50`). |
| `order_increment_id` | string | Partial match on the order increment id. |
| `customer_email` | string | Partial match on the customer email. |
| `status` | string | `received`, `refunded`, or `declined`. |
| `channel_code` | string | Filter by channel code. |
| `received_at_from` / `received_at_to` | date | Received-date range. |
| `confirmation_sent_at_from` / `confirmation_sent_at_to` | date | Confirmation-email-sent range. |
| `sort` | string | `id` (default), `received_at`, `status`. |
| `order` | string | `asc`, `desc` (default `desc`). |

## Request

```bash
curl -X GET "https://your-domain.com/api/admin/eu-withdrawals?per_page=10" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

## Response

```json
{
  "data": [
    {
      "id": 7,
      "uuid": "b2f1c0de-5a2e-4d7a-9f2e-3c1a2b4d5e6f",
      "orderId": 12,
      "orderIncrementId": "000000012",
      "customerId": 5,
      "customerName": "Jane Doe",
      "customerEmail": "jane@example.com",
      "isGuest": false,
      "channelId": 1,
      "channelCode": "default",
      "locale": "en",
      "reasonText": "Changed my mind.",
      "status": "received",
      "receivedAt": "2026-07-20T09:00:00+00:00",
      "confirmationSentAt": "2026-07-20T09:00:05+00:00",
      "finalConfirmationSentAt": null,
      "confirmationError": null,
      "declinedAt": null,
      "declinedReason": null,
      "declinedByUserId": null,
      "declinedByName": null,
      "refundedAt": null,
      "refundedByUserId": null,
      "refundedByName": null,
      "refundNote": null,
      "message": null,
      "createdAt": "2026-07-20T09:00:00+00:00",
      "updatedAt": "2026-07-20T09:00:05+00:00"
    }
  ],
  "meta": {
    "currentPage": 1,
    "perPage": 10,
    "lastPage": 1,
    "total": 1,
    "from": 1,
    "to": 1
  }
}
```

## Permission

`sales.eu_withdrawals`

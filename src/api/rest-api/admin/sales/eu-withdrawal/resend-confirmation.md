---
outline: false
apiType: rest
---

# Resend EU Withdrawal Confirmation

Re-sends the durable-medium confirmation email for a declaration in its own locale and refreshes `confirmationSentAt`. Use this when the original acknowledgement bounced or the customer requests another copy. The request body is empty.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/eu-withdrawals/{id}/resend-confirmation` | POST |

## Request

```bash
curl -X POST "https://your-domain.com/api/admin/eu-withdrawals/7/resend-confirmation" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{}'
```

## Response

```json
{
  "id": 7,
  "uuid": "b2f1c0de-5a2e-4d7a-9f2e-3c1a2b4d5e6f",
  "orderIncrementId": "000000012",
  "customerEmail": "jane@example.com",
  "status": "received",
  "confirmationSentAt": "2026-07-21T16:30:00+00:00",
  "confirmationError": null,
  "message": "Confirmation email re-sent.",
  "updatedAt": "2026-07-21T16:30:00+00:00"
}
```

## Permission

`sales.eu_withdrawals.resend_confirmation`

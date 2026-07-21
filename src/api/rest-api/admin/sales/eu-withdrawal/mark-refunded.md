---
outline: false
apiType: rest
---

# Mark EU Withdrawal Refunded

Records that a withdrawal declaration has been honoured and the customer refunded out-of-band. Sets `status` to `refunded` and records who marked it, when, and an optional note.

**Marking refunded clears any prior decline metadata** (`declinedAt`, `declinedReason`, `declinedByUserId`, `declinedByName`) so the declaration reflects a single current outcome.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/eu-withdrawals/{id}/mark-refunded` | POST |

## Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `refund_note` | string | no | A note describing how the refund was issued. |

## Request

```bash
curl -X POST "https://your-domain.com/api/admin/eu-withdrawals/7/mark-refunded" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "refund_note": "Refunded via original payment method."
  }'
```

## Response

```json
{
  "id": 7,
  "uuid": "b2f1c0de-5a2e-4d7a-9f2e-3c1a2b4d5e6f",
  "orderIncrementId": "000000012",
  "customerEmail": "jane@example.com",
  "status": "refunded",
  "declinedAt": null,
  "declinedReason": null,
  "refundedAt": "2026-07-21T14:00:00+00:00",
  "refundedByUserId": 1,
  "refundedByName": "Example Admin",
  "refundNote": "Refunded via original payment method.",
  "message": "Withdrawal marked as refunded.",
  "updatedAt": "2026-07-21T14:00:00+00:00"
}
```

## Permission

`sales.eu_withdrawals.mark_refunded`

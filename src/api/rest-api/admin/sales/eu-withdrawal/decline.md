---
outline: false
apiType: rest
---

# Decline EU Withdrawal

Declines a withdrawal declaration when the purchase is exempt from the right of withdrawal (for example a personalised good). Sets `status` to `declined` and records who declined it, when, and why.

**Declining clears any prior refund metadata** (`refundedAt`, `refundedByUserId`, `refundedByName`, `refundNote`) so the declaration reflects a single current outcome.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/eu-withdrawals/{id}/decline` | POST |

## Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `declined_reason` | string | yes | The reason the declaration is being declined. |

## Request

```bash
curl -X POST "https://your-domain.com/api/admin/eu-withdrawals/7/decline" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "declined_reason": "Item was a personalised good, exempt from withdrawal."
  }'
```

## Response

```json
{
  "id": 7,
  "uuid": "b2f1c0de-5a2e-4d7a-9f2e-3c1a2b4d5e6f",
  "orderIncrementId": "000000012",
  "customerEmail": "jane@example.com",
  "status": "declined",
  "declinedAt": "2026-07-21T15:00:00+00:00",
  "declinedReason": "Item was a personalised good, exempt from withdrawal.",
  "declinedByUserId": 1,
  "declinedByName": "Example Admin",
  "refundedAt": null,
  "refundNote": null,
  "message": "Withdrawal declined.",
  "updatedAt": "2026-07-21T15:00:00+00:00"
}
```

## Permission

`sales.eu_withdrawals.decline`

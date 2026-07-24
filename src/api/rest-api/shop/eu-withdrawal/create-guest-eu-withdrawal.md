---
outline: false
examples:
  - id: create-guest-eu-withdrawal
    title: File a Guest EU Withdrawal
    description: File an EU right-of-withdrawal declaration for a guest order, proving ownership with the order increment id and email.
    request: |
      POST /api/shop/eu-withdrawals/guest
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "order_increment_id": "1000123",
        "email": "guest@example.com",
        "reason_text": "Changed my mind."
      }
    response: |
      {
        "id": 9,
        "uuid": "a1c2e3f4-6b7c-4d8e-9a0b-1c2d3e4f5a6b",
        "orderId": 34,
        "orderIncrementId": "1000123",
        "isGuest": true,
        "customerEmail": "guest@example.com",
        "status": "received",
        "reasonText": "Changed my mind.",
        "receivedAt": "2026-07-20T09:30:00+00:00",
        "confirmationSentAt": "2026-07-20T09:30:05+00:00",
        "createdAt": "2026-07-20T09:30:00+00:00"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: order_increment_id or email is missing
        solution: Provide both the guest order number and the email used on the order
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
      - error: 404 Not Found
        cause: The order increment id and email do not match a guest order on an EU-withdrawal-enabled channel
        solution: Ensure both the order number and email match the guest order exactly
---

# File a Guest EU Withdrawal

Record an EU right-of-withdrawal declaration for a **guest** order. Ownership is proved by supplying the order increment id together with the email used on the order. The declaration is created with status `received` and the durable-medium confirmation email is triggered.

Filing is **idempotent** — a second call for the same order returns the existing declaration instead of creating a duplicate.

## Endpoint

```
POST /api/shop/eu-withdrawals/guest
```

## Authentication

This endpoint requires only the storefront key — no customer token. See the [Authentication](/api/rest-api/authentication) page.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Request Body

```json
{
  "order_increment_id": "1000123",
  "email": "guest@example.com",
  "reason_text": "Changed my mind."
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `order_increment_id` | string | Yes | The human-readable order number of the guest order. |
| `email` | string | Yes | The email address used on the guest order. |
| `reason_text` | string | No | An optional reason for withdrawing. |

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Declaration ID. |
| `uuid` | string | Stable public identifier for the declaration. |
| `orderId` | integer | Numeric ID of the order the withdrawal applies to. |
| `orderIncrementId` | string | Human-readable order number. |
| `isGuest` | boolean | Whether the declaration was filed on a guest order. |
| `customerEmail` | string | Email address tied to the declaration. |
| `status` | string | Declaration status: `received`, `declined`, `refunded`. |
| `reasonText` | string | The reason the shopper supplied, or `null`. |
| `receivedAt` | string | ISO 8601 timestamp when the declaration was received. |
| `confirmationSentAt` | string | ISO 8601 timestamp when the confirmation email was sent, or `null`. |
| `createdAt` | string | ISO 8601 creation timestamp. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `201 Created` | Declaration filed (or the existing one returned); status is `received`. |
| `400 Bad Request` | `order_increment_id` or `email` is missing. |
| `403 Forbidden` | Missing or invalid storefront key. |
| `404 Not Found` | The order increment id and email do not match a guest order on an EU-withdrawal-enabled channel. |

## Related Resources

- [File an EU Withdrawal (authenticated)](/api/rest-api/shop/eu-withdrawal/create-eu-withdrawal)
- [EU Withdrawal Overview](/api/rest-api/shop/eu-withdrawal/)

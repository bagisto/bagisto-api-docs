---
outline: false
examples:
  - id: create-eu-withdrawal
    title: File an EU Withdrawal
    description: File an EU right-of-withdrawal declaration against one of the authenticated customer's own orders.
    request: |
      POST /api/shop/eu-withdrawals
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "order_id": 12,
        "reason_text": "Changed my mind."
      }
    response: |
      {
        "id": 7,
        "uuid": "b2f1c0de-5a2e-4d7a-9f2e-3c1a2b4d5e6f",
        "orderId": 12,
        "orderIncrementId": "000000012",
        "isGuest": false,
        "customerEmail": "jane@example.com",
        "status": "received",
        "reasonText": "Changed my mind.",
        "receivedAt": "2026-07-20T09:00:00+00:00",
        "confirmationSentAt": "2026-07-20T09:00:05+00:00",
        "declinedAt": null,
        "declinedReason": null,
        "refundedAt": null,
        "refundNote": null,
        "createdAt": "2026-07-20T09:00:00+00:00",
        "updatedAt": "2026-07-20T09:00:05+00:00"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: order_id is missing
        solution: Provide the numeric ID of one of your own orders
      - error: 401 Unauthorized
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
      - error: 404 Not Found
        cause: The order is not the customer's, or the channel does not have EU withdrawal enabled
        solution: File only against your own orders on an EU-withdrawal-enabled channel
---

# File an EU Withdrawal

Record an EU right-of-withdrawal declaration against one of the authenticated customer's **own** orders. The declaration is created with status `received` and the durable-medium confirmation email is triggered.

Filing is **idempotent** — a second call for the same order returns the existing declaration instead of creating a duplicate.

## Endpoint

```
POST /api/shop/eu-withdrawals
```

## Authentication

This endpoint requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/rest-api/authentication) page.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

```json
{
  "order_id": 12,
  "reason_text": "Changed my mind."
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `order_id` | integer | Yes | The numeric ID of one of the customer's own orders. |
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
| `declinedAt` | string | ISO 8601 timestamp when the withdrawal was declined, or `null`. |
| `declinedReason` | string | Reason the store declined the withdrawal, or `null`. |
| `refundedAt` | string | ISO 8601 timestamp when the order was refunded, or `null`. |
| `refundNote` | string | Note attached to the refund, or `null`. |
| `createdAt` | string | ISO 8601 creation timestamp. |
| `updatedAt` | string | ISO 8601 last update timestamp. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `201 Created` | Declaration filed (or the existing one returned); status is `received`. |
| `400 Bad Request` | `order_id` is missing. |
| `401 Unauthorized` | Missing or invalid customer Bearer token. |
| `403 Forbidden` | Missing or invalid storefront key. |
| `404 Not Found` | The order is not the customer's, or the channel does not have EU withdrawal enabled. |

## Related Resources

- [File a Guest Withdrawal](/api/rest-api/shop/eu-withdrawal/create-guest-eu-withdrawal)
- [List EU Withdrawals](/api/rest-api/shop/eu-withdrawal/list-eu-withdrawals)
- [EU Withdrawal Overview](/api/rest-api/shop/eu-withdrawal/)

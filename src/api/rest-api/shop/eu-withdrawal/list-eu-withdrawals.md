---
outline: false
examples:
  - id: list-eu-withdrawals
    title: List Own EU Withdrawals
    description: Retrieve a paginated list of the authenticated customer's own EU right-of-withdrawal declarations, newest first.
    request: |
      GET /api/shop/eu-withdrawals
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      [
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
      ]
    commonErrors:
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
---

# List EU Withdrawals

Retrieve a list of the authenticated customer's **own** EU right-of-withdrawal declarations. Declarations are always scoped to the logged-in customer — a customer can never see another customer's declarations. Results are ordered newest first.

## Endpoint

```
GET /api/shop/eu-withdrawals
```

## Authentication

This endpoint requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/rest-api/authentication) page.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Response Fields (200 OK)

The response is a plain JSON array. Each item is a withdrawal declaration object.

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

## Empty Collection

When the customer has no declarations, the response is an empty array:

```json
[]
```

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Declarations returned. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |

## Related Resources

- [View EU Withdrawal](/api/rest-api/shop/eu-withdrawal/view-eu-withdrawal) — one declaration by id
- [File a Withdrawal](/api/rest-api/shop/eu-withdrawal/create-eu-withdrawal) — file against one of the customer's own orders
- [EU Withdrawal Overview](/api/rest-api/shop/eu-withdrawal/) — the withdrawal menu overview, including the setting that gates it

---
outline: false
examples:
  - id: view-eu-withdrawal
    title: View an EU Withdrawal
    description: Retrieve a single EU right-of-withdrawal declaration owned by the authenticated customer.
    request: |
      GET /api/shop/eu-withdrawals/7
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 404 Not Found
        cause: The declaration does not exist or is not owned by the authenticated customer
        solution: Only declaration IDs belonging to the logged-in customer can be viewed
---

# View EU Withdrawal

Retrieve a single EU right-of-withdrawal declaration **owned by the authenticated customer**. Ownership is resolved through the underlying order. If the declaration does not exist or belongs to a different customer, the endpoint returns HTTP 404 — a customer can only view their own declarations.

## Endpoint

```
GET /api/shop/eu-withdrawals/{id}
```

## Authentication

This endpoint requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/rest-api/authentication) page.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | The declaration ID. |

## Response Fields (200 OK)

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
| `200 OK` | Declaration returned. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |
| `404 Not Found` | The declaration does not exist or is not owned by the customer. |

## Related Resources

- [List EU Withdrawals](/api/rest-api/shop/eu-withdrawal/list-eu-withdrawals) — the customer's own declarations
- [File a Withdrawal](/api/rest-api/shop/eu-withdrawal/create-eu-withdrawal) — file against one of the customer's own orders
- [EU Withdrawal Overview](/api/rest-api/shop/eu-withdrawal/) — the withdrawal menu overview, including the setting that gates it

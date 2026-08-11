---
outline: false
examples:
  - id: reopen-return
    title: Reopen a Return
    description: Reopen a canceled or declined return (RMA) request back to pending.
    request: |
      POST /api/shop/returns/12/reopen
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "id": 12,
        "orderId": 45,
        "orderIncrementId": "000000045",
        "statusId": 1,
        "statusTitle": "Pending",
        "statusColor": "#FDB022",
        "canClose": true,
        "canReopen": false,
        "isExpired": false,
        "messagesCount": 2,
        "updatedAt": "2026-07-20T11:05:00.000000Z"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: The store's settings do not allow reopening returns
        solution: Reopening must be enabled in the store's admin configuration
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
      - error: 404 Not Found
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be reopened
---

# Reopen a Return

Reopen a canceled or declined return (RMA) request back to `Pending` — but only when the store's settings allow customers to reopen returns. If reopening is disabled, the endpoint returns HTTP 400. The response carries the updated return.

## Endpoint

```
POST /api/shop/returns/{id}/reopen
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
| `id` | integer | Yes | Id of the return to reopen. Must belong to the authenticated customer. |

## Request Body

No body is required — send an empty body.

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Return ID. |
| `orderId` | integer | Id of the order the item belongs to. |
| `orderIncrementId` | string | Human-readable order number. |
| `statusId` | integer | Numeric status id after the reopen — `1` (Pending). |
| `statusTitle` | string | Status label. |
| `statusColor` | string | Hex color for the status badge. |
| `canClose` | boolean | Whether the return can be closed. |
| `canReopen` | boolean | Whether the return can be reopened. |
| `isExpired` | boolean | Whether the return is past its action window. |
| `messagesCount` | integer | Number of conversation messages on the return. |
| `updatedAt` | string | ISO 8601 last update timestamp. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Return reopened. |
| `400 Bad Request` | Reopening is disabled in the store's settings. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |
| `404 Not Found` | The return does not exist or is not the customer's. |

## Related Resources

- [Cancel a Return](/api/rest-api/shop/returns/cancel-return) — withdraw a return the customer raised
- [Close a Return](/api/rest-api/shop/returns/close-return) — mark a return solved
- [Returns Overview](/api/rest-api/shop/returns/) — the returns menu overview, including the settings that gate it

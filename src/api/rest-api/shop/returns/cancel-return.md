---
outline: false
examples:
  - id: cancel-return
    title: Cancel a Return
    description: Cancel the authenticated customer's own return (RMA) request.
    request: |
      POST /api/shop/returns/12/cancel
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "id": 12,
        "orderId": 45,
        "orderIncrementId": "000000045",
        "statusId": 4,
        "statusTitle": "Canceled",
        "statusColor": "#F04438",
        "canClose": false,
        "canReopen": true,
        "isExpired": false,
        "messagesCount": 2,
        "updatedAt": "2026-07-20T11:00:00.000000Z"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: The return is already in a canceled state
        solution: A return can only be canceled once
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
      - error: 404 Not Found
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be canceled
---

# Cancel a Return

Cancel the customer's own return (RMA) request, unless it is already canceled. The response carries the updated return with its new status and action flags.

## Endpoint

```
POST /api/shop/returns/{id}/cancel
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
| `id` | integer | Yes | Id of the return to cancel. Must belong to the authenticated customer. |

## Request Body

No body is required — send an empty body.

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Return ID. |
| `orderId` | integer | Id of the order the item belongs to. |
| `orderIncrementId` | string | Human-readable order number. |
| `statusId` | integer | Numeric status id after the cancel. |
| `statusTitle` | string | Status label, e.g. `Canceled`. |
| `statusColor` | string | Hex color for the status badge. |
| `canClose` | boolean | Whether the return can be closed. |
| `canReopen` | boolean | Whether the return can be reopened. |
| `isExpired` | boolean | Whether the return is past its action window. |
| `messagesCount` | integer | Number of conversation messages on the return. |
| `updatedAt` | string | ISO 8601 last update timestamp. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Return canceled. |
| `400 Bad Request` | The return is already canceled. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |
| `404 Not Found` | The return does not exist or is not the customer's. |

## Related Resources

- [Reopen a Return](/api/rest-api/shop/returns/reopen-return) — reopen a cancelled or declined return
- [View Return](/api/rest-api/shop/returns/view-return) — one return with its status flags
- [Returns Overview](/api/rest-api/shop/returns/) — the returns menu overview, including the settings that gate it

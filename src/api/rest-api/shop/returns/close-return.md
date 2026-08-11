---
outline: false
examples:
  - id: close-return
    title: Close a Return
    description: Mark the authenticated customer's own return (RMA) request as solved.
    request: |
      POST /api/shop/returns/12/close
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "id": 12,
        "orderId": 45,
        "orderIncrementId": "000000045",
        "statusId": 3,
        "statusTitle": "Solved",
        "statusColor": "#12B76A",
        "canClose": false,
        "canReopen": false,
        "isExpired": false,
        "messagesCount": 3,
        "updatedAt": "2026-07-20T11:10:00.000000Z"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: The return is not in a state that can be closed
        solution: Only a return whose canClose flag is true can be closed
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
      - error: 404 Not Found
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be closed
---

# Close a Return

Mark the customer's own return (RMA) request as `Solved` and add a note to the conversation thread. The response carries the updated return. A return can only be closed when its `canClose` flag is `true`.

## Endpoint

```
POST /api/shop/returns/{id}/close
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
| `id` | integer | Yes | Id of the return to close. Must belong to the authenticated customer. |

## Request Body

No body is required — send an empty body.

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Return ID. |
| `orderId` | integer | Id of the order the item belongs to. |
| `orderIncrementId` | string | Human-readable order number. |
| `statusId` | integer | Numeric status id after closing — `3` (Solved). |
| `statusTitle` | string | Status label, e.g. `Solved`. |
| `statusColor` | string | Hex color for the status badge. |
| `canClose` | boolean | Whether the return can be closed. |
| `canReopen` | boolean | Whether the return can be reopened. |
| `isExpired` | boolean | Whether the return is past its action window. |
| `messagesCount` | integer | Number of conversation messages — incremented by the close note. |
| `updatedAt` | string | ISO 8601 last update timestamp. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Return closed (solved). |
| `400 Bad Request` | The return cannot be closed in its current state. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |
| `404 Not Found` | The return does not exist or is not the customer's. |

## Related Resources

- [Reopen a Return](/api/rest-api/shop/returns/reopen-return) — reopen a cancelled or declined return
- [View Return](/api/rest-api/shop/returns/view-return) — one return with its status flags
- [Returns Overview](/api/rest-api/shop/returns/) — the returns menu overview, including the settings that gate it

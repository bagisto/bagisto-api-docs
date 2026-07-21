---
outline: false
examples:
  - id: list-return-messages
    title: List Return Messages
    description: List the conversation messages of a return (RMA) request owned by the authenticated customer, newest first.
    request: |
      GET /api/shop/return-messages?return_id=12
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      [
        {
          "id": 88,
          "rmaId": 12,
          "message": "We have received your request and will inspect the item.",
          "isAdmin": true,
          "attachment": null,
          "attachmentUrl": null,
          "createdAt": "2026-07-20T10:40:00.000000Z"
        },
        {
          "id": 87,
          "rmaId": 12,
          "message": "The hoodie zipper is broken.",
          "isAdmin": false,
          "attachment": "rma/12/messages/zipper.jpg",
          "attachmentUrl": "https://example.com/storage/rma/12/messages/zipper.jpg",
          "createdAt": "2026-07-20T10:20:00.000000Z"
        }
      ]
    commonErrors:
      - error: 400 Bad Request
        cause: The return_id parameter is missing
        solution: Provide the numeric id of a return owned by the authenticated customer
      - error: 401 Unauthorized
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
      - error: 404 Not Found
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be queried
---

# List Return Messages

List the conversation thread of a return (RMA) request, newest first. The return must belong to the authenticated customer. Each message is flagged with `isAdmin` so a client can tell who sent it, and carries an optional attachment.

## Endpoint

```
GET /api/shop/return-messages
```

## Authentication

This endpoint requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/rest-api/authentication) page.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `return_id` | integer | Yes | Id of the return whose messages to list. Must belong to the authenticated customer. |

## Response Fields (200 OK)

The response is a plain JSON array. Each item is a message object.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Numeric message id. |
| `rmaId` | integer | Id of the return the message belongs to. |
| `message` | string | The message text. |
| `isAdmin` | boolean | `true` if sent by the store, `false` if sent by the customer. |
| `attachment` | string | Stored attachment path, or `null`. |
| `attachmentUrl` | string | Public URL of the attachment, or `null`. |
| `createdAt` | string | ISO 8601 message timestamp. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Messages retrieved. |
| `400 Bad Request` | `return_id` is missing. |
| `401 Unauthorized` | Missing or invalid customer Bearer token. |
| `403 Forbidden` | Missing or invalid storefront key. |
| `404 Not Found` | The return does not exist or is not the customer's. |

## Related Resources

- [Send a Return Message](/api/rest-api/shop/returns/send-return-message)
- [View Return](/api/rest-api/shop/returns/view-return)
- [Returns Overview](/api/rest-api/shop/returns/)

---
outline: false
examples:
  - id: send-return-message
    title: Send a Return Message
    description: Add a customer message to the conversation thread of a return (RMA) request.
    request: |
      POST /api/shop/return-messages
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "return_id": 12,
        "message": "Any update on my return?"
      }
    response: |
      {
        "id": 89,
        "rmaId": 12,
        "message": "Any update on my return?",
        "isAdmin": false,
        "attachment": null,
        "attachmentUrl": null,
        "createdAt": "2026-07-20T11:15:00.000000Z"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: The message field is missing
        solution: Provide a non-empty message
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
      - error: 404 Not Found
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be messaged
---

# Send a Return Message

Add a customer message to the conversation thread of a return (RMA) request. The return must belong to the authenticated customer. The created message comes back flagged `isAdmin: false`.

## Endpoint

```
POST /api/shop/return-messages
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
  "return_id": 12,
  "message": "Any update on my return?"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `return_id` | integer | Yes | Id of the return to add the message to. Must belong to the authenticated customer. |
| `message` | string | Yes | The message text. |

A file can be attached to the message by sending the request as `multipart/form-data` with a `file` field alongside the fields above, instead of a JSON body.

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Numeric message id. |
| `rmaId` | integer | Id of the return the message belongs to. |
| `message` | string | The message text. |
| `isAdmin` | boolean | `false` — the message was sent by the customer. |
| `attachment` | string | Stored attachment path, or `null`. |
| `attachmentUrl` | string | Public URL of the attachment, or `null`. |
| `createdAt` | string | ISO 8601 message timestamp. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `201 Created` | Message added to the return conversation. |
| `400 Bad Request` | `message` is missing. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |
| `404 Not Found` | The return does not exist or is not the customer's. |

## Related Resources

- [List Return Messages](/api/rest-api/shop/returns/list-return-messages) — the conversation thread on a return
- [View Return](/api/rest-api/shop/returns/view-return) — one return with its status flags
- [Returns Overview](/api/rest-api/shop/returns/) — the returns menu overview, including the settings that gate it

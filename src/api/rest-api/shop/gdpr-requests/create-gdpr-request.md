---
outline: false
examples:
  - id: create-gdpr-request
    title: Raise a GDPR Request
    description: Raise a new GDPR data request (delete or update) for the authenticated customer.
    request: |
      POST /api/shop/gdpr-requests
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "type": "delete",
        "message": "Please delete my account data."
      }
    response: |
      {
        "id": 12,
        "type": "delete",
        "status": "pending",
        "message": "Please delete my account data.",
        "email": "jane@example.com",
        "revokedAt": null,
        "createdAt": "2026-06-25T10:30:00.000000Z",
        "updatedAt": "2026-06-25T10:30:00.000000Z",
        "successMessage": "Your GDPR data request has been raised successfully.",
        "customer": {
          "_id": 7
        }
      }
    commonErrors:
      - error: 400 Bad Request
        cause: GDPR is disabled, or type/message is missing or invalid
        solution: Enable GDPR from the admin configuration and send a valid type (delete or update) plus a message
      - error: 401 Unauthorized
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
---

# Raise a GDPR Request

Raise a new GDPR data request for the authenticated customer. A new request is created with status `pending` and is tied to the logged-in customer. The response carries a one-time `successMessage` confirming the request was raised.

## Endpoint

```
POST /api/shop/gdpr-requests
```

## Authentication

This endpoint requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/rest-api/authentication) page.

## GDPR must be enabled

If GDPR data requests are disabled in the store's admin configuration, the endpoint returns **HTTP 400** with the message **"GDPR data requests are disabled. Please enable GDPR from the admin configuration."** The feature has been turned off on the admin side.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

```json
{
  "type": "delete",
  "message": "Please delete my account data."
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | Request type — `delete` (delete account data) or `update` (update personal data). |
| `message` | string | Yes | A message describing what the customer is requesting. |

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Request ID. |
| `type` | string | Request type: `delete` or `update`. |
| `status` | string | Request status — `pending` for a freshly raised request. |
| `message` | string | The message supplied in the request. |
| `email` | string | Email address tied to the request. |
| `revokedAt` | string | ISO 8601 timestamp when revoked, or `null`. |
| `createdAt` | string | ISO 8601 creation timestamp. |
| `updatedAt` | string | ISO 8601 last update timestamp. |
| `successMessage` | string | Confirmation message — present on create / revoke / delete results. |
| `customer` | object | The customer who owns the request. |
| `customer._id` | integer | Numeric customer ID of the owner. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `201 Created` | Request raised; status is `pending`. |
| `400 Bad Request` | GDPR is disabled, or `type` / `message` is missing or invalid. |
| `401 Unauthorized` | Missing or invalid customer Bearer token. |
| `403 Forbidden` | Missing or invalid storefront key. |

## Related Resources

- [List GDPR Requests](/api/rest-api/shop/gdpr-requests/list-gdpr-requests)
- [Revoke a GDPR Request](/api/rest-api/shop/gdpr-requests/revoke-gdpr-request)
- [Delete a GDPR Request](/api/rest-api/shop/gdpr-requests/delete-gdpr-request)
- [GDPR Requests Overview](/api/rest-api/shop/gdpr-requests/)

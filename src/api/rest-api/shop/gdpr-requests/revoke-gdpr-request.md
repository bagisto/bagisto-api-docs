---
outline: false
examples:
  - id: revoke-gdpr-request
    title: Revoke a GDPR Request
    description: Withdraw a pending or processing GDPR data request owned by the authenticated customer.
    request: |
      POST /api/shop/gdpr-requests/12/revoke
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "id": 12,
        "type": "delete",
        "status": "revoked",
        "message": "Please delete my account data.",
        "email": "jane@example.com",
        "revokedAt": "2026-06-25T11:05:00.000000Z",
        "createdAt": "2026-06-25T10:30:00.000000Z",
        "updatedAt": "2026-06-25T11:05:00.000000Z",
        "successMessage": "Your GDPR data request has been revoked successfully.",
        "customer": "/api/shop/customers/7"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: GDPR data requests are turned off in the store's admin configuration
        solution: Re-enable GDPR from the admin configuration before revoking a request
      - error: 422 Unprocessable Entity
        cause: The request is not in a pending or processing state
        solution: Only pending or processing requests can be revoked
      - error: 404 Not Found
        cause: The request does not exist or is not owned by the authenticated customer
        solution: Only request IDs belonging to the logged-in customer can be revoked
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
---

# Revoke a GDPR Request

Withdraw a GDPR data request the customer raised earlier. Revoking sets the request's status to `revoked` and stamps `revokedAt`. A request can only be revoked while it is still `pending` or `processing` — once it has been declined or approved it can no longer be revoked. The response carries a one-time `successMessage`.

## Endpoint

```
POST /api/shop/gdpr-requests/{id}/revoke
```

Send an empty request body.

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

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | The request ID to revoke. |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Request ID. |
| `type` | string | Request type: `delete` or `update`. |
| `status` | string | Request status — `revoked` after a successful revoke. |
| `message` | string | The message supplied in the request. |
| `email` | string | Email address tied to the request. |
| `revokedAt` | string | ISO 8601 timestamp when the request was revoked. |
| `createdAt` | string | ISO 8601 creation timestamp. |
| `updatedAt` | string | ISO 8601 last update timestamp. |
| `successMessage` | string | Confirmation message — present on create / revoke / delete results. |
| `customer` | string | Path of the owning customer, e.g. `/api/shop/customers/7`. Not a nested object. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Request revoked. |
| `400 Bad Request` | GDPR is disabled in the store's admin configuration. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |
| `404 Not Found` | The request does not exist or is not owned by the customer. |
| `422 Unprocessable Entity` | The request is not in a `pending` or `processing` state. |

## Related Resources

- [Raise a GDPR Request](/api/rest-api/shop/gdpr-requests/create-gdpr-request) — raise a delete or update request
- [Delete a GDPR Request](/api/rest-api/shop/gdpr-requests/delete-gdpr-request) — remove the request record
- [GDPR Requests Overview](/api/rest-api/shop/gdpr-requests/) — the GDPR menu overview, including the setting that gates it

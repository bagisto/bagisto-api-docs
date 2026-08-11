---
outline: false
examples:
  - id: view-gdpr-request
    title: View a GDPR Request
    description: Retrieve a single GDPR data request owned by the authenticated customer.
    request: |
      GET /api/shop/gdpr-requests/12
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
        "customer": "/api/shop/customers/7"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: GDPR data requests are turned off in the store's admin configuration
        solution: Re-enable GDPR from the admin configuration before calling this endpoint
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 404 Not Found
        cause: The request does not exist or is not owned by the authenticated customer
        solution: Only request IDs belonging to the logged-in customer can be viewed
---

# View GDPR Request

Retrieve a single GDPR data request **owned by the authenticated customer**. If the request does not exist or belongs to a different customer, the endpoint returns HTTP 404 — a customer can only view their own requests.

## Endpoint

```
GET /api/shop/gdpr-requests/{id}
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

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | The request ID. |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Request ID. |
| `type` | string | Request type: `delete` or `update`. |
| `status` | string | Request status: `pending`, `processing`, `declined`, `approved`, `revoked`. |
| `message` | string | The customer's message describing the request. |
| `email` | string | Email address tied to the request. |
| `revokedAt` | string | ISO 8601 timestamp when revoked, or `null`. |
| `createdAt` | string | ISO 8601 creation timestamp. |
| `updatedAt` | string | ISO 8601 last update timestamp. |
| `customer` | string | Path of the owning customer, e.g. `/api/shop/customers/7`. Not a nested object. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Request returned. |
| `400 Bad Request` | GDPR is disabled in the store's admin configuration. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |
| `404 Not Found` | The request does not exist or is not owned by the customer. |

## Related Resources

- [List GDPR Requests](/api/rest-api/shop/gdpr-requests/list-gdpr-requests) — the customer's own data requests
- [Revoke a GDPR Request](/api/rest-api/shop/gdpr-requests/revoke-gdpr-request) — withdraw a request still being processed
- [GDPR Requests Overview](/api/rest-api/shop/gdpr-requests/) — the GDPR menu overview, including the setting that gates it

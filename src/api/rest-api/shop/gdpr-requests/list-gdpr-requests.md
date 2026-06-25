---
outline: false
examples:
  - id: list-gdpr-requests
    title: List Own GDPR Requests
    description: Retrieve a paginated list of the authenticated customer's own GDPR data requests, newest first.
    request: |
      GET /api/shop/gdpr-requests?sort=id&order=desc
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "data": [
          {
            "id": 12,
            "type": "delete",
            "status": "pending",
            "message": "Please delete my account data.",
            "email": "jane@example.com",
            "revokedAt": null,
            "createdAt": "2026-06-25T10:30:00.000000Z",
            "updatedAt": "2026-06-25T10:30:00.000000Z",
            "customer": {
              "_id": 7
            }
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 1,
          "total": 1,
          "from": 1,
          "to": 1
        }
      }
    commonErrors:
      - error: 400 Bad Request
        cause: GDPR data requests are turned off in the store's admin configuration
        solution: Re-enable GDPR from the admin configuration before calling this endpoint
      - error: 401 Unauthorized
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
---

# List GDPR Requests

Retrieve a paginated list of the authenticated customer's **own** GDPR data requests. Requests are always scoped to the logged-in customer — a customer can never see another customer's requests. Results are ordered newest first by default.

## Endpoint

```
GET /api/shop/gdpr-requests
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

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sort` | string | `id` | Sort column: `id` or `created_at`. |
| `order` | string | `desc` | Sort direction: `asc` or `desc`. |
| `page` | integer | `1` | Page number. |
| `per_page` | integer | `10` | Items per page. |

## Response Fields (200 OK)

The response is a `{ data, meta }` envelope. Each item in `data` is a GDPR request object.

| Field | Type | Description |
|-------|------|-------------|
| `data[].id` | integer | Request ID. |
| `data[].type` | string | Request type: `delete` or `update`. |
| `data[].status` | string | Request status: `pending`, `processing`, `declined`, `approved`, `revoked`. |
| `data[].message` | string | The customer's message describing the request. |
| `data[].email` | string | Email address tied to the request. |
| `data[].revokedAt` | string | ISO 8601 timestamp when revoked, or `null`. |
| `data[].createdAt` | string | ISO 8601 creation timestamp. |
| `data[].updatedAt` | string | ISO 8601 last update timestamp. |
| `data[].customer` | object | The customer who owns the request. |
| `data[].customer._id` | integer | Numeric customer ID of the owner. |
| `meta` | object | Pagination metadata (`currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`). |

## Empty Collection

When the customer has no requests, `data` is an empty array:

```json
{
  "data": [],
  "meta": {
    "currentPage": 1,
    "perPage": 10,
    "lastPage": 1,
    "total": 0,
    "from": null,
    "to": null
  }
}
```

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Requests returned. |
| `400 Bad Request` | GDPR is disabled in the store's admin configuration. |
| `401 Unauthorized` | Missing or invalid customer Bearer token. |
| `403 Forbidden` | Missing or invalid storefront key. |

## Related Resources

- [View GDPR Request](/api/rest-api/shop/gdpr-requests/view-gdpr-request)
- [Raise a GDPR Request](/api/rest-api/shop/gdpr-requests/create-gdpr-request)
- [GDPR Requests Overview](/api/rest-api/shop/gdpr-requests/)

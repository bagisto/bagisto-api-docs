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
      HTTP/1.1 200 OK
      X-Total-Count: 1
      X-Page: 1
      X-Per-Page: 30
      X-Total-Pages: 1

      [
        {
          "id": 12,
          "email": "jane@example.com",
          "status": "pending",
          "type": "delete",
          "message": "Please delete my account data.",
          "revokedAt": null,
          "createdAt": "2026-06-25T10:30:00+05:30",
          "updatedAt": "2026-06-25T10:30:00+05:30",
          "successMessage": null,
          "customer": "/api/shop/customers/7"
        }
      ]
    commonErrors:
      - error: 400 Bad Request
        cause: GDPR data requests are turned off in the store's admin configuration
        solution: Re-enable GDPR from the admin configuration before calling this endpoint
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 401 Unauthorized
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
| `sort` | string | `id` | Sort column — `id` or `created_at`. |
| `order` | string | `desc` | Sort direction — `asc` or `desc`. |

The page size is fixed at 30 and cannot be changed; `page` and `per_page` are accepted by the URL but do not affect the result. Read the totals from the response headers.

## Response Fields (200 OK)

A bare JSON array of the customer's own requests. There is no `data` wrapper and no `meta` block — pagination is reported in the `X-Total-Count`, `X-Page`, `X-Per-Page`, and `X-Total-Pages` headers.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Request ID. Use it on [View](/api/rest-api/shop/gdpr-requests/view-gdpr-request), [Revoke](/api/rest-api/shop/gdpr-requests/revoke-gdpr-request), and [Delete](/api/rest-api/shop/gdpr-requests/delete-gdpr-request). |
| `email` | string | Email address tied to the request. |
| `status` | string | `pending`, `processing`, `declined`, `approved`, or `revoked`. |
| `type` | string | `delete` or `update`. |
| `message` | string | The customer's own description of the request. |
| `revokedAt` | string | Timestamp of the revocation, `null` while the request is live. Note this one is a plain date-time, not the ISO 8601 form the other two use. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |
| `successMessage` | string | Populated only on a write response — always `null` when listing. |
| `customer` | string | Path of the owning customer, e.g. `/api/shop/customers/7`. Not a nested object. |

## Empty Collection

A customer who has raised nothing gets `200` with `[]` and `X-Total-Count: 0`.

## Use Cases

- **"My data requests" screen** — list the customer's requests and offer Revoke on any that are still `pending` or `processing`.
- **Prevent duplicate submissions** — check for an open request before showing the raise form again; the API does not reject a second one.

## Best Practices

- **Read the count from `X-Total-Count`** — there is no `meta` block, and the array is one fixed page of 30.
- **Handle the `400` disabled error before rendering the screen** — with GDPR switched off in the admin panel, every endpoint in this menu fails the same way, so the whole section should be hidden.
- **Show Revoke only for `pending` and `processing`** — the endpoint rejects any other status with `422`.

## Related Resources

- [View GDPR Request](/api/rest-api/shop/gdpr-requests/view-gdpr-request) — one request by id
- [Raise a GDPR Request](/api/rest-api/shop/gdpr-requests/create-gdpr-request) — raise a delete or update request
- [GDPR Requests Overview](/api/rest-api/shop/gdpr-requests/) — the GDPR menu overview, including the setting that gates it

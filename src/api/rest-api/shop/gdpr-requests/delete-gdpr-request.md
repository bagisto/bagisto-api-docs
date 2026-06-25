---
outline: false
examples:
  - id: delete-gdpr-request
    title: Delete a GDPR Request
    description: Remove a GDPR data request record owned by the authenticated customer.
    request: |
      DELETE /api/shop/gdpr-requests/12
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 204 No Content
    commonErrors:
      - error: 400 Bad Request
        cause: GDPR data requests are turned off in the store's admin configuration
        solution: Re-enable GDPR from the admin configuration before deleting a request
      - error: 404 Not Found
        cause: The request does not exist or is not owned by the authenticated customer
        solution: Only request IDs belonging to the logged-in customer can be deleted
      - error: 401 Unauthorized
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
---

# Delete a GDPR Request

Remove a GDPR data request record owned by the authenticated customer. On success the endpoint returns **HTTP 204 No Content** with an empty body. A customer can only delete their own requests.

## Endpoint

```
DELETE /api/shop/gdpr-requests/{id}
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
| `id` | integer | Yes | The request ID to delete. |

## Response (204 No Content)

A successful delete returns HTTP 204 with no response body.

## Status Codes

| Status | Meaning |
|--------|---------|
| `204 No Content` | Request deleted. |
| `400 Bad Request` | GDPR is disabled in the store's admin configuration. |
| `401 Unauthorized` | Missing or invalid customer Bearer token. |
| `403 Forbidden` | Missing or invalid storefront key. |
| `404 Not Found` | The request does not exist or is not owned by the customer. |

## Related Resources

- [Raise a GDPR Request](/api/rest-api/shop/gdpr-requests/create-gdpr-request)
- [Revoke a GDPR Request](/api/rest-api/shop/gdpr-requests/revoke-gdpr-request)
- [GDPR Requests Overview](/api/rest-api/shop/gdpr-requests/)

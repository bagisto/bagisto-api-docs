---
outline: false
examples:
  - id: list-return-reasons
    title: List Return Reasons
    description: List the active reasons a customer can pick when raising a return, filtered by resolution type.
    request: |
      GET /api/shop/return-reasons?resolution_type=return
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      [
        { "id": 2, "title": "Damaged product", "position": 1 },
        { "id": 3, "title": "Wrong item delivered", "position": 2 },
        { "id": 4, "title": "No longer needed", "position": 3 }
      ]
    commonErrors:
      - error: 400 Bad Request
        cause: The resolution_type parameter is missing or not one of return / cancel_items
        solution: Provide a valid resolution_type — either return or cancel_items
      - error: 401 Unauthorized
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
---

# List Return Reasons

List the active reasons a customer can pick when raising a return, filtered by the resolution type. Use a reason's `id` as the `rma_reason_id` when calling [`POST /api/shop/returns`](/api/rest-api/shop/returns/create-return).

## Endpoint

```
GET /api/shop/return-reasons
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
| `resolution_type` | string | Yes | The resolution the reasons apply to — `return` or `cancel_items`. |

## Response Fields (200 OK)

The response is a plain JSON array. Each item is a reason object.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Numeric reason id — use as `rma_reason_id` when raising a return. |
| `title` | string | Reason label, e.g. `Damaged product`. |
| `position` | integer | Display order position. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Reasons retrieved. |
| `400 Bad Request` | `resolution_type` is missing or invalid. |
| `401 Unauthorized` | Missing or invalid customer Bearer token. |
| `403 Forbidden` | Missing or invalid storefront key. |

## Related Resources

- [List Returnable Items](/api/rest-api/shop/returns/list-returnable-items)
- [Raise a Return](/api/rest-api/shop/returns/create-return)
- [Returns Overview](/api/rest-api/shop/returns/)

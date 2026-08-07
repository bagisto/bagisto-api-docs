---
outline: false
examples:
  - id: list-returns
    title: List Own Returns
    description: Retrieve the authenticated customer's own return (RMA) requests, newest first.
    request: |
      GET /api/shop/returns?status=1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      [
        {
          "id": 12,
          "orderId": 45,
          "orderIncrementId": "000000045",
          "statusId": 1,
          "statusTitle": "Pending",
          "statusColor": "#FDB022",
          "packageCondition": "opened",
          "information": "Item arrived damaged.",
          "canClose": null,
          "canReopen": null,
          "isExpired": null,
          "item": {
            "id": 30,
            "order_item_id": 78,
            "sku": "COASTALBREEZEMENSHOODIE",
            "name": "Coastal Breeze Men's Blue Zipper Hoodie",
            "quantity": 1,
            "resolution": "return",
            "reason_id": 2,
            "reason": "Damaged product",
            "variant_id": null
          },
          "images": null,
          "messagesCount": 2,
          "createdAt": "2026-07-20T10:15:30.000000Z",
          "updatedAt": "2026-07-20T10:15:30.000000Z"
        }
      ]
    commonErrors:
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
---

# List Returns

Retrieve the authenticated customer's **own** return (RMA) requests, newest first. Requests are always scoped to the logged-in customer — a customer can never see another customer's returns. The detail-only action flags (`canClose`, `canReopen`, `isExpired`) and the `images` array come back `null` on the listing — fetch a single return to get them.

## Endpoint

```
GET /api/shop/returns
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
| `status` | integer | No | Filter by return status id. |

## Response Fields (200 OK)

The response is a plain JSON array. Each item is a return object.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Return ID. |
| `orderId` | integer | Id of the order the item belongs to. |
| `orderIncrementId` | string | Human-readable order number. |
| `statusId` | integer | Numeric status id. |
| `statusTitle` | string | Status label, e.g. `Pending`. |
| `statusColor` | string | Hex color for the status badge. |
| `packageCondition` | string | Reported package condition, e.g. `opened`. |
| `information` | string | Free-text note supplied when the return was raised. |
| `canClose` | boolean | Whether the return can be closed. `null` on the listing. |
| `canReopen` | boolean | Whether the return can be reopened. `null` on the listing. |
| `isExpired` | boolean | Whether the return is past its action window. `null` on the listing. |
| `item` | object | The returned item — `id`, `order_item_id`, `sku`, `name`, `quantity`, `resolution`, `reason_id`, `reason`, `variant_id`. |
| `images` | array | Attached images (`id`, `path`, `url`). `null` on the listing. |
| `messagesCount` | integer | Number of conversation messages on the return. |
| `createdAt` | string | ISO 8601 creation timestamp. |
| `updatedAt` | string | ISO 8601 last update timestamp. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Returns retrieved. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |

## Related Resources

- [View Return](/api/rest-api/shop/returns/view-return) — one return with its status flags
- [Raise a Return](/api/rest-api/shop/returns/create-return) — raise a return against one order item
- [Returns Overview](/api/rest-api/shop/returns/) — the returns menu overview, including the settings that gate it

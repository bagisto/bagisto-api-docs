---
outline: false
examples:
  - id: view-return
    title: View a Return
    description: Retrieve a single return (RMA) request owned by the authenticated customer, including its item, images and action flags.
    request: |
      GET /api/shop/returns/12
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "id": 12,
        "orderId": 45,
        "orderIncrementId": "000000045",
        "statusId": 1,
        "statusTitle": "Pending",
        "statusColor": "#FDB022",
        "packageCondition": "opened",
        "information": "Item arrived damaged.",
        "canClose": true,
        "canReopen": false,
        "isExpired": false,
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
        "images": [
          {
            "id": 5,
            "path": "rma/12/damage-front.png",
            "url": "https://example.com/storage/rma/12/damage-front.png"
          }
        ],
        "messagesCount": 2,
        "createdAt": "2026-07-20T10:15:30.000000Z",
        "updatedAt": "2026-07-20T10:15:30.000000Z"
      }
    commonErrors:
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
      - error: 404 Not Found
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be viewed
---

# View Return

Retrieve a single return (RMA) request **owned by the authenticated customer**, with the full detail — the returned item, attached images, status and the action flags (`canClose`, `canReopen`, `isExpired`). If the return does not exist or belongs to a different customer, the endpoint returns HTTP 404.

## Endpoint

```
GET /api/shop/returns/{id}
```

## Authentication

This endpoint requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/rest-api/authentication) page.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Id of the return to view. Must belong to the authenticated customer. |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Return ID. |
| `orderId` | integer | Id of the order the item belongs to. |
| `orderIncrementId` | string | Human-readable order number. |
| `statusId` | integer | Numeric status id. |
| `statusTitle` | string | Status label, e.g. `Pending`. |
| `statusColor` | string | Hex color for the status badge. |
| `packageCondition` | string | Reported package condition. |
| `information` | string | Free-text note supplied when the return was raised. |
| `canClose` | boolean | Whether the return can be closed (marked solved). |
| `canReopen` | boolean | Whether the return can be reopened back to pending. |
| `isExpired` | boolean | Whether the return is past its action window. |
| `item` | object | The returned item (see below). |
| `item.id` | integer | Id of the return item row. |
| `item.order_item_id` | integer | Id of the source order item. |
| `item.sku` | string | Product SKU. |
| `item.name` | string | Product name. |
| `item.quantity` | integer | Quantity being returned/canceled. |
| `item.resolution` | string | Resolution type: `return` or `cancel_items`. |
| `item.reason_id` | integer | Id of the chosen return reason. |
| `item.reason` | string | Title of the chosen return reason. |
| `item.variant_id` | integer | Variant id for a configurable product, or `null`. |
| `images` | array | Attached images. |
| `images[].id` | integer | Image id. |
| `images[].path` | string | Stored file path. |
| `images[].url` | string | Public URL of the image. |
| `messagesCount` | integer | Number of conversation messages on the return. |
| `createdAt` | string | ISO 8601 creation timestamp. |
| `updatedAt` | string | ISO 8601 last update timestamp. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `200 OK` | Return retrieved. |
| `401 Unauthorized` | Missing or invalid storefront key. |
| `403 Forbidden` | Missing or invalid customer Bearer token. |
| `404 Not Found` | The return does not exist or is not the customer's. |

## Related Resources

- [List Returns](/api/rest-api/shop/returns/list-returns) — the customer's own return requests
- [List Return Messages](/api/rest-api/shop/returns/list-return-messages) — the conversation thread on a return
- [Cancel a Return](/api/rest-api/shop/returns/cancel-return) — withdraw a return the customer raised
- [Returns Overview](/api/rest-api/shop/returns/) — the returns menu overview, including the settings that gate it
